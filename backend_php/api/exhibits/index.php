<?php
require_once __DIR__ . '/../../config/db.php';

$jsonPath = __DIR__ . '/../../../data/museum.json';
if (file_exists($jsonPath)) {
    $data = json_decode(file_get_contents($jsonPath), true);
    if (!empty($data['exhibits'])) {
        sendResponse($data['exhibits']);
    }
}

sendError("Exhibits dataset not found on server.", 404);
