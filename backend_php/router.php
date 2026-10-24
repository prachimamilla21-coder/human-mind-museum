<?php
// Master PHP API Router for The Human Mind Museum
// Handles all /api/* endpoints cleanly

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Normalize path: remove base folder if running under subfolder like /human-mind-museum
$uri = preg_replace('#^.*?/api/#', '/api/', $uri);

switch ($uri) {
    case '/api/auth/register':
        require __DIR__ . '/api/auth/register.php';
        break;
    case '/api/auth/login':
        require __DIR__ . '/api/auth/login.php';
        break;
    case '/api/auth/guest':
        require __DIR__ . '/api/auth/guest.php';
        break;
    case '/api/auth/me':
        require __DIR__ . '/api/auth/me.php';
        break;
    case '/api/auth/record-visit':
        require __DIR__ . '/api/auth/record-visit.php';
        break;
    case '/api/auth/record-quiz':
        require __DIR__ . '/api/auth/record-quiz.php';
        break;
    case '/api/auth/visitors':
        require __DIR__ . '/api/auth/visitors.php';
        break;
    case '/api/exhibits':
        require __DIR__ . '/api/exhibits/index.php';
        break;
    case '/api/games/catalog':
    case '/api/games/score':
    case '/api/games/leaderboard':
    case '/api/games':
        require __DIR__ . '/api/games/index.php';
        break;
    case '/api/journal':
        require __DIR__ . '/api/journal/index.php';
        break;
    case '/api/ai-guide/chat':
    case '/api/ai-guide':
        require __DIR__ . '/api/ai-guide/chat.php';
        break;
    case '/api/info':
        header("Content-Type: application/json");
        echo json_encode([
            "museum" => "The Human Mind Museum",
            "backend" => "PHP with MySQL (XAMPP)",
            "version" => "3.0.0",
            "status" => "Operational",
            "rooms" => 7,
            "curator" => "Dr. Sophia Vance",
            "timestamp" => date('Y-m-d H:i:s')
        ]);
        break;
    default:
        http_response_code(404);
        header("Content-Type: application/json");
        echo json_encode(["error" => "API endpoint not found on PHP backend: $uri"]);
        break;
}
