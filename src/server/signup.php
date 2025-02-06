<?php
include 'config.php';

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data['username']) || !isset($data['password'])) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Username and password are required."]);
        exit;
    }

    $username = htmlspecialchars($data['username']);
    $password = htmlspecialchars($data['password']);
    try {
        // verify if the user already exists
        $stmt = $conn->prepare('SELECT * FROM "User" WHERE username = :username');
        $stmt->bindParam(':username', $user);
        $stmt->execute();
        $user = $stmt->fetch();
        if ($user) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Username already exists."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error in the database."]);
    }
    try {
        $stmt = $conn->prepare('INSERT INTO "User" (username, password) VALUES (:username, :password)');
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':password', $password);
    
        if ($stmt->execute()) {
            echo json_encode(["success" => true, "message" => "New user created successfully. "]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error creating user."]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Error in the database." . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Invalid request method."]);
}
?>