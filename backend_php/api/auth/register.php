<?php
require_once __DIR__ . '/../../config/db.php';

$input = getJsonInput();
$username = trim($input['username'] ?? '');
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if (empty($username) || empty($email) || empty($password)) {
    sendError("Username, email, and password are required.");
}

if (strlen($username) < 3) {
    sendError("Username must be at least 3 characters.");
}

if (strlen($password) < 6) {
    sendError("Password must be at least 6 characters.");
}

$pdo = Database::getConnection();

// Check unique email and username
$stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
$stmt->execute([$email]);
if ($stmt->fetch()) {
    sendError("An account with this email already exists.", 409);
}

$stmt = $pdo->prepare("SELECT id FROM users WHERE username = ? LIMIT 1");
$stmt->execute([$username]);
if ($stmt->fetch()) {
    sendError("This username is already taken by another visitor.", 409);
}

// Generate new visitor
$userId = "usr_" . bin2hex(random_bytes(6));
$badgeId = "HMM-VIS-" . rand(1000, 9999);
$hash = password_hash($password, PASSWORD_BCRYPT);
$level = "Novice Explorer";
$role = "visitor";

$stmt = $pdo->prepare("INSERT INTO users (id, username, email, password_hash, role, visitor_badge_id, visitor_level) VALUES (?, ?, ?, ?, ?, ?, ?)");
$stmt->execute([$userId, $username, $email, $hash, $role, $badgeId, $level]);

// Initial badge
$stmt = $pdo->prepare("INSERT INTO user_badges (user_id, badge_name) VALUES (?, ?)");
$stmt->execute([$userId, "First Step: Museum Admission"]);

$token = generateToken([
    "id" => $userId,
    "username" => $username,
    "role" => $role,
    "badgeId" => $badgeId
]);

sendResponse([
    "message" => "Welcome to The Human Mind Museum! Pass minted.",
    "token" => $token,
    "user" => [
        "id" => $userId,
        "username" => $username,
        "email" => $email,
        "role" => $role,
        "visitorBadgeId" => $badgeId,
        "visitorLevel" => $level,
        "badges" => ["First Step: Museum Admission"],
        "visitedRooms" => [],
        "quizResults" => new stdClass()
    ]
], 201);
