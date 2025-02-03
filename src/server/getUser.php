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
    $username = $_SESSION['username'];

    try {
        // Obtener datos del usuario
        $stmt = $conn->prepare("SELECT id, pixelsplaced, creationdate FROM \"User\" WHERE username = :username");
        $stmt->execute(['username' => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Obtener posición en el ranking
            $leaderboardStmt = $conn->prepare("
                SELECT COUNT(*) + 1 AS rank 
                FROM \"User\" 
                WHERE pixelsplaced > :pixelsplaced
            ");
            $leaderboardStmt->execute(['pixelsplaced' => $user['pixelsplaced']]);

            $leaderboardRank = $leaderboardStmt->fetch(PDO::FETCH_ASSOC)['rank'] ?? 1;

            echo json_encode([
                'loggedIn' => true,
                'username' => $username,
                'pixelsplaced' => $user['pixelsplaced'] ?? 0,
                'creationdate' => $user['creationdate'] ?? date('Y-m-d H:i:s'),
                'leaderboardPosition' => $leaderboardRank
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['loggedIn' => false, 'error' => 'User not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(401);
    echo json_encode(['loggedIn' => false]);
}
?>
