<?php

require __DIR__ . '/Database.php';
require '../pusher/Pusher.php';

class DatabaseManager extends Database
{

    //-get from DB-//

    /**
     *
     */
    public function getAllProducts()
    {
        $result = $this->getRows($this->conn()->query("SELECT * FROM products"));
        if ($result) {
            $this->response($result);
        } else {
            $this->returnError('getAllProducts');
        }
    }

    /**
     *
     */
    public function getOrders()
    {
        $result = $this->conn()->query("SELECT * FROM orders");
        if ($result) {
            $this->response($result);
        } else {
            $this->returnError('getOrders');
        }
    }

    /**
     * @param number $tableId
     * @return boolean (0|1)
     */
    private function tableActive($tableId)
    {
        $result = $this->conn()->query("SELECT active FROM tables WHERE id = '$tableId' LIMIT 1");
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                return $row['active'];
            }
        } else {
            $this->returnError('tableActive');
        }
    }


    //-insert into DB-//

    /**
     *
     */
    public function getAllTables()
    {
        $data = [];
        $result = $this->conn()->query("SELECT * FROM tables");
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $item = [
                    'id' => (int)$row['id'],
                    'active' => (int)$row['active'],
                    'token' => $row['token']
                ];
                $data[] = $item;
            }
            $this->response($data);
        } else {
            $this->returnError('getAllTables');
        }
    }

    /**
     * @param number $tableId
     */
    public function connectToTable($tableId)
    {
        $token = time() . rand();
        if ($this->conn()->query("UPDATE tables SET active = TRUE, token = '$token' WHERE id = '$tableId'")) {
            $response = [
                'desc' => 'table connected',
                'status' => true,
                'tableId' => $tableId,
                'token' => $token
            ];
            $this->response($response);
            $channel = 't' . $tableId;
            $pusher = new Pusher();
            $pusher->push($channel, 'connectToTable', $response);
        } else {
            $this->returnError([
                'desc' => 'table not connected',
                'status' => false,
                'tableId' => $tableId
            ]);
        }
    }

    /**
     * @param number $tableId
     */
    public function disconnectTable($tableId)
    {
        if ($this->conn()->query("UPDATE tables SET active = FALSE, token = 0 WHERE id = '$tableId'")) {
            $this->response([
                'desc' => 'table disconnected',
                'status' => true,
                'tableId' => $tableId
            ]);
        } else {
            $this->returnError([
                'desc' => 'table not disconnected',
                'status' => false,
                'tableId' => $tableId
            ]);
        }
    }

    /**
     * @param object $data
     */
    public function insertProducts($data)
    {
        if ($this->conn()->query("INSERT INTO products (name, price, amount) VALUES ('$data->name', '$data->price', '$data->amount')")) {
            $this->getAllProducts();
        } else {
            $this->returnError('insertProducts');
        }
    }

    /**
     * If success, this method calls “orderProducts“
     *
     * @param object $data
     */
    public function makeOrder($data)
    {
        $conn = $this->conn();
        if ($this->tableActive($data->tableId)) {
            if ($conn->query("INSERT INTO orders (tableId) VALUES ('$data->tableId')")) {
                $currentOrderId = mysqli_insert_id($conn);
                $this->orderProducts($data->orderedProducts, $currentOrderId);
            } else {
                $this->returnError('makeOrder');
            }
        } else {
            $this->returnError('table inactive');
        }
    }

    /**
     * Private method invoked by “makeOrder“ method
     *
     * @param array $orderedProducts
     * @param number $currentOrderId
     */
    private function orderProducts($orderedProducts, $currentOrderId)
    {
        foreach ($orderedProducts as $product) {
            $objProduct = (object)$product;
            $this->conn()->query("INSERT INTO order_products (orderId, productId, productCount) VALUES ('$currentOrderId', '$objProduct->productId', '$objProduct->productCount')");
        }
        $this->response([
            'ordered' => true
        ]);
    }

}