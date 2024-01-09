<?php

// Get the image file path from the query parameter
$imagePath = $_GET['image'];

// Load the original image
$image = imagecreatefromjpeg($imagePath);

// Load the watermark image
$watermark = imagecreatefrompng('localhost:80/Art/watermark.png');

// Get the dimensions of the original image and the watermark image
$imageWidth = imagesx($image);
$imageHeight = imagesy($image);
$watermarkWidth = imagesx($watermark);
$watermarkHeight = imagesy($watermark);

// Calculate the position to place the watermark (bottom right corner with some padding)
$padding = 8;
$positionX = $imageWidth - $watermarkWidth - $padding;
$positionY = $imageHeight - $watermarkHeight - $padding;

// Apply the watermark to the original image
imagecopy($image, $watermark, $positionX, $positionY, 0, 0, $watermarkWidth, $watermarkHeight);

// Save the edited image to a temporary file
$editedImagePath = 'localhost:80' . basename($imagePath);
imagejpeg($image, $editedImagePath);

// Free up memory
imagedestroy($image);
imagedestroy($watermark);

// Return the edited image URL as the response
echo $editedImagePath;