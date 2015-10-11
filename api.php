<?php

require_once('bootstrap.php');

function sendResponse($data)
{
    echo json_encode($data);
    exit(0);
}


$response = [
    'ok'  => true,
    'msg' => 'undefined request ...'
];

if ($_REQUEST['action'] == 'stats') {
    \Cronario\Facade::getStats();
    $response['data'] = ['1', '2', '3', '...'];
    sendResponse($response);
}


if ($_REQUEST['action'] == 'daemon') {

    $command = trim($_REQUEST['command']);
    $appId = trim($_REQUEST['appId']);

    if (!in_array($appId, $config['appId-set'])) {
        sendResponse(['msg' => "appId is undefined in config : {$appId}"]);
    }

    if (!in_array($command, $config['command-set'])) {
        sendResponse(['msg' => "command is undefined in config : {$command}"]);
    }

    shell_exec(strtr($config['shell-command'], [
        '{appId}'   => $appId,
        '{command}' => $command,
    ]));

    sendResponse(['msg' => "Send to {appId} command {$command} success!"]);
}

// default response
sendResponse($response);

