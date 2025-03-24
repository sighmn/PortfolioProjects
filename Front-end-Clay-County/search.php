<?php


    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "ccdatabaseproject";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection Failed: " . $conn->connect_error);
    }


    if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $search_name =$_POST['granteeName'];  
    
    $sql = "SELECT * FROM ccdatamastertable WHERE `Last Name Grantee_1` LIKE ?";

    $stmt = $conn->prepare($sql);
    
    // Bind the parameter and execute the statement
  
    $stmt->bind_param("s", $search_name);
    $stmt->execute();
    
    // Get the result of the query
    $result = $stmt->get_result();

    // Check if there are any records
    if ($result->num_rows > 0) {
        // Fetch and display each record
        while ($row = $result->fetch_assoc()) {
            echo $row["DATE"] . " - Grantee Last: " . $row["Last Name Grantee_1"] . " - Grantee First: " . $row["First Name Grantee_1"] . " - TSP:" . $row["TSP"] . " - RGE:" . $row["RGE"] . " - SEC:" . $row["SEC"] . "<br>";
        }
    } else {
        echo "No results found";
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();
}
?>


   
