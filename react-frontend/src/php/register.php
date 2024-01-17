<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

// Get the JSON input from the client
$json = file_get_contents('php://input');
$data = json_decode($json, true); // Decode JSON data into an associative array

// Establish a connection to your database
$servername = "localhost:3306";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
error_log(print_r($data, true));

$username = $data['username'];
$password = $data['password'];
$mail = $data['mail'];

function generateToken($length = 32)
{
    return bin2hex(random_bytes($length));
}
$resetToken = generateToken();

// Hash the password before storing it in the database
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Check if the username already exists in the database
$stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($count);
$stmt->fetch();
$stmt->close();

if ($count > 0) {
    // Username already exists, generate a unique discriminator
    $unique = false;
    while (!$unique) {
        $discriminator = '#' . str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);

        // Check if the combination of username and discriminator already exists
        $stmt = $conn->prepare("SELECT COUNT(*) FROM users WHERE username = ? AND discriminator = ?");
        $stmt->bind_param("ss", $username, $discriminator);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();

        if ($count == 0) {
            $unique = true;
        }
    }
} else {
    // Username does not exist, use the default discriminator
    $discriminator = '#' . str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);
}

// Use prepared statements to prevent SQL injection
$stmt = $conn->prepare("INSERT INTO users (username, password, mail, reset_token, discriminator) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $username, $hashedPassword, $mail, $resetToken, $discriminator);

// Update the user's reset token in the database

$response = []; // Initialize a response array

if ($stmt->execute()) {
    $response['success'] = true;
    $response['message'] = 'User registered successfully';
    $response['discriminator'] = $discriminator;
    
    $to = $mail;
    $subject = 'Welcome to V-Arts';
    $message = '<html><body>';
    $message .= '<h2>Dear ' . $username . ',</h2>';
    $message .= '<p>Thank you for choosing our platform for your future contribution to the artistry!<br></br>We would love to have you in the team of creative people all around the world!<br></br><br></br>Best regards,<br></br>V-Arts</p>';
    $message .= '</body></html>';
    $headers = 'From: varts.dev@gmail.com' . "\r\n" .
               'Reply-To: varts.dev@gmail.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion() ."\r\n" .
               "MIME-Version: 1.0" . "\r\n" .
               "Content-type: text/html; charset=UTF-8" . "\r\n";

    /*
    // Additional parameters for using SMTP over TLS
    $smtp_host = 'smtp.gmail.com';
    $smtp_port = 587;
    $smtp_username = 'varts.dev@gmail.com';
    $smtp_password = 'nhrcaxbkyrfbrysm';

    // Set the SMTP configuration
    ini_set("SMTP", $smtp_host);
    ini_set("smtp_port", $smtp_port);
    ini_set("sendmail_from", $smtp_username);
    ini_set("smtp_ssl", "tls");
    ini_set("SMTP","ssl://smtp.gmail.com");
    ini_set("smtp_port","587");
    */
    // Send the email using the SMTP server
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


// Output the JSON response
echo json_encode($response);

$stmt->close();
$conn->close();
?>
