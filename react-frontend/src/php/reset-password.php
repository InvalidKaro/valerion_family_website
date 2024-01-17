<?php
// Database configuration
$servername = "localhost";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";

// Get the token from the query parameters
$token = $_GET['token'];

// Create database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the token exists in the database
$stmt = $conn->prepare("SELECT mail FROM users WHERE reset_token = ?");
$stmt->bind_param('s', $token);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    // Token is valid, allow the user to reset the password
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Handle the password reset process here
        $newPassword = $_POST['new_password'];
        // Add additional validation and logic as needed

        // Update the password in the database
        $updateStmt = $conn->prepare("UPDATE users SET password = ? WHERE reset_token = ?");
        $hashedPassword = password_hash($newPassword, PASSWORD_BCRYPT);
        $updateStmt->bind_param('ss', $hashedPassword, $token);
        $updateStmt->execute();

        if ($updateStmt->affected_rows > 0) {
            $message = 'Password reset successfully.';
        } else {
            $message = 'Failed to reset the password.';
        }

        $updateStmt->close();
    }
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
    </head>
    <body>
        <h2>Password Reset</h2>
        <?php if (isset($message)): ?>
            <p><?php echo $message; ?></p>
        <?php else: ?>
            <form action="reset-password.php?token=<?php echo $token; ?>" method="post">
                <label for="new_password">New Password:</label>
                <input type="password" name="new_password" required>
                <br>
                <label for="confirm_password">Confirm Password:</label>
                <input type="password" name="confirm_password" required>
                <br>
                <button type="submit">Reset Password</button>
            </form>
        <?php endif; ?>
    </body>
    </html>
    <?php
} else {
    // Token is invalid or expired
    echo "Invalid token. Please try again.";
}

// Close database connection
$stmt->close();
$conn->close();
?>
