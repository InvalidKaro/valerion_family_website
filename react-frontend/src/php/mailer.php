<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Function to connect to the database
function get_db_connection() {
    $servername = "localhost";
    $username = "root";
    $password = "b59]UY]jp9@ASDac";
    $dbname = "login";
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}


$json_data = file_get_contents('php://input');
error_log("Received JSON data: $json_data");
$data = json_decode($json_data, true);


// Check if JSON data is received and decoding is successful
if (!empty($json_data) && $data !== null) {
    // Extract email from the $data array
    $mail = $data['email'];
} else {
    // Handle empty or invalid JSON data
    echo json_encode(['success' => false, 'message' => 'Invalid or empty JSON data received.']);
    exit;
}

// Create database connection
$conn = get_db_connection();


// Get the token from the database
$stmt = $conn->prepare("SELECT reset_token, username FROM users WHERE mail = ?");
$stmt->bind_param('s', $mail);
$stmt->execute();
$stmt->bind_result($reset_token, $username);
$stmt->fetch();
$stmt->close();

// Check if a token was found
if ($reset_token) {
    error_log("Reset Token: $reset_token");

    // Send email with the token and link using Gmail SMTP
    $to = $mail;
    $subject = 'Password Reset';
    $message = '<html><body>';
    $message .= 'Dear ' . $username . ',<br>';
    $message .= 'We received a request to reset your password. If you did not make this request, please ignore this email.<br>';
    $message .= '<h1>To reset your password, <a href="http://localhost/reset-password.php?token=' . $reset_token . '">click here</a>.</h1>';
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
        'message' => 'Token not found in the database for the specified email.',
    ];
}
echo json_encode($response);

// Close database connection
$conn->close();
?>