<?php

require '../vendor/autoload.php';

class Pusher
{

    private $pusher = null;

    /**
     * Pusher constructor.
     */
    public function __construct()
    {
        $this->initPusher();
    }


    //-private-//

    /**
     *
     */
    private function initPusher()
    {
        $options = array(
            'cluster' => 'eu',
            'encrypted' => true
        );
        $this->pusher = new Pusher\Pusher(
            '3770a3be61611f7a1415',
            '5c5f79c68c92cb6c6800',
            '499256',
            $options
        );
    }


    //-public-//

    public function push($channel, $event, $data)
    {
        $this->pusher->trigger($channel, $event, $data);
    }
}