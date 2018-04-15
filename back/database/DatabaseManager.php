<?php

require __DIR__ . '/Database.php';

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

    //-insert into DB-//

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
        if ($this->conn()->query("INSERT INTO orders (tableId) VALUES ('$data->tableId')")) {
            $currentOrderId = $this->conn()->insert_id;
            $this->orderProducts($data->orderedProducts, $currentOrderId);
        } else {
            $this->returnError('makeOrder');
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
        $data = [];
        foreach ($orderedProducts as $orderedProduct) {
            $orderedProduct = (object)$orderedProduct;
            $data[] = '(' . $currentOrderId . ', ' . $orderedProduct->productId . ', ' . $orderedProduct->productCount . ')';
        }
        $data = implode(',', $data);

        $this->response($data);

        if ($this->conn()->query("INSERT INTO order_products (orderId, productId, productCount) VALUES '$data'")) {
            $this->getOrders();
        } else {
            $this->returnError('orderProducts');
        }
    }

}