<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.php'; // database config

try {
    $query = "SELECT row, col, color FROM Pixel";
    $stmt = $conn->prepare($query);
    $stmt->execute();

    $pixels = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($pixels);
} catch (PDOException $e) {
    echo json_encode(["error" => "Connection Error: " . $e->getMessage()]);
}
?>