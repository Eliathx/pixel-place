<?php
require __DIR__ . '/vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

class PixelWebSocket implements MessageComponentInterface {
    protected $clients;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
    }

    public function onOpen(ConnectionInterface $conn) {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
    }

    public function onMessage(ConnectionInterface $from, $msg) {
        echo "Mensaje recibido: $msg\n";
        $data = json_decode($msg, true);
    
        if (isset($data['action']) && $data['action'] === 'placePixel') {
            $row = $data['row'];
            $col = $data['col'];
            $color = $data['color'];
    
            echo "Transmitiendo píxel: ($row, $col) -> $color\n";
    
            foreach ($this->clients as $client) {
                $client->send(json_encode([
                    'action' => 'updatePixel',
                    'row' => $row,
                    'col' => $col,
                    'color' => $color,
                ]));
            }
        }
    }

    public function onClose(ConnectionInterface $conn) {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e) {
        echo "An error has occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}
$port = getenv('PORT') ?: 8080;

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new PixelWebSocket()
        )
    ),
    $port, // puerto dinámico
    '0.0.0.0'
);

echo "WebSocket server running on port 8080\n";
$server->run();