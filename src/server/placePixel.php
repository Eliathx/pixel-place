<?php
require __DIR__ . '/vendor/autoload.php';
require_once 'config.php'; // configuración de la base de datos

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

use WebSocket\Client;

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['row']) || !isset($data['col']) || !isset($data['color'])) {
    echo json_encode(["error" => "Missing data"]);
    exit;
}

$row = $data['row'];
$col = $data['col'];
$color = $data['color'];
$username = $data['username'];

try {
    // Obtener el ID del usuario
    $queryUserId = 'SELECT id FROM "User" WHERE username = :username';
    $stmtUserId = $conn->prepare($queryUserId);
    $stmtUserId->bindParam(':username', $username);
    $stmtUserId->execute();
    $userId = $stmtUserId->fetchColumn();

    if (!$userId) {
        echo json_encode(["error" => "User not found"]);
        exit;
    }

    // Insertar o actualizar el píxel
    $query = "INSERT INTO Pixel (row, col, color, userId) VALUES (:row, :col, :color, :userId)
              ON CONFLICT (row, col) DO UPDATE SET color = :color";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':row', $row);
    $stmt->bindParam(':col', $col);
    $stmt->bindParam(':color', $color);
    $stmt->bindParam(':userId', $userId); 
    $stmt->execute();

    $queryUpdatePixelsPlaced = 'UPDATE "User" SET "pixelsplaced" = "pixelsplaced" + 1 WHERE id = :userId';
    $stmtUpdatePixelsPlaced = $conn->prepare($queryUpdatePixelsPlaced);
    $stmtUpdatePixelsPlaced->bindParam(':userId', $userId);
    $stmtUpdatePixelsPlaced->execute();

    // Enviar mensaje al WebSocket
    $client = new Client("ws://localhost:8080");
    $client->send(json_encode([
        'action' => 'placePixel',
        'row' => $row,
        'col' => $col,
        'color' => $color,
    ]));
    $client->close();

    echo json_encode(["success" => true, "message" => "Pixel saved and transmitted"]);

} catch (PDOException $e) {
    echo json_encode(["error" => "Database error: " . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(["error" => "Error trying to connect to websocket: " . $e->getMessage()]);
}
?>