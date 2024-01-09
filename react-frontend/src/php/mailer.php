<?php

function sendEmail($to, $subject, $message) {
    // Replace the following lines with your actual mail sending logic
    $headers = 'From: mail@invalidkaro.dev' . "\r\n" .
        "Reply-To: $userMail" . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    return mail($to, $subject, $message, $headers);
}
?>
