<?php
session_start();
include 'config.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
header('Content-Type: application/json');

if (isset($_SESSION['username'])) {
    echo json_encode(['loggedIn' => true, 'username' => $_SESSION['username']]);
} else {
    http_response_code(401);
    echo json_encode(['loggedIn' => false]);
}
?>