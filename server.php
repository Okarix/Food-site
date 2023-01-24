<?php
$_POST = json_decode(file_get_contents("php://input"), true); // получить json данные для php
echo var_dump($_POST); // это команда берет те данные которые пришли с клиента, превращает их в строку и показывает нам на клиенте(это response)