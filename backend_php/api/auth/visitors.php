<?php
require_once __DIR__ . '/../../config/db.php';

$pdo = Database::getConnection();

// Fetch all registered visitors
$stmt = $pdo->query("SELECT id, username, email, role, visitor_badge_id, visitor_level, join_date FROM users ORDER BY join_date DESC");
$users = $stmt->fetchAll();

$visitors = [];
foreach ($users as $u) {
    // Visited rooms
    $stmtR = $pdo->prepare("SELECT room_id FROM user_visited_rooms WHERE user_id = ?");
    $stmtR->execute([$u['id']]);
    $visitedRooms = $stmtR->fetchAll(PDO::FETCH_COLUMN);

    // Badges
    $stmtB = $pdo->prepare("SELECT badge_name FROM user_badges WHERE user_id = ?");
    $stmtB->execute([$u['id']]);
    $badges = $stmtB->fetchAll(PDO::FETCH_COLUMN);

    // Quizzes
    $stmtQ = $pdo->prepare("SELECT room_id, score, total, completed_at FROM user_quiz_results WHERE user_id = ?");
    $stmtQ->execute([$u['id']]);
    $quizzes = [];
    while ($row = $stmtQ->fetch()) {
        $quizzes[$row['room_id']] = [
            "score" => (int)$row['score'],
            "total" => (int)$row['total'],
            "date" => $row['completed_at']
        ];
    }

    $visitors[] = [
        "id" => $u['id'],
        "username" => $u['username'],
        "email" => $u['email'],
        "role" => $u['role'],
        "visitorBadgeId" => $u['visitor_badge_id'],
        "visitorLevel" => $u['visitor_level'],
        "joinDate" => $u['join_date'],
        "visitedRooms" => $visitedRooms,
        "quizResults" => !empty($quizzes) ? $quizzes : new stdClass(),
        "badges" => $badges
    ];
}

$stmtScores = $pdo->query("SELECT COUNT(*) FROM game_scores");
$totalGameScores = (int)$stmtScores->fetchColumn();

$stmtJournals = $pdo->query("SELECT COUNT(*) FROM journal_entries");
$totalJournals = (int)$stmtJournals->fetchColumn();

sendResponse([
    "success" => true,
    "backend" => "PHP with MySQL (PDO)",
    "database" => "mind_museum_db",
    "totalVisitors" => count($visitors),
    "visitors" => $visitors,
    "totalGameScores" => $totalGameScores,
    "totalJournalEntries" => $totalJournals
]);
