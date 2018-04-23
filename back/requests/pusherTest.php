<?php

require '../pusher/Pusher.php';

$pusher = new Pusher();

$data['message'] = 'hello world';
$pusher->push('t1', 'event', $data);