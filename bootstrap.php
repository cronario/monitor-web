<?php

requere_once('vendor/autoload.php');

$config = [
    'shell-command' => 'php exec.php {appId} {command} > /dev/null &',
    'appId-set'     => ['default', 'myCustom'],
    'command-set'   => ['start', 'stop', 'kill', 'reset', 'reload'],
];

\Cronario\Facade::addProducer(new \Cronario\Producer());




