<?php

// Allow Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

$json_data = file_get_contents('php://input');
error_log("Received JSON data: $json_data");
$data = json_decode($json_data, true);
// Establish a connection to your database
include_once("_var.php");
$dbname = "login";

// Create a new database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the connection was successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}



if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $username = $data['username'];
    $password = $data['password'];
    $mail = $data['mail'];
    // Hash the password using bcrypt
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    // Generate reset and verify tokens
    $resetToken = bin2hex(random_bytes(32));
    $verifyToken = bin2hex(random_bytes(32));

    // Prepare and execute the SQL query to insert the values into the "users" table
    $stmt = $conn->prepare("INSERT INTO users (username, password, mail, reset_token, verification_token) VALUES (?, ?, ?, ?, ?);");
    $stmt->bind_param("sssss", $username, $hashedPassword, $mail, $resetToken, $verifyToken);
    $stmt->execute();
    $stmt->close();

    // Close the database connection
    $conn->close();
    $response = [];
    // Send the email
    $to = $mail;
    $subject = 'Welcome to V-Arts';
    $message = '<html><body>';
    $message .= '<h2>Dear ' . $username . ',</h2>';
    $message .= '<p>Thank you for choosing our platform for your future contribution to the artistry!<br></br>We would love to have you in the team of creative people all around the world!<br></br><br></br>Best regards,<br></br>V-Arts</p>';
    $message .= 'To verify your Account, please click on the link below:<br></br>';
    $message .= '<bold><a href="http://localhost:80/verify.php?token=' . $verifyToken . '">Click here to verify your account</a></bold>'; // Added line to mask the URL
    $message .= '</body></html>';
    $headers = 'From: varts.dev@gmail.com' . "\r\n" .
               'Reply-To: varts.dev@gmail.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion() ."\r\n" .
               "MIME-Version: 1.0" . "\r\n" .
               "Content-type: text/html; charset=UTF-8" . "\r\n";

    if (mail($to, $subject, $message, $headers)) {
        $response = [
            'success' => true,
            'message' => 'Recovery-Mail sent successfully',
        ];
    } else {
        $response = [
            'success' => false,
            'message' => 'Failed to send email.',
        ];
    }
} else {
    $response = [
        'success' => false,
        'message' => 'Error registering user',
    ];
}

header("Content-Type: application/json"); // Set the response header to indicate JSON content
echo json_encode($response);
?>