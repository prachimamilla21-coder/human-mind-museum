<?php
require_once __DIR__ . '/../../config/db.php';

$auth = getAuthenticatedUser();
$input = getJsonInput();
$roomId = trim($input['roomId'] ?? '');

if (empty($roomId)) {
    sendError("Room ID is required.");
}

if ($auth['role'] === 'guest') {
    sendResponse(["success" => true, "roomId" => $roomId]);
}

$pdo = Database::getConnection();
$userId = $auth['id'];

$stmt = $pdo->prepare("INSERT IGNORE INTO user_visited_rooms (user_id, room_id) VALUES (?, ?)");
$stmt->execute([$userId, $roomId]);

// Check total visited rooms for rank evolution
$stmt = $pdo->prepare("SELECT COUNT(*) FROM user_visited_rooms WHERE user_id = ?");
$stmt->execute([$userId]);
$count = (int)$stmt->fetchColumn();

$newLevel = "Novice Explorer";
if ($count >= 7) {
    $newLevel = "Senior Neuro-Investigator";
    $stmt = $pdo->prepare("INSERT IGNORE INTO user_badges (user_id, badge_name) VALUES (?, ?)");
    $stmt->execute([$userId, "Grand Scholar: All 7 Rooms Explored"]);
} elseif ($count >= 3) {
    $newLevel = "Cognitive Apprentice";
}

$stmt = $pdo->prepare("UPDATE users SET visitor_level = ? WHERE id = ?");
$stmt->execute([$newLevel, $userId]);

sendResponse(["success" => true, "roomId" => $roomId, "totalVisited" => $count, "level" => $newLevel]);
