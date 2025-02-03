<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendor/autoload.php'; // Path to PHPMailer's autoload.php (Adjust the path as needed)

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!isset($data["name"], $data["lastName"], $data["email"], $data["phone"], $data["countryCode"], $data["message"])) {
        echo json_encode(["status" => "error", "message" => "Faltan datos"]);
        exit;
    }

    $name = htmlspecialchars($data["name"]);
    $lastName = htmlspecialchars($data["lastName"]);
    $email = filter_var($data["email"], FILTER_VALIDATE_EMAIL);
    $phone = htmlspecialchars($data["phone"]);
    $countryCode = htmlspecialchars($data["countryCode"]);
    $message = nl2br(htmlspecialchars($data["message"]));

    if (!$email) {
        echo json_encode(["status" => "error", "message" => "Email inválido"]);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host = "smtp.gmail.com";
        $mail->SMTPAuth = true;
        $mail->Username = "whoalredyarewe@gmail.com";
        $mail->Password = "ptnzujibiamfwomo";
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom("info@pixel.com", "Contacto Web Pixel");
        $mail->addAddress("whoalredyarewe@gmail.com", "Soporte Pixel");

        $mail->isHTML(true);
        $mail->Subject = "Nuevo mensaje de contacto";
        $mail->Body = "
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> $name $lastName</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Teléfono:</strong> $countryCode $phone</p>
            <p><strong>Mensaje:</strong><br>$message</p>
        ";

        $mail->send();
        echo json_encode(["status" => "success", "message" => "Correo enviado"]);
    } catch (Exception $e) {
        echo json_encode(["status" => "error", "message" => "Error b: {$mail->ErrorInfo}"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Método no permitido"]);
}
?>
