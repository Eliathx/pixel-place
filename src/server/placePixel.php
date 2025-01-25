<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.php'; // database config

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['row']) || !isset($data['col']) || !isset($data['color'])) {
    echo json_encode(["error" => "Datos incompletos"]);
    exit;
}

$row = $data['row'];
$col = $data['col'];
$color = $data['color'];

try {
    // insert or update pixel
    $query = "INSERT INTO Pixel (row, col, color, userId) VALUES (:row, :col, :color, 1)
              ON CONFLICT (row, col) DO UPDATE SET color = :color";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':row', $row);
    $stmt->bindParam(':col', $col);
    $stmt->bindParam(':color', $color);
    $stmt->execute();

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
}
?>