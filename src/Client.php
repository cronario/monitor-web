<?php

class Client
{

    protected $config
        = [

        ];

    public function __construct(array $config = [])
    {
        $this->config = array_merge($this->config, $config);
    }


    public function getData()
    {

        return [
            'default' => [
                'queues'   => [
                    'queue-1',
                    'queue-2',
                    'queue-3',
                    'queue-4',
                ],
                'managers' => [
                    'manager-1',
                    'manager-2',
                    'manager-3',
                    'manager-4',
                ],
            ]
        ];
    }

}