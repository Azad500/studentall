<?php
// Formdan gelen bilgileri al
$name = $_POST['name'] ?? '';
$surname = $_POST['surname'] ?? '';
$date = $_POST['date'] ?? '';
$education = $_POST['education'] ?? '';
$faculity = $_POST['faculity'] ?? '';
$phone = $_POST['phone'] ?? '';

error_log($name,0);

// CSV dosyasına yazmak için bir dize oluştur
$data = array($name, $surname, $date, $education, $faculity, $phone);

// CSV dosyasını aç
$file = fopen('data.csv', 'a');

if ($file) {
    // Diziyi CSV dosyasına yaz
    fputcsv($file, $data);

    // Dosyayı kapat
    fclose($file);
} else {
    error_log("Dosya açılamadı!",0);
}

// Kullanıcıyı tekrar forma yönlendir
header('Location: index.html');
exit;
?>