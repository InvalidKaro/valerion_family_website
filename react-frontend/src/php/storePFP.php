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
    if (isset($_POST['username']) && isset($_FILES['profilePicture'])) {
        $username = $_POST['username'];
        $profilePicture = $_FILES['profilePicture'];

        // Check if the user exists
        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Fetch the user ID
            $userId = $result->fetch_assoc()['id'];

            // Check if the user already has a profile picture
            $checkStmt = $conn->prepare("SELECT * FROM profile_pictures WHERE userid = ?");
            $checkStmt->bind_param("i", $userId);
            $checkStmt->execute();
            $checkResult = $checkStmt->get_result();

            if ($checkResult->num_rows > 0) {
                // Fetch the old profile picture details
                $oldPictureDetails = $checkResult->fetch_assoc();
                $oldFilename = $oldPictureDetails['filename'];

                // Delete the old profile picture file
                unlink($uploadDirectory . $oldFilename);
            }

            // Generate a unique filename for the new profile picture
            $newFilename = uniqid() . '_' . $profilePicture['name'];
            $destination = $uploadDirectory . $newFilename;

            // Move the uploaded file to the specified destination
            if (move_uploaded_file($profilePicture['tmp_name'], $destination)) {
                if ($checkResult->num_rows > 0) {
                    // Update the profile picture details in the database
                    $updateStmt = $conn->prepare("UPDATE profile_pictures SET filename = ?, filetype = ? WHERE userid = ?");
                    $filetype = pathinfo($destination, PATHINFO_EXTENSION);
                    $updateStmt->bind_param("ssi", $newFilename, $filetype, $userId);
                    $updateStmt->execute();

                    if ($updateStmt->affected_rows > 0) {
                        $response = [
                            'success' => true,
                            'message' => 'Profile picture updated successfully',
                            'fileType' => $filetype,
                            'filename' => $newFilename,
                            'url' => 'profile_pictures/' . $newFilename
                        ];
                    } else {
                        // Delete the uploaded file if the database update fails
                        unlink($destination);

                        $response = [
                            'success' => false,
                            'message' => 'Failed to update profile picture in the database',
                        ];
                    }

                    $updateStmt->close();
                } else {
                    // Insert a new record into profile_pictures table
                    $insertStmt = $conn->prepare("INSERT INTO profile_pictures (userid, filename, filetype) VALUES (?, ?, ?)");
                    $filetype = pathinfo($destination, PATHINFO_EXTENSION);
                    $insertStmt->bind_param("iss", $userId, $newFilename, $filetype);
                    $insertStmt->execute();

                    if ($insertStmt->affected_rows > 0) {
                        $response = [
                            'success' => true,
                            'message' => 'Profile picture added successfully',
                            'fileType' => $filetype,
                            'filename' => $newFilename,
                            'url' => 'profile_pictures/' . $newFilename
                        ];
                    } else {
                        // Delete the uploaded file if the database insert fails
                        unlink($destination);

                        $response = [
                            'success' => false,
                            'message' => 'Failed to add profile picture to the database',
                        ];
                    }

                    $insertStmt->close();
                }
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

        $checkStmt->close();
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
