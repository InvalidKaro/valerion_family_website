<?php
// Set the response headers to allow cross-origin requests and specify the content type
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

// Retrieve the JSON data from the request body
$json_data = file_get_contents('php://input');
// Log the received JSON data
error_log("Received JSON data: $json_data");
// Decode the JSON data into an associative array
$data = json_decode($json_data, true);

$servername = "localhost";
$username = "root";
$password = "b59]UY]jp9@ASDac";
$dbname = "login";
// Directory to store the uploaded profile pictures
$uploadDirectory = "profile_pictures/"; 

// Create a new MySQLi object for database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check if the connection to the database is successful
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Check if the 'username' and 'profilePicture' fields are present in the request data
    if (isset($data['username']) && isset($data['profilePicture'])) {

        // Get the username and profile picture data from the request
        $username = $data['username'];
        $profilePicture = $_FILES['profilePicture'];

        // Check if the user exists in the database
        $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        // If the user exists
        if ($result->num_rows > 0) {
            // Generate a unique filename for the profile picture
            $filename = uniqid() . '_' . $profilePicture['name'];
            // Specify the destination path to move the uploaded file
            $destination = $uploadDirectory . $filename;

            // Move the uploaded file to the specified destination
            if (move_uploaded_file($profilePicture['tmp_name'], $destination)) {
                // Insert the picture details into the "profile_pictures" table
                $insertStmt = $conn->prepare("INSERT INTO profile_pictures (filename, filetype, userid) VALUES (?, ?, ?)");
                // Get the file type from the destination path
                $filetype = pathinfo($destination, PATHINFO_EXTENSION);
                // Get the user ID from the fetched result
                $userid = $result->fetch_assoc()['id'];
                $insertStmt->bind_param("ssi", $filename, $filetype, $userid);
                $insertStmt->execute();

                // Check if the database insertion is successful
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

// Close the database connection
$conn->close();

// Set the response content type to JSON
header('Content-Type: application/json');
// Encode the response array as JSON and echo it
echo json_encode($response);
?>