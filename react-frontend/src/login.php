<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
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
    if (isset($data['username'])) {
        $username = $data['username'];

        if (isset($data['password'])) {
            // For login, verify the password
            $password = $data['password'];

            $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                $storedPassword = $row['password'];

                if (password_verify($password, $storedPassword)) {
                    $response = [
                        'success' => true,
                        'message' => 'Login successful',
                    ];
                } else {
                    $response = [
                        'success' => false,
                        'message' => 'Invalid credentials',
                    ];
                }
            } else {
                $response = [
                    'success' => false,
                    'message' => 'User not found',
                ];
            }

            $stmt->close();
        } elseif (isset($data['newPassword'])) {
            // For password change, update the password
            $newPassword = password_hash($data['newPassword'], PASSWORD_BCRYPT);

            $stmt = $conn->prepare("UPDATE users SET password = ? WHERE username = ?");
            $stmt->bind_param("ss", $newPassword, $username);
            $stmt->execute();

            if ($stmt->affected_rows > 0) {
                $response = [
                    'success' => true,
                    'message' => 'Password changed successfully',
                ];
            } else {
                $response = [
                    'success' => false,
                    'message' => 'Failed to change password',
                ];
            }

            $stmt->close();
        } else {
            $response = [
                'success' => false,
                'message' => 'Invalid request: Missing password or newPassword',
            ];
        }
    } else {
        $response = [
            'success' => false,
            'message' => 'Invalid request: Missing username',
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
