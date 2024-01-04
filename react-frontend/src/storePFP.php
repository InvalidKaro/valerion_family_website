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
$uploadDirectory = "profile_pictures/"; // Directory to store the uploaded profile pictures

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($data['username']) && isset($data['profilePicture'])) {
        $username = $data['username'];
        $profilePicture = $_FILES['profilePicture'];

        // Check if the user exists
        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Generate a unique filename for the profile picture
            $filename = uniqid() . '_' . $profilePicture['name'];
            $destination = $uploadDirectory . $filename;

            // Move the uploaded file to the specified destination
            if (move_uploaded_file($profilePicture['tmp_name'], $destination)) {
                // Insert the picture details into the "pictures" table
                $insertStmt = $conn->prepare("INSERT INTO profile_pictures (filename, filetype, userid) VALUES (?, ?, ?)");
                $filetype = pathinfo($destination, PATHINFO_EXTENSION);
                $userid = $result->fetch_assoc()['id'];
                $insertStmt->bind_param("ssi", $filename, $filetype, $userid);
                $insertStmt->execute();

                if ($insertStmt->affected_rows > 0) {
                    $response = [
                        'success' => true,
                        'message' => 'Profile picture uploaded and saved successfully',
                    ];
                } else {
                    // Delete the uploaded file if the database insertion fails
                    unlink($destination);

                    $response = [
                        'success' => false,
                        'message' => 'Failed to save profile picture',
                    ];
                }

                $insertStmt->close();
            } else {
                $response = [
                    'success' => false,
                    'message' => 'Failed to move the uploaded file',
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