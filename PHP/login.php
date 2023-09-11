<?php
session_start(); // Starting Session
$error=''; // Variable To Store Error Message
//login pentru clienti----------------------------------------------------------------------------------------------------------
if (isset($_POST['login'])) {
		if (empty($_POST['username']) || empty($_POST['password'])) {
							$stringul = "Location: index.php?message=TOATE CAMPURILE SUNT OBLIGATORII!";
							header($stringul);
								}
else
{
// Define $username and $password
$username=$_POST['username'];
$password=$_POST['password'];

$dbname = "service";

$con = mysqli_connect("localhost", "root", "", $dbname);

if (mysqli_connect_errno())
{
  die('Could not connect: ' . mysqli_connect_error());
}
$toSearchPass = md5($password);
$stmt = mysqli_prepare($con,"SELECT * FROM utilizator WHERE user_password=? AND username=?");
$bind = mysqli_stmt_bind_param($stmt, "ss", $toSearchPass, $username);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
if ($result)
  {
	$rowcount=mysqli_num_rows($result);
  }
$row = mysqli_fetch_assoc($result);
if ($rowcount == 1){
				$iduser = $row['iduser'];
				$username = $row['username'];
                                $nume = $row['nume_prenume'];
                                $esteAdmin = $row['is_admin'];
				$_SESSION["username"]=$username;
				$_SESSION["iduser"]=$iduser;
                                $_SESSION["numeutilizator"]=$nume;
                                if ($esteAdmin > 0) {$stringul = "Location: profileAdmin.php";
                                                        header($stringul);}
                                else {$stringul = "Location: profileAngajat.php";
							header($stringul);}
                                
			}
	else {
		$stringul = "Location: index.php?message=Username/parola INCORECTA sau CONTUL nu este VALIDAT!";
		header($stringul);
	}
mysqli_stmt_close($stmt);
mysqli_close($con);
}	
}
?>