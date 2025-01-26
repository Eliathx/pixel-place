<?php
session_start();
include 'config.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'] ?? '';
$password = $data['password'] ?? '';

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Campos requeridos']);
    exit;
}

try {
    $stmt = $conn->prepare('SELECT * FROM "User" WHERE username = :username');
    $stmt->bindParam(':username', $username);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && $password === $user['password']) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        echo json_encode(['success' => true, 'username' => $user['username']]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Credenciales inválidas']);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Error en la base de datos']);
}
?>