<?php

class Database
{

    //-DB config-//
    private $serverName = 'localhost';
    private $userName = 'root';
    private $password = 'root';
    private $dbName = 'smartup_table';

    /**
     * @return mysqli
     */
    public function conn()
    {
        $conn = new mysqli($this->serverName, $this->userName, $this->password, $this->dbName);

        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }

        return $conn;
    }

    //-DB operations-//

    /**
     * @param {object} $result
     * @return array
     */
    public function getRows($result) {
        $data = [];

        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                array_push($data, $row);
            }
        } else {
            array_push($data, [
                'status' => false,
                'desc' => 'Error while fetching rows in ' . $result
            ]);
        }

        return $data;
    }

    /**
     * @param string $error
     */
    public function returnError($error = 'ERROR')
    {
        echo json_encode([
            'status' => false,
            'desc' => 'Error: ' . $error
        ]);
    }

    /**
     * @param object $data
     * @param string $desc
     */
    public function response($data, $desc = 'SUCCESS')
    {
        echo json_encode([
            'status' => true,
            'desc' => $desc,
            'data' => $data
        ]);
    }

    /**
     * @param $data
     * @return string
     */
    public function JE($data) {
        return json_encode($data);
    }

}