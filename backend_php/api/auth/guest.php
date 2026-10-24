<?php
require_once __DIR__ . '/../../config/db.php';

$guestId = "guest_" . bin2hex(random_bytes(4));
$badgeId = "HMM-VIS-" . rand(1000, 9999);
$guestName = "Guest Explorer #" . rand(100, 999);
$role = "guest";
$level = "Guest Scholar";

$token = generateToken([
    "id" => $guestId,
    "username" => $guestName,
    "role" => $role,
    "badgeId" => $badgeId
]);

sendResponse([
    "message" => "Temporary holographic visitor pass issued.",
    "token" => $token,
    "user" => [
        "id" => $guestId,
        "username" => $guestName,
        "email" => "$guestId@visitor.mindmuseum.org",
        "role" => $role,
        "visitorBadgeId" => $badgeId,
        "visitorLevel" => $level,
        "badges" => ["Guest Access Pass"],
        "visitedRooms" => [],
        "quizResults" => new stdClass()
    ]
]);
