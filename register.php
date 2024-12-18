<?php
$host = "localhost"; // или другой хост, если не на локальной машине
$username = "root"; // имя пользователя базы данных
$password = "root"; // пароль пользователя базы данных
$dbname = "openserver"; // имя базы данных

// Создаем подключение
$conn = new mysqli($host, $username, $password, $dbname);

// Проверяем подключение
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // хешируем пароль для безопасности

    // Проверка, существует ли уже пользователь с таким email
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo "Пользователь с таким email уже существует!";
    } else {
        // Вставка данных в таблицу
        $sql = "INSERT INTO users (name, email, password, date_reg) VALUES (?, ?, ?, NOW())";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss", $name, $email, $password);

        if ($stmt->execute()) {
            echo "Регистрация прошла успешно!";
        } else {
            echo "Ошибка: " . $stmt->error;
        }
    }
}
$conn->close();
?>
