<?php
// Database & Configuration Layer (XAMPP MySQL / PDO)
// The Human Mind Museum - PHP Engine

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

class Database {
    private static $host = "localhost";
    private static $db_name = "mind_museum_db";
    private static $username = "root";
    private static $password = ""; // Default XAMPP MySQL password is empty
    private static $conn = null;

    public static function getConnection() {
        if (self::$conn === null) {
            try {
                self::$conn = new PDO(
                    "mysql:host=" . self::$host . ";dbname=" . self::$db_name . ";charset=utf8mb4",
                    self::$username,
                    self::$password,
                    [
                        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                        PDO::ATTR_EMULATE_PREPARES => false
                    ]
                );
            } catch (PDOException $e) {
                // If MySQL connection fails, return JSON error with setup guide
                http_response_code(500);
                echo json_encode([
                    "error" => "Database connection error.",
                    "message" => "Please start MySQL in XAMPP Control Panel and import backend_php/schema.sql into phpMyAdmin.",
                    "details" => $e->getMessage()
                ]);
                exit();
            }
        }
        return self::$conn;
    }
}

// Utility Helpers
function getJsonInput() {
    $raw = file_get_contents("php://input");
    return json_decode($raw, true) ?? [];
}

function sendResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit();
}

function sendError($message, $status = 400, $details = null) {
    http_response_code($status);
    $res = ["error" => $message];
    if ($details) $res["details"] = $details;
    echo json_encode($res);
    exit();
}

// Lightweight JWT / Token Implementation for PHP
const JWT_SECRET = "mind-museum-secret-key-2026";

function generateToken($payload) {
    $header = base64_encode(json_encode(["alg" => "HS256", "typ" => "JWT"]));
    $payload["iat"] = time();
    $payload["exp"] = time() + (24 * 3600); // 24 hours
    $payloadEncoded = base64_encode(json_encode($payload));
    $signature = hash_hmac("sha256", "$header.$payloadEncoded", JWT_SECRET, true);
    $sigEncoded = base64_encode($signature);
    return "$header.$payloadEncoded.$sigEncoded";
}

function verifyToken($token) {
    $parts = explode(".", $token);
    if (count($parts) !== 3) return false;
    list($header, $payload, $sig) = $parts;
    $validSig = base64_encode(hash_hmac("sha256", "$header.$payload", JWT_SECRET, true));
    if (!hash_equals($validSig, $sig)) return false;
    $data = json_decode(base64_decode($payload), true);
    if (isset($data["exp"]) && $data["exp"] < time()) return false;
    return $data;
}

function getAuthenticatedUser() {
    $headers = getallheaders();
    $auth = $headers['Authorization'] ?? $headers['authorization'] ?? '';
    if (!preg_match('/Bearer\s(\S+)/', $auth, $matches)) {
        sendError("Access token required. Please sign in or continue as Guest.", 401);
    }
    $decoded = verifyToken($matches[1]);
    if (!$decoded) {
        sendError("Invalid or expired visitor session.", 403);
    }
    return $decoded;
}
