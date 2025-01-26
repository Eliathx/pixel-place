<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.php'; // database config

try {
    $query = "
        SELECT u.id, u.username, u.pixelsPlaced
        FROM \"User\" u
        GROUP BY u.id, u.username
        ORDER BY pixelsPlaced DESC
        LIMIT 5;
    ";

    $stmt = $conn->prepare($query);
    $stmt->execute();

    $topUsers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($topUsers);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
}
?>