<?php
require_once __DIR__ . '/../../config/db.php';

$auth = getAuthenticatedUser();
$userId = $auth['id'];

if ($auth['role'] === 'guest') {
    sendResponse([
        "user" => [
            "id" => $userId,
            "username" => $auth['username'],
            "role" => "guest",
            "visitorBadgeId" => $auth['badgeId'],
            "visitorLevel" => "Guest Scholar",
            "badges" => ["Guest Access Pass"],
            "visitedRooms" => [],
            "quizResults" => new stdClass()
        ],
        "scores" => [],
        "journals" => []
    ]);
}

$pdo = Database::getConnection();

$stmt = $pdo->prepare("SELECT id, username, email, role, visitor_badge_id, visitor_level, join_date FROM users WHERE id = ? LIMIT 1");
$stmt->execute([$userId]);
$user = $stmt->fetch();

if (!$user) {
    sendError("Visitor profile not found.", 404);
}

// Fetch visited rooms
$stmt = $pdo->prepare("SELECT room_id FROM user_visited_rooms WHERE user_id = ?");
$stmt->execute([$userId]);
$visitedRooms = $stmt->fetchAll(PDO::FETCH_COLUMN);

// Fetch badges
$stmt = $pdo->prepare("SELECT badge_name FROM user_badges WHERE user_id = ?");
$stmt->execute([$userId]);
$badges = $stmt->fetchAll(PDO::FETCH_COLUMN);

// Fetch quiz results
$stmt = $pdo->prepare("SELECT room_id, score, total, completed_at FROM user_quiz_results WHERE user_id = ?");
$stmt->execute([$userId]);
$quizzes = [];
while ($row = $stmt->fetch()) {
    $quizzes[$row['room_id']] = [
        "score" => (int)$row['score'],
        "total" => (int)$row['total'],
        "date" => $row['completed_at']
    ];
}

// Fetch game scores
$stmt = $pdo->prepare("SELECT game_id, score, metric_label, created_at FROM game_scores WHERE user_id = ? ORDER BY created_at DESC LIMIT 20");
$stmt->execute([$userId]);
$scores = $stmt->fetchAll();

// Fetch journals
$stmt = $pdo->prepare("SELECT id, room, title, content, created_at FROM journal_entries WHERE user_id = ? ORDER BY created_at DESC LIMIT 20");
$stmt->execute([$userId]);
$journals = $stmt->fetchAll();

sendResponse([
    "user" => [
        "id" => $user['id'],
        "username" => $user['username'],
        "email" => $user['email'],
        "role" => $user['role'],
        "visitorBadgeId" => $user['visitor_badge_id'],
        "visitorLevel" => $user['visitor_level'],
        "joinDate" => $user['join_date'],
        "badges" => $badges,
        "visitedRooms" => $visitedRooms,
        "quizResults" => !empty($quizzes) ? $quizzes : new stdClass()
    ],
    "scores" => $scores,
    "journals" => $journals
]);
