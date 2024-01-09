<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');
$json_data = file_get_contents('php://input');
error_log("Received JSON data: $json_data");
$data = json_decode($json_data, true);
print($data);

$servername = "localhost";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";
$uploadDirectory = "Art/"; // Directory to store the uploaded profile pictures

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Retrieve the form data
    $image = $_FILES['image'];
    $prize = $_POST['prize'];
    $username = $_POST['username'];
    $title = $_POST['title'];
    

    // Check if the user exists
    $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Fetch the user ID
        $userId = $result->fetch_assoc()['id'];

        // Generate a unique filename for the uploaded image
        $newFilename = uniqid() . '_' . $image['name'];
        $destination = $uploadDirectory . $newFilename;

        // Move the uploaded file to the specified destination
        if (move_uploaded_file($image['tmp_name'], $destination)) {
            // Insert a new record into the database
            $insertStmt = $conn->prepare("INSERT INTO artwork (userid, image, prize, title) VALUES (?, ?, ?, ?)");
            $insertStmt->bind_param("isss", $userId, $newFilename, $prize, $title);
            $insertStmt->execute();

            if ($insertStmt->affected_rows > 0) {
                $response = [
                    'success' => true,
                    'message' => 'Artwork uploaded successfully',
                    'filename' => $newFilename,
                    'url' => 'Art/' . $newFilename
                ];
            } else {
                // Delete the uploaded file if the database insertion fails
                unlink($destination);

                $response = [
                    'success' => false,
                    'message' => 'Failed to upload artwork to the database',
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
            'message' => 'User does not exist',
        ];
    }

    $stmt->close();
} else {
    $response = [
        'success' => false,
        'message' => 'Invalid request method',
    ];
}

echo json_encode($response);