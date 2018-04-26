<?php

require '../database/DatabaseManager.php';
require '../headers/Headers.php';

$pusher = new Pusher();

$db = new DatabaseManager();

$tableId = $_POST['tableId'];

if (isset($tableId)) {
    $db->response([
        'status' => true
    ]);
    $data['tableId'] = (int)$tableId;
    $pusher->push('admin', 'tryTableConnection', $data);
}