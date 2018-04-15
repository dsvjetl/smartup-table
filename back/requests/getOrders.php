<?php

require '../database/DatabaseManager.php';
require '../headers/Headers.php';

$db = new DatabaseManager();

$order = $_POST['order'];

if (isset($order)) {
    $db->getOrders();
}