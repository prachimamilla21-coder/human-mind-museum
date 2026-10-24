<?php
require_once __DIR__ . '/../../config/db.php';

$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// GET Leaderboard or Catalog
if ($method === 'GET') {
    if ($action === 'leaderboard') {
        $gameId = $_GET['gameId'] ?? '';
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 10;

        if (!empty($gameId)) {
            $stmt = $pdo->prepare("SELECT username, game_id as gameId, score, metric_label as metricLabel, created_at as createdAt FROM game_scores WHERE game_id = ? ORDER BY score DESC LIMIT ?");
            $stmt->bindValue(1, $gameId, PDO::PARAM_STR);
            $stmt->bindValue(2, $limit, PDO::PARAM_INT);
            $stmt->execute();
        } else {
            $stmt = $pdo->prepare("SELECT username, game_id as gameId, score, metric_label as metricLabel, created_at as createdAt FROM game_scores ORDER BY score DESC LIMIT ?");
            $stmt->bindValue(1, $limit, PDO::PARAM_INT);
            $stmt->execute();
        }

        sendResponse($stmt->fetchAll());
    }

    // Default: return game catalog
    sendResponse([
        ["id" => "stroop", "room" => "perception", "title" => "The Stroop Effect Challenge", "metricName" => "Interference Delay (ms) & Accuracy"],
        ["id" => "memory-matrix", "room" => "memory", "title" => "The Working Memory Matrix", "metricName" => "Span Capacity Level"],
        ["id" => "micro-expressions", "room" => "emotion", "title" => "Micro-Expression Emotion Decoder", "metricName" => "Empathy Recognition Index"],
        ["id" => "ocean-test", "room" => "personality", "title" => "Big Five OCEAN Assessment", "metricName" => "OCEAN Profile Radar"],
        ["id" => "bias-detective", "room" => "cognitive-bias", "title" => "Cognitive Bias Detective", "metricName" => "Deductive Rationality Score"],
        ["id" => "monty-hall", "room" => "decision-making", "title" => "Monty Hall Bayesian Dilemma", "metricName" => "Bayesian Win Rate (%)"]
    ]);
}

// POST Score
if ($method === 'POST') {
    $auth = getAuthenticatedUser();
    $input = getJsonInput();

    $gameId = trim($input['gameId'] ?? '');
    $score = isset($input['score']) ? (int)$input['score'] : null;
    $metricLabel = trim($input['metricLabel'] ?? 'pts');
    $details = isset($input['details']) ? json_encode($input['details']) : null;

    if (empty($gameId) || $score === null) {
        sendError("Game ID and score are required.");
    }

    $stmt = $pdo->prepare("INSERT INTO game_scores (user_id, username, game_id, score, metric_label, details) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$auth['id'], $auth['username'], $gameId, $score, $metricLabel, $details]);

    sendResponse([
        "success" => true,
        "message" => "Neural score archived to database!",
        "score" => $score
    ]);
}
