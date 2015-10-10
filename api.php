<?php

require_once('vendor/autoloader.php');

$client = new Client([

]);

echo json_encode($client->getData());
