<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require 'config.php'; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $row = $data['row'];
    $col = $data['col'];

    $stmt = $conn->prepare("
        SELECT u.username 
        FROM Pixel p
        JOIN \"User\" u ON p.userId = u.id
        WHERE p.row = :row AND p.col = :col
    ");
    $stmt->execute(['row' => $row, 'col' => $col]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        echo json_encode(['username' => $result['username']]);
    } else {
        echo json_encode(['error' => 'Pixel not found']);
    }
} else {
    echo json_encode(['error' => 'Mehod not allowed']);
}
?>