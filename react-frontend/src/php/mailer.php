<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";

$mail = $_POST['email'];


// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the token from the database
$stmt = $conn->prepare("SELECT reset_token FROM users WHERE mail = ?");
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->bind_result($token);
$stmt->fetch();
$stmt->close();

// Check if a token was found
if ($token) {
    // Send email with the token and link
    $to = $mail;
    $subject = 'Password Reset';
    $message = 'To reset your password, click the following link: ' . "http://localhost/reset-password.php?token=$token";
    $headers = 'From: mail@invalidkaro.dev' . "\r\n" .
               'Reply-To: mail@invalidkaro.dev' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    // Send the email
    if (mail($to, $subject, $message, $headers)) {
        echo 'Email sent successfully.';
    } else {
        echo 'Failed to send email.';
    }
} else {
    echo 'Token not found in the database for the specified email.';
}

// Close database connection
$conn->close();
?>