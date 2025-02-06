<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once 'config.php'; // database config

try {
    $query = "
    SELECT 
        SUM(pixelsPlaced) AS totalPixelsPlaced,
        MIN(creationDate) AS firstUserCreationDate,
        COUNT(*) FILTER (WHERE pixelsPlaced > 0) AS usersWithAtLeastOnePixel
    FROM \"User\";
    ";
    $stmt = $conn->prepare($query);
    if (!$stmt || !$stmt->execute()) {
        echo json_encode(["error" => "Error de conexión: " . $conn->error]);
        exit();
    }
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        'totalPixelsPlaced' => $result["totalpixelsplaced"] ?? 0,
        'firstUserCreationDate' => $result["firstusercreationdate"] ?? date("Y-m-d H:i:s"),
        'usersWithAtLeastOnePixel' => $result["userswithatleastonepixel"] ?? 0,
        'countries' => 5
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
}
?>