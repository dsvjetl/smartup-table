<?php

require '../database/DatabaseManager.php';
require '../headers/Headers.php';

$db = new DatabaseManager();

$tableId = $_POST['tableId'];

if (isset($tableId)) {
    $db->disconnectTable($tableId);
}