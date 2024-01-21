<?php
// Get the image file path and extension from the request body
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

$data = json_decode(file_get_contents('php://input'), true);

// Check if the expected keys are present and not null
$imagePath = str_replace('&quot;', '"', urldecode($_GET['image'])); // Replace HTML entity encoding for double quotes
$extension = $_GET['ext']; 

// Fetch the image content from the URL
$imageContent = file_get_contents($imagePath);

// Create the original image from the fetched content based on the file extension
if ($extension == 'jpg' || $extension == 'jpeg') {
    $image = imagecreatefromstring($imageContent);
    if ($image === false) {
        // Handle the case where loading the JPEG image fails
        echo json_encode(['success' => false, 'message' => 'Failed to load JPEG image']);
        exit;
    }
} elseif ($extension == 'png') {
    $image = imagecreatefromstring($imageContent);
    if ($image === false) {
        // Handle the case where loading the PNG image fails
        echo json_encode(['success' => false, 'message' => 'Failed to load PNG image']);
        exit;
    }
} else {
    // Handle unsupported image formats
    echo json_encode(['success' => false, 'message' => 'Unsupported image format']);
    exit;
}
    // Load the watermark image
    $watermarkPath = 'http://localhost:80/Art/watermark.png'; // Replace with the correct path to the watermark image
    $watermark = imagecreatefrompng($watermarkPath);
    if ($watermark === false) {
        // Handle the case where loading the watermark image fails
        echo json_encode(['success' => false, 'message' => 'Failed to load watermark image']);
        exit;
    }

    // Enable alpha blending for the watermark image
    imagealphablending($watermark, true);

    // Preserve transparency of the watermark image
    imagesavealpha($watermark, true);

    // Get the dimensions of the original image and the watermark image
    $imageWidth = imagesx($image);
    $imageHeight = imagesy($image);
    $watermarkWidth = imagesx($watermark);
    $watermarkHeight = imagesy($watermark);

    // Scale the watermark to be 50% of the original image size (you can adjust the scale factor as needed)
    $scaleFactor = 0.5;
    $watermarkNewWidth = $watermarkWidth * $scaleFactor;
    $watermarkNewHeight = $watermarkHeight * $scaleFactor;

    // Ensure the scaled watermark dimensions do not exceed the dimensions of the original image
    if ($watermarkNewWidth > $imageWidth || $watermarkNewHeight > $imageHeight) {
        $scaleFactor = min($imageWidth / $watermarkWidth, $imageHeight / $watermarkHeight);
        $watermarkNewWidth = $watermarkWidth * $scaleFactor;
        $watermarkNewHeight = $watermarkHeight * $scaleFactor;
    }

    $watermarkResized = imagescale($watermark, $watermarkNewWidth, $watermarkNewHeight);

    // Calculate the position to place the watermark in the exact middle without going outside the original image
    $positionX = max(($imageWidth - $watermarkNewWidth) / 2, 0); // Ensure the watermark is not placed outside the left edge
    $positionY = max(($imageHeight - $watermarkNewHeight) / 2, 0); // Ensure the watermark is not placed outside the top edge

    // Apply the scaled watermark to the original image at the calculated position
    imagecopy($image, $watermarkResized, $positionX, $positionY, 0, 0, $watermarkNewWidth, $watermarkNewHeight);


    // Save the edited image with watermark
    $watermarkedImagePath = 'C:/xampp/htdocs/Art/watermarked_' . basename($imagePath);
    if ($extension == 'jpg' || $extension == 'jpeg') {
        imagejpeg($image, $watermarkedImagePath);
    } elseif ($extension == 'png') {
        imagepng($image, $watermarkedImagePath);
    }

    // Free up memory
    imagedestroy($image);
    imagedestroy($watermark);

    // Return the watermarked image URL as the response
    echo json_encode(['success' => true, 'url' => $watermarkedImagePath]);

?>