<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

$json_data = file_get_contents('php://input');
error_log("Received JSON data: $json_data");
$data = json_decode($json_data, true);

$servername = "localhost";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($data['username']) && isset($data['currentPassword']) && isset($data['newPassword'])) {
        $username = $data['username'];
        $currentPassword = $data['currentPassword'];
        $newPassword = $data['newPassword'];

        // Check if the current password is correct
        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $storedPassword = $row['password'];

            if (password_verify($currentPassword, $storedPassword)) {
                // Check if the new password is different from the old password
                if (password_verify($newPassword, $storedPassword)) {
                    $response = [
                        'success' => false,
                        'message' => 'New password must be different from the old password',
                    ];
                } else {
                    // Update the password
                    $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
                    $updateStmt = $conn->prepare("UPDATE users SET password = ? WHERE username = ?");
                    $updateStmt->bind_param("ss", $hashedNewPassword, $username);
                    $updateStmt->execute();

                    if ($updateStmt->affected_rows > 0) {
                        $response = [
                            'success' => true,
                            'message' => 'Password updated successfully',
                        ];
                    } else {
                        $response = [
                            'success' => false,
                            'message' => 'Failed to update password',
                        ];
                    }

                    $updateStmt->close();
                }
            } else {
                $response = [
                    'success' => false,
                    'message' => 'Invalid current password',
                ];
            }
        } else {
            $response = [
                'success' => false,
                'message' => 'User not found',
            ];
        }

        $stmt->close();
    } else {
        $response = [
            'success' => false,
            'message' => 'Invalid request data',
        ];
    }
} else {
    $response = [
        'success' => false,
        'message' => 'Invalid request method',
    ];
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);

?>