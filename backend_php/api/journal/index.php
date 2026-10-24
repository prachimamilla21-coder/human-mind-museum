<?php
require_once __DIR__ . '/../../config/db.php';

$auth = getAuthenticatedUser();
$pdo = Database::getConnection();
$method = $_SERVER['REQUEST_METHOD'];

// GET user journal reflections
if ($method === 'GET') {
    $stmt = $pdo->prepare("SELECT id, room, title, content, created_at as createdAt FROM journal_entries WHERE user_id = ? ORDER BY created_at DESC");
    $stmt->execute([$auth['id']]);
    sendResponse($stmt->fetchAll());
}

// POST new reflection
if ($method === 'POST') {
    $input = getJsonInput();
    $room = trim($input['room'] ?? 'general');
    $title = trim($input['title'] ?? '');
    $content = trim($input['content'] ?? '');

    if (empty($title) || empty($content)) {
        sendError("Title and content are required.");
    }

    $id = "jnl_" . bin2hex(random_bytes(6));
    $stmt = $pdo->prepare("INSERT INTO journal_entries (id, user_id, room, title, content) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$id, $auth['id'], $room, $title, $content]);

    sendResponse([
        "success" => true,
        "entry" => [
            "id" => $id,
            "room" => $room,
            "title" => $title,
            "content" => $content,
            "createdAt" => date('Y-m-d H:i:s')
        ]
    ], 201);
}
