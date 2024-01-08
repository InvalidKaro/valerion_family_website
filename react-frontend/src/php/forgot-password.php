<?php
// Database configuration
$servername = "localhost:3306";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";

// Include necessary files and configurations
require_once('mailer.php'); // Include a mailer library or implement your own

// Function to generate a unique token
function generateToken($length = 32)
{
    return bin2hex(random_bytes($length));
}

// Function to update the user's password reset token in the database
function updateResetToken($conn, $email, $token)
{
    $stmt = $conn->prepare("UPDATE users SET reset_token = ? WHERE email = ?");
    $stmt->bind_param('ss', $token, $email);
    $stmt->execute();
    $stmt->close();
}

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get email from POST data
$email = $_POST['email'];

// Check if the email exists in the database
$stmt = $conn->prepare("SELECT id, username FROM users WHERE email = ?");
$stmt->bind_param('s', $email);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Fetch the username from the result set
    $stmt->bind_result($userId, $fetchedUsername);
    $stmt->fetch();

    // Generate a unique token
    $resetToken = generateToken();

    // Update the user's reset token in the database
    updateResetToken($conn, $email, $resetToken);

    // Compose the password reset email
    $subject = "Password Reset";
    $message = "Dear $fetchedUsername,\n\n"; // Replace "user" with "username"
    $message .= "Please click the following link to reset your password:\n";
    $message .= "http://localhost:80/reset-password.php?token=$resetToken\n\n";
    $message .= "If you didn't request a password reset, please ignore this email.\n\n";
    $message .= "Best regards,\nYour App Team";

    // Send the email
    $result = sendEmail($email, $subject, $message); // Implement your own sendEmail function or use a library

    if ($result) {
        $response = [
            'success' => true,
            'message' => 'Password reset email sent. Check your email for further instructions.'
        ];
    } else {
        $response = [
            'success' => false,
            'message' => 'Failed to send password reset email. Please try again.'
        ];
    }
} else {
    $response = [
        'success' => false,
        'message' => 'Email not found. Please check the entered email address.'
    ];
}

// Close database connection
$stmt->close();
$conn->close();

// Send JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>
