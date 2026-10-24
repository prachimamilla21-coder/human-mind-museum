<?php
require_once __DIR__ . '/../../config/db.php';

$input = getJsonInput();
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if (empty($email) || empty($password)) {
    sendError("Email and password are required.");
}

$pdo = Database::getConnection();

$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? LIMIT 1");
$stmt->execute([$email]);
$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password_hash'])) {
    sendError("Invalid email or password combination.", 401);
}

// Fetch visited rooms
$stmt = $pdo->prepare("SELECT room_id FROM user_visited_rooms WHERE user_id = ?");
$stmt->execute([$user['id']]);
$visitedRooms = $stmt->fetchAll(PDO::FETCH_COLUMN);

// Fetch badges
$stmt = $pdo->prepare("SELECT badge_name FROM user_badges WHERE user_id = ?");
$stmt->execute([$user['id']]);
$badges = $stmt->fetchAll(PDO::FETCH_COLUMN);

// Fetch quiz results
$stmt = $pdo->prepare("SELECT room_id, score, total, completed_at FROM user_quiz_results WHERE user_id = ?");
$stmt->execute([$user['id']]);
$quizzes = [];
while ($row = $stmt->fetch()) {
    $quizzes[$row['room_id']] = [
        "score" => (int)$row['score'],
        "total" => (int)$row['total'],
        "date" => $row['completed_at']
    ];
}

$token = generateToken([
    "id" => $user['id'],
    "username" => $user['username'],
    "role" => $user['role'],
    "badgeId" => $user['visitor_badge_id']
]);

sendResponse([
    "message" => "Welcome back, " . $user['username'] . "!",
    "token" => $token,
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
    ]
]);
