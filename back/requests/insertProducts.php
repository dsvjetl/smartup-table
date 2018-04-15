<?php

require '../database/DatabaseManager.php';
require '../headers/Headers.php';

$db = new DatabaseManager();

$productName = $_POST['name'];
$productPrice = $_POST['price'];
$productAmount = $_POST['amount'];

if (isset($productName) && isset($productPrice) && isset($productAmount)) {
    $data = (object)[
        'name' => $productName,
        'price' => $productPrice,
        'amount' => $productAmount
    ];
    $db->insertProducts($data);
} else {
    $db->returnError('Post files not fetched.');
}