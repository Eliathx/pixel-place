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
    echo json_encode(["error" => "Datos incompletos"]);
    exit;
}

$row = $data['row'];
$col = $data['col'];
$color = $data['color'];

try {
    // Insertar/actualizar en la base de datos
    $query = "INSERT INTO Pixel (row, col, color, userId) VALUES (:row, :col, :color, 1)
              ON CONFLICT (row, col) DO UPDATE SET color = :color";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':row', $row);
    $stmt->bindParam(':col', $col);
    $stmt->bindParam(':color', $color);
    $stmt->execute();

    // Enviar mensaje al WebSocket
    $client = new Client("ws://localhost:8080");
    $client->send(json_encode([
        'action' => 'placePixel',
        'row' => $row,
        'col' => $col,
        'color' => $color,
    ]));
    $client->close();

    echo json_encode(["success" => true, "message" => "Pixel guardado y transmitido"]);

} catch (PDOException $e) {
    echo json_encode(["error" => "Error en la base de datos: " . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(["error" => "Error al conectar al WebSocket: " . $e->getMessage()]);
}
?>