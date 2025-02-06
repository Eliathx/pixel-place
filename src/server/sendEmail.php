<?php
require_once __DIR__ . '/vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php'; // Path to PHPMailer's autoload.php (Adjust the path as needed)

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["name"], $data["lastName"], $data["email"], $data["phone"], $data["countryCode"], $data["message"])) {
        echo json_encode(["status" => "error", "message" => "Data missing"]);
        exit;
    }

    $name = htmlspecialchars($data["name"]);
    $lastName = htmlspecialchars($data["lastName"]);
    $email = filter_var($data["email"], FILTER_VALIDATE_EMAIL);
    $phone = htmlspecialchars($data["phone"]);
    $countryCode = htmlspecialchars($data["countryCode"]);
    $message = nl2br(htmlspecialchars($data["message"]));

    if (!$email) {
        echo json_encode(["status" => "error", "message" => "Invalid email"]);
        exit;
    }

    $mail = new PHPMailer(true);

    
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();

    $requiredEnvVars = ['SMTP_HOST', 'SMTP_AUTH', 'SMTP_USER_MAIL', 'SMTP_PASSWORD', 'SMTP_PORT'];
    foreach ($requiredEnvVars as $envVar) {
        if (!isset($_ENV[$envVar])) {
            error_log("Enviroment variable missing: $envVar");
            die("Configuration error. Contact the administrator.");
        }
    }


    try {
        $mail->isSMTP();
        $mail->Host = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth = $_ENV['SMTP_AUTH'];
        $mail->Username = $_ENV['SMTP_USER_MAIL'];
        $mail->Password = $_ENV['SMTP_PASSWORD'];
        // TODO: Quizas se deberia añadir tambien a .env
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = $_ENV['SMTP_PORT'];

        $mail->setFrom("info@pixel.com", "Web Pixel Contact");
        $mail->addAddress($_ENV['SMTP_USER_MAIL'], "Pixel Support");

        $mail->isHTML(true);
        $mail->Subject = "New contact message";
        $mail->Body = "
            <h2>New contact message</h2>
            <p><strong>Name:</strong> $name $lastName</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Phone:</strong> $countryCode $phone</p>
            <p><strong>Message:</strong><br>$message</p>
        ";

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Email sent"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Error b: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}
?>
