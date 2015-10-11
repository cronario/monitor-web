<?php

require_once('bootstrap.php');

function writeLn($msg)
{
    echo $msg . PHP_EOL;
}


if (isset($argv)) {

    $appId = trim($argv[1]);
    $command = trim($argv[2]);

    if (!in_array($command, $config['command-set'])) {
        writeLn("Command not found in config : {$command}");
    } else {

        $producer = \Croanrio\Facade::getProducer($appId);
        writeLn("AppId: {$appId} / execute command : {$command}");

        if ($command == 'start') {
            $producer->start();
        } elseif ($command == 'stop') {
            $producer->stop();
        } elseif ($command == 'kill') {
            $producer->kill();
        } elseif ($command == 'reset') {
            $producer->reset();
        } elseif ($command == 'reload') {
            $producer->reload();
        } else {
            writeLn("need implement ???");
        }
    }
} else {
    writeLn("argv is empty");
}



