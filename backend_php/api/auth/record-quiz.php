<?php
require_once __DIR__ . '/../../config/db.php';

$auth = getAuthenticatedUser();
$input = getJsonInput();
$roomId = trim($input['roomId'] ?? '');
$score = isset($input['score']) ? (int)$input['score'] : null;
$total = isset($input['total']) ? (int)$input['total'] : 4;

if (empty($roomId) || $score === null) {
    sendError("Room ID and score are required.");
}

if ($auth['role'] === 'guest') {
    sendResponse(["success" => true]);
}

$pdo = Database::getConnection();
$userId = $auth['id'];

// Insert or update quiz result
$stmt = $pdo->prepare("INSERT INTO user_quiz_results (user_id, room_id, score, total) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE score = VALUES(score), total = VALUES(total), completed_at = CURRENT_TIMESTAMP");
$stmt->execute([$userId, $roomId, $score, $total]);

// Award badge if passing (score >= 3 out of 4)
$badgeMap = [
    'memory' => 'Memory Architect',
    'emotion' => 'Empathy Master',
    'perception' => 'Illusion Breaker',
    'personality' => 'OCEAN Pioneer',
    'cognitive-bias' => 'Bias Hunter',
    'decision-making' => 'Strategic Thinker',
    'brain-lab' => 'Neuro Scholar'
];

if (isset($badgeMap[$roomId]) && $score >= 3) {
    $stmt = $pdo->prepare("INSERT IGNORE INTO user_badges (user_id, badge_name) VALUES (?, ?)");
    $stmt->execute([$userId, $badgeMap[$roomId]]);
}

// Check if all 7 quizzes passed for Master of Mind badge
$stmt = $pdo->prepare("SELECT COUNT(*) FROM user_quiz_results WHERE user_id = ? AND score >= 3");
$stmt->execute([$userId]);
if ((int)$stmt->fetchColumn() >= 7) {
    $stmt = $pdo->prepare("INSERT IGNORE INTO user_badges (user_id, badge_name) VALUES (?, ?)");
    $stmt->execute([$userId, "Master of Mind"]);
}

sendResponse(["success" => true, "roomId" => $roomId, "score" => $score]);
