<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
session_start();
$details = $_SESSION["numeutilizator"];
$iduser = $_SESSION["iduser"];
if (strlen($details) < 2) {header ("Location: index.php");}
$dbname = "service";
$userDB = "root";
$userPasswordDB = "";
header("Content-Type: application/json; charset=UTF-8");
$obj = json_decode($_POST["details"], false);
if ($obj->whatRun == 'showUsers')
	{
            $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
            $stmt = $conn->prepare("SELECT nume_prenume AS userFullName, iduser AS userId, is_admin AS userType, telefon AS phone, email AS email, username AS userName FROM utilizator WHERE iduser > ?");
            $stmt->bind_param("s", $obj->limit);
            $stmt->execute();
            $result = $stmt->get_result();
            $outp = $result->fetch_all(MYSQLI_ASSOC);

            echo json_encode($outp);
    
	}
if ($obj->whatRun == 'addUser')
	{
                $changedPass = md5($obj->password);
                $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
		if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
		$stmt = mysqli_prepare($mysqli,"INSERT INTO utilizator (username, user_password, nume_prenume, telefon, email, is_admin) VALUES (?,?,?,?,?,?)");
		$bind = mysqli_stmt_bind_param($stmt, "sssssi", $obj->userName, $changedPass, $obj->nameUser, $obj->phone, $obj->email, $obj->userType);
		mysqli_stmt_execute($stmt);
		mysqli_stmt_close($stmt);
		mysqli_close($mysqli);
                $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
                $stmt1 = $conn->prepare("SELECT nume_prenume AS userFullName, iduser AS userId, is_admin AS userType, telefon AS phone, email AS email FROM utilizator WHERE iduser > ?");
                $stmt1->bind_param("s", $obj->limit);
                $stmt1->execute();
                $result = $stmt1->get_result();
                $outp = $result->fetch_all(MYSQLI_ASSOC);

		echo json_encode($outp);
	}
if ($obj->whatRun == 'showEditUser')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT nume_prenume AS userFullName, iduser AS userId, is_admin AS userType, telefon AS phone, email AS email, username AS userName FROM utilizator WHERE iduser = ?");
    $stmt->bind_param("i", $obj->editId);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($outp);

}
if ($obj->whatRun == 'editUserDetails')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"UPDATE utilizator SET username = ?, nume_prenume = ?, telefon = ?, email = ?, is_admin = ? WHERE iduser = ?");
    $bind = mysqli_stmt_bind_param($stmt, "ssssii", $obj->userName,$obj->nameUser, $obj->phone, $obj->email, $obj->userType, $obj->userIdEdit);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $output = ['text' => 'Noile date au fost salvate.'];

    echo json_encode($output);
}
if ($obj->whatRun == 'resetUserPassword')
{
    $changedPass = md5($obj->password);
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"UPDATE utilizator SET password = ? WHERE iduser = ?");
    $bind = mysqli_stmt_bind_param($stmt, "si", $changedPass, $obj->userIdEdit);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);
    $output = ['text' => 'Parola a fost schimbata.'];

    echo json_encode($output);
}
if ($obj->whatRun == 'showProviders')
	{
            $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
            $stmt = $conn->prepare("SELECT idfurnizor AS providerId, denumire AS providerName, cui AS providerCui, telefon AS providerPhone, email AS providerEmail, reprezentant AS providerContact FROM furnizori WHERE idfurnizor > ?");
            $stmt->bind_param("s", $obj->limit);
            $stmt->execute();
            $result = $stmt->get_result();
            $outp = $result->fetch_all(MYSQLI_ASSOC);

            echo json_encode($outp);
    
	}
if ($obj->whatRun == 'addProvider')
    { 
        $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
	if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
	$stmt = mysqli_prepare($mysqli,"INSERT INTO furnizori (denumire, adresa, cui, registru, telefon, email, reprezentant) VALUES (?,?,?,?,?,?,?)");
	$bind = mysqli_stmt_bind_param($stmt, "sssssss", $obj->providerName, $obj->providerAddress, $obj->providerCui, $obj->providerReg, $obj->providerPhone, $obj->providerEmail, $obj->providerContact);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_close($stmt);
	mysqli_close($mysqli);
    $output = ['text' => 'Furnizor adaugat cu succes.'];

    echo json_encode($output);
    }

if ($obj->whatRun == 'providerForEdit')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT denumire AS providerName, adresa AS providerAddress, cui AS providerCui, registru AS providerRegistry, telefon AS providerPhone, email AS providerEmail, reprezentant AS providerContact FROM furnizori WHERE idfurnizor = ?");
    $stmt->bind_param("i", $obj->providerId);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($outp);

}

if ($obj->whatRun == 'saveProviderChanges')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"UPDATE furnizori SET denumire = ?, adresa = ?, cui = ?, registru = ?, telefon = ?, email = ?, reprezentant = ? WHERE idfurnizor = ?");
    $bind = mysqli_stmt_bind_param($stmt, "sssssssi", $obj->providerName, $obj->providerAddress, $obj->providerCui, $obj->providerReg, $obj->providerPhone, $obj->providerEmail, $obj->providerContact, $obj->providerId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);
    $output = ['text' => 'Datele furnizorului '.$obj->providerName.' au fost schimbate.'];

    echo json_encode($output);
}

if ($obj->whatRun == 'showClients')
	{
            $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
            $stmt = $conn->prepare("SELECT idclient AS clientId, nume_prenume AS clientName, adresa AS clientAddress, telefon AS clientPhone, email AS clientEmail FROM clienti_fizici WHERE idclient > ?");
            $stmt->bind_param("s", $obj->limit);
            $stmt->execute();
            $result = $stmt->get_result();
            $outp = $result->fetch_all(MYSQLI_ASSOC);

            echo json_encode($outp);
	}
if ($obj->whatRun == 'addClient')
	{
        $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
        if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
        $stmt = mysqli_prepare($mysqli,"INSERT INTO clienti_fizici (nume_prenume, adresa, telefon, email) VALUES (?,?,?,?)");
        $bind = mysqli_stmt_bind_param($stmt, "ssss", $obj->clientName, $obj->clientAddress, $obj->clientPhone, $obj->clientEmail);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        mysqli_close($mysqli);

    $outp = ['text' => 'Clientul '.$obj->clientName.' a fost adaugat.'];
    echo json_encode($outp);

	}

if ($obj->whatRun == 'showClientDetails')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT nume_prenume AS clientName, adresa AS clientAddress, telefon AS clientPhone, email AS clientEmail FROM clienti_fizici WHERE idclient = ?");
    $stmt->bind_param("i", $obj->clientId);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($outp);
}

if ($obj->whatRun == 'saveClientChanges')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"UPDATE clienti_fizici SET nume_prenume = ?, adresa = ?, telefon = ?, email = ? WHERE idclient = ?");
    $bind = mysqli_stmt_bind_param($stmt, "ssssi", $obj->clientName, $obj->clientAddress, $obj->clientPhone, $obj->clientEmail, $obj->clientEditId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $output = ['text' => 'Datele clientului '.$obj->providerName.' au fost schimbate.'];
    echo json_encode($output);
}

if ($obj->whatRun == 'deleteClient')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"DELETE FROM clienti_fizici WHERE idclient = ?");
    $bind = mysqli_stmt_bind_param($stmt, "i", $obj->clientName);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $output = ['text' => 'Clientul a fost sters din baza de date!'];
    echo json_encode($output);
}

if ($obj->whatRun == 'showCompanies')
	{
            $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
            $stmt = $conn->prepare("SELECT idclient AS companyId, denumire AS companyName, cui AS companyCui, telefon AS companyPhone, email AS companyEmail, reprezentant AS companyContact FROM clienti_juridic WHERE idclient > ?");
            $stmt->bind_param("s", $obj->limit);
            $stmt->execute();
            $result = $stmt->get_result();
            $outp = $result->fetch_all(MYSQLI_ASSOC);

            echo json_encode($outp);
    
	}

if ($obj->whatRun == 'addCompany')
    { 
        $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
        if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
        $stmt = mysqli_prepare($mysqli,"INSERT INTO clienti_juridic (denumire, adresa, cui, registru, telefon, email, reprezentant) VALUES (?,?,?,?,?,?,?)");
        $bind = mysqli_stmt_bind_param($stmt, "sssssss", $obj->companyName, $obj->companyAddress, $obj->companyCui, $obj->companyReg, $obj->companyPhone, $obj->companyEmail, $obj->companyContact);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        mysqli_close($mysqli);

        $outp = ['text' => 'Clientul juridic '.$obj->companyName.' a fost adaugat.'];
        echo json_encode($outp);
    }

if ($obj->whatRun == 'showCompanyDetails')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT denumire AS companyName, adresa AS companyAddress, cui AS companyCui, registru AS companyRegistry, telefon AS companyPhone, email AS companyEmail, reprezentant AS companyContact FROM clienti_juridic WHERE idclient = ?");
    $stmt->bind_param("i", $obj->clientId);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($outp);

}

if ($obj->whatRun == 'saveCompanyChanges')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"UPDATE clienti_juridic SET denumire = ?, adresa = ?, cui = ?, registru = ?, telefon = ?, email = ?, reprezentant = ? WHERE idclient = ?");
    $bind = mysqli_stmt_bind_param($stmt, "sssssssi", $obj->companyName, $obj->companyAddress, $obj->companyCui, $obj->companyReg, $obj->companyPhone, $obj->companyEmail, $obj->companyContact, $obj->editCompanyId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $outp = ['text' => 'Datele pentru '.$obj->companyName.' au fost schimbate.'];
    echo json_encode($outp);
}

if ($obj->whatRun == 'deleteCompany')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"DELETE FROM clienti_juridic WHERE idclient = ?");
    $bind = mysqli_stmt_bind_param($stmt, "i", $obj->companyName);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $outp = ['text' => 'Firma a fost stearsa.'];
    echo json_encode($outp);
}

if ($obj->whatRun == 'showReferenceCodes')
	{
            $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
            $stmt = $conn->prepare("SELECT idreferinta AS referenceId, cod_referinta AS referenceCode, detalii AS details FROM referinte WHERE idreferinta > ?");
            $stmt->bind_param("i", $obj->limit);
            $stmt->execute();
            $result = $stmt->get_result();
            $outp = $result->fetch_all(MYSQLI_ASSOC);

            echo json_encode($outp);
    
	}
if ($obj->whatRun == 'addReferenceCode')
	{
            $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
            if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
            $stmt = mysqli_prepare($mysqli,"INSERT INTO referinte (cod_referinta, detalii) VALUES (?,?)");
            $bind = mysqli_stmt_bind_param($stmt, "ss", $obj->referenceCode, $obj->referenceDetail);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
            mysqli_close($mysqli);

            $outp = ['text' => 'Codul de referinta '.$obj->referenceCode.' adaugat'];
            echo json_encode($outp);
	}

if ($obj->whatRun == 'seeReferenceCodeForUpdate')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT cod_referinta AS referenceCode, detalii AS referenceCodeDetail FROM referinte WHERE idreferinta = ?");
    $stmt->bind_param("i", $obj->referenceId);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($outp);

}

if ($obj->whatRun == 'changeReferenceCode')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"UPDATE referinte SET cod_referinta = ?, detalii = ? WHERE idreferinta = ?");
    $bind = mysqli_stmt_bind_param($stmt, "ssi", $obj->referenceCode,$obj->referenceDetail, $obj->referenceId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $outp = ['text' => 'Datele pentru '.$obj->referenceCode.' au fost schimbate.'];
    echo json_encode($outp);

}

if ($obj->whatRun == 'deleteReferenceCode')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"DELETE FROM referinte WHERE idreferinta = ?");
    $bind = mysqli_stmt_bind_param($stmt, "i", $obj->referenceName);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $outp = ['text' => 'Codul de referinta a fost sters.'];
    echo json_encode($outp);
}

if ($obj->whatRun == 'showProducts')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT produse.idprodus AS productId, produse.codprodus AS productCode, produse.denumire AS productName, produse.pret_vanzare AS productPrice,
                                   referinte.cod_referinta AS referenceCode, tip_produs.denumire AS productType
                                   FROM produse
                                   INNER JOIN referinte ON produse.cod_referinta = referinte.idreferinta
                                   INNER JOIN tip_produs ON produse.tip_produs = tip_produs.idtip
                                   WHERE idprodus > ?
                                   ORDER BY produse.denumire");
    $stmt->bind_param("s", $obj->limit);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($outp);

}

if ($obj->whatRun == 'getProductDetails')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT codprodus AS productCode, denumire AS productName, cod_referinta AS productReference,
                                   tip_produs AS productType, pret_achizitie AS purchasePrice, adaos AS addedValue, pret_vanzare AS sellingPrice
                                   FROM produse
                                   WHERE idprodus = ?");
    $stmt->bind_param("i", $obj->product);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($outp);

}

if ($obj->whatRun == 'getAllReferenceCodes')
	{
            $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
            $stmt = $conn->prepare("SELECT idreferinta AS referenceId, cod_referinta AS referenceCode FROM referinte WHERE idreferinta > ?");
            $stmt->bind_param("i", $obj->limit);
            $stmt->execute();
            $result = $stmt->get_result();
            $outp = $result->fetch_all(MYSQLI_ASSOC);

            echo json_encode($outp);
    
	}
if ($obj->whatRun == 'addProduct')
	{
            $initialStock = 0;
            $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
            if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
            $stmt = mysqli_prepare($mysqli,"INSERT INTO produse (codprodus, denumire, cod_referinta, tip_produs, pret_achizitie, adaos, pret_vanzare, stoc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            $bind = mysqli_stmt_bind_param($stmt, "ssiidddi", $obj->productCode, $obj->productName, $obj->ref, $obj->productType, $obj->productPurchasePrice, $obj->productAddedValue, $obj->productSellingPrice, $initialStock);
            mysqli_stmt_execute($stmt);
            if (mysqli_stmt_affected_rows($stmt) > 0) {
                $outp = ['text' => 'Produsul '.$obj->productName.' adaugat'];
            }
            else {
                $outp = ['text' => 'A aparut o eroare la adaugarea produsului '.$obj->productName];
            }
            mysqli_stmt_close($stmt);
            mysqli_close($mysqli);

            echo json_encode($outp);
    
	}

if ($obj->whatRun == 'saveProductChanges')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"UPDATE produse SET codprodus = ?, denumire = ?, cod_referinta = ?,
                                           tip_produs = ?, pret_achizitie = ?, adaos = ?, pret_vanzare = ? 
                                           WHERE idprodus = ?");
    $bind = mysqli_stmt_bind_param($stmt, "ssiidddi", $obj->productCode,$obj->productName, $obj->ref, $obj->productType, $obj->purchasePrice, $obj->addedValue, $obj->sellingPrice, $obj->productId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $outp = ['text' => 'Datele pentru '.$obj->productName.' au fost schimbate.'];
    echo json_encode($outp);

}

if ($obj->whatRun == 'deleteProduct')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"DELETE FROM produse WHERE idprodus = ?");
    $bind = mysqli_stmt_bind_param($stmt, "i", $obj->productCode);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $outp = ['text' => 'Produsul a fost sters'];
    echo json_encode($outp);
}

if ($obj->whatRun == 'getClientsByType')
	{
            if ($obj->clientType == 0)
            {
                $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
                $stmt = $conn->prepare("SELECT idclient AS clientId, nume_prenume AS clientNames FROM clienti_fizici WHERE idclient > ?");
                $stmt->bind_param("s", $obj->limit);
                $stmt->execute();
                $result = $stmt->get_result();
                $outp = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode($outp);
            }
            if ($obj->clientType == 1)
            {
                $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
                $stmt = $conn->prepare("SELECT idclient AS clientId, denumire AS clientNames FROM clienti_juridic WHERE idclient > ?");
                $stmt->bind_param("s", $obj->limit);
                $stmt->execute();
                $result = $stmt->get_result();
                $outp = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode($outp);
            }
	}
if ($obj->whatRun == 'showAllSasiu')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT sasiuri.idsasiu AS sasiuId, sasiuri.numar_sasiu AS sasiuNumber, sasiuri.model AS sasiuModel,
        sasiuri.data_fabricatie AS sasiuYear, sasiuri.cod_motor AS sasiuEngine, sasiuri.cod_transmisie AS sasiuTransmission, sasiuri.tip_vanzare AS sellingType,
        referinte.cod_referinta AS referenceCodeSasiu
        FROM sasiuri
        INNER JOIN referinte ON sasiuri.cod_referinta = referinte.idreferinta WHERE idsasiu > ?");
    $stmt->bind_param("s", $obj->limit);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
}

if ($obj->whatRun == 'getSasiuForEdit')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT tipclient AS tipClient, numar_sasiu AS sasiuNumber, model AS sasiuModel,
        data_fabricatie AS sasiuYear, cod_motor AS sasiuEngine, cod_transmisie AS sasiuTransmission, tip_vanzare AS sellingType,
        cod_referinta AS referenceCodeSasiu, model_an AS yearModel, axel_drivce AS axelDrive,
        echipament AS equipment, culoare_plafon AS roofColor, culoare_exterior AS externalColor, culoare_covor AS carpetColor,
        combinatie_locuri AS placesCombination, numar_comenzi_z AS zOrders, idclient AS clientId FROM sasiuri WHERE idsasiu = ?");
    $stmt->bind_param("i", $obj->sasiuId);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
}

if ($obj->whatRun == 'addNewSasiu')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"INSERT INTO sasiuri (idclient, tipclient, numar_sasiu, model, data_fabricatie, model_an, tip_vanzare,".
            "cod_motor, cod_transmisie, axel_drivce, echipament, culoare_plafon, culoare_exterior, culoare_covor, ".
            "combinatie_locuri, numar_comenzi_z, cod_referinta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $bind = mysqli_stmt_bind_param($stmt, "iissssssssssssssi", $obj->clientCode, $obj->clientType, $obj->sasiu, $obj->model, $obj->madeDate,
            $obj->yearModel, $obj->sellType, $obj->engineCode, $obj->transmissionCode, $obj->axelDrive, $obj->equipment,
            $obj->colorPlafon, $obj->colorExt, $obj->colorCarpet, $obj->placesCombination, $obj->zOrders, $obj->referenceCode);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $outp = ['text' => 'Sasiul '.$obj->sasiu.'  a fost adaugat'];
    echo json_encode($outp);
}

if ($obj->whatRun == 'saveSasiuChanges')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"UPDATE sasiuri SET idclient =?, tipclient=?, numar_sasiu=?, model=?, data_fabricatie=?, model_an=?, tip_vanzare=?,".
        "cod_motor=?, cod_transmisie=?, axel_drivce=?, echipament=?, culoare_plafon=?, culoare_exterior=?, culoare_covor=?, ".
        "combinatie_locuri=?, numar_comenzi_z=?, cod_referinta=? WHERE idsasiu = ?");
    $bind = mysqli_stmt_bind_param($stmt, "iissssssssssssssii", $obj->clientCode, $obj->clientType, $obj->sasiu, $obj->model, $obj->madeDate,
        $obj->yearModel, $obj->sellType, $obj->engineCode, $obj->transmissionCode, $obj->axelDrive, $obj->equipment,
        $obj->colorPlafon, $obj->colorExt, $obj->colorCarpet, $obj->placesCombination, $obj->zOrders, $obj->referenceCode, $obj->sasiuId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $outp = ['text' => 'Sasiul '.$obj->sasiu.'  a fost editat'];
    echo json_encode($outp);
}

if ($obj->whatRun == 'deleteSasiu')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"DELETE FROM sasiuri WHERE idsasiu = ?");
    $bind = mysqli_stmt_bind_param($stmt, "i", $obj->clientCode);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $outp = ['text' => 'Sasiul  a fost sters'];
    echo json_encode($outp);
}

if ($obj->whatRun == 'getSuppliers')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT idfurnizor AS supplierId, denumire AS supplierName FROM furnizori WHERE idfurnizor > ?");
    $stmt->bind_param("i", $obj->limit);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);

    echo json_encode($outp);

}

if ($obj->whatRun == 16)
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT idfactura AS invoiceId, cod_factura AS invoiceCode FROM facturi WHERE idfactura > ? ORDER BY idfactura DESC");
    $stmt->bind_param("s", $obj->limit);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
}

if ($obj->whatRun == 17) 
	{
            $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
            $stmt = $conn->prepare("SELECT idprodus AS productId, codprodus AS productCode, denumire AS productName FROM produse WHERE idprodus > ?");
            $stmt->bind_param("s", $obj->limit);
            $stmt->execute();
            $result = $stmt->get_result();
            $outp = $result->fetch_all(MYSQLI_ASSOC);

            echo json_encode($outp);
    
	}
        
if ($obj->whatRun == 18)
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT vanzari.idvanzare AS vanzareId, vanzari.cod_factura AS invoice, ".
            "vanzari.cantitate AS quantity, vanzari.total AS total, produse.denumire AS product ".
            "FROM vanzari ".
            "INNER JOIN produse ON produse.idprodus = vanzari.idprodus WHERE vanzari.idvanzare > ?");
    $stmt->bind_param("s", $obj->limit);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
}


if ($obj->whatRun == 'getAllInvoices')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT facturi.idfactura AS invoiceId, facturi.serie AS invoiceSerial, facturi.numar AS invoiceNumber,".
            "facturi.total AS totalAmount, facturi.suma_achitata AS paidAmount, facturi.data_vanzare AS invoiceDate,".
            "facturi.is_juridic AS clientType, facturi.termen_plata AS invoiceDeadline FROM facturi WHERE facturi.idfactura > ?");
    $stmt->bind_param("s", $obj->limit);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
}

if ($obj->whatRun == 'getInvoiceDetails')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT facturi.idfactura AS invoiceId, facturi.serie AS invoiceSerial, facturi.numar AS invoiceNumber,".
            "facturi.total AS totalAmount, facturi.suma_achitata AS paidAmount, facturi.data_vanzare AS invoiceDate,".
            "facturi.is_juridic AS clientType, facturi.termen_plata AS invoiceDeadline FROM facturi WHERE facturi.idfactura = ?");
    $stmt->bind_param("s", $obj->invoiceId);
    $stmt->execute();
    $result = $stmt->get_result();
    $invoice = $result->fetch_all(MYSQLI_ASSOC);

    $sql = "SELECT p.denumire as name, fp.pret as price,fp.cantitate as quantity,fp.tva as vat, fp.suma_totala as total FROM facturi_produse as fp INNER JOIN produse as p ON fp.id_produs=p.idprodus WHERE fp.id_factura = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $obj->invoiceId);
    $stmt->execute();
    $result = $stmt->get_result();
    $products = $result->fetch_all(MYSQLI_ASSOC);

    $outp = array('invoice'=>$invoice,'products'=>$products);
    echo json_encode($outp);
}

if ($obj->whatRun == 'getAllReceivedInvoices')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT facturi_intrate.id AS invoiceId, facturi_intrate.serie AS invoiceSerial,".
        "facturi_intrate.numar AS invoiceNumber, facturi_intrate.total AS totalAmount, facturi_intrate.suma_achitata AS paidAmount,".
        "facturi_intrate.online_cod_awb AS awbCode, facturi_intrate.data_emisa AS invoiceDate, facturi_intrate.termen_plata AS deadline, 
         furnizori.denumire AS clientName
         FROM facturi_intrate 
         INNER JOIN furnizori ON facturi_intrate.id_client = furnizori.idfurnizor WHERE facturi_intrate.id > ?");
    $stmt->bind_param("i", $obj->limit);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
}

if ($obj->whatRun == 21)
    {
            $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
		if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
		$stmt = mysqli_prepare($mysqli,"DELETE FROM utilizator WHERE iduser = ?");
		$bind = mysqli_stmt_bind_param($stmt, "i", $obj->userType);
		mysqli_stmt_execute($stmt);
		mysqli_stmt_close($stmt);
		mysqli_close($mysqli);
                
                $limit = 0;
                $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
                $stmt1 = $conn->prepare("SELECT nume_prenume AS userFullName, iduser AS userId, is_admin AS userType FROM utilizator WHERE iduser > ?");
                $stmt1->bind_param("i", $limit);
                $stmt1->execute();
                $result = $stmt1->get_result();
                $outp = $result->fetch_all(MYSQLI_ASSOC);

		echo json_encode($outp);
	}


if ($obj->whatRun == 'addNewReceivedInvoice')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"INSERT INTO facturi_intrate (serie, numar, id_client, total, suma_achitata, online_cod_awb,
                                           data_emisa, termen_plata) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
    $bind = mysqli_stmt_bind_param($stmt, "ssiddssi", $obj->receivedInvoiceSerial, $obj->receivedInvoiceNumber,
        $obj->receivedInvoiceSupplier, $obj->receivedInvoiceTotalAmount, $obj->receivedInvoicePaidAmount, $obj->receivedInvoiceAwbCode,
        $obj->receivedInvoiceDate, $obj->receivedInvoiceDeadline);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt1 = $conn->prepare("SELECT id AS invoiceId, serie AS invoiceSerial, numar AS invoiceNumber FROM facturi_intrate WHERE serie = ? AND numar = ? AND id_client = ?");
    $stmt1->bind_param("sii", $obj->receivedInvoiceSerial, $obj->receivedInvoiceNumber, $obj->receivedInvoiceSupplier);
    $stmt1->execute();
    $result = $stmt1->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
}

if ($obj->whatRun == 'getProductsWithPrice')
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt1 = $conn->prepare("SELECT idprodus AS productId, pret_achizitie AS productPrice, denumire AS productName FROM produse WHERE idprodus > ?");
    $stmt1->bind_param("i", $obj->limit);
    $stmt1->execute();
    $result = $stmt1->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
}

if ($obj->whatRun == 'addProductToReceivedInvoice')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"INSERT INTO facturi_intrate_produse (id_factura, id_produs, pret, cantitate, tva, suma_totala) VALUES (?, ?, ?, ?, ?, ?)");
    $bind = mysqli_stmt_bind_param($stmt, "iidiid", $obj->receivedInvoiceId, $obj->productIdAndPrice,
        $obj->productPrice, $obj->productQuantity, $obj->productVAT, $obj->productTotalAmount);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    $stmt1 = mysqli_prepare($mysqli,"UPDATE produse SET stoc = stoc + ? WHERE idprodus = ?");
    $bind1 = mysqli_stmt_bind_param($stmt1, "ii", $obj->productQuantity, $obj->productIdAndPrice);
    mysqli_stmt_execute($stmt1);
    mysqli_stmt_close($stmt1);
    mysqli_close($mysqli);

    $outp = ['text' => 'Produsul a fost adaugat la factura'];
    echo json_encode($outp);
}

if ($obj->whatRun == 'deleteReceivedInvoice')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"DELETE FROM facturi_intrate WHERE id = ?");
    $bind = mysqli_stmt_bind_param($stmt, "i", $obj->invoiceId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $outp = ['text' => 'Factura a fost stearsa!'];
    echo json_encode($outp);
}

if ($obj->whatRun == 'addNewInvoice')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"INSERT INTO facturi (serie, numar, idclient, is_juridic, total, suma_achitata, data_vanzare, online_cod_awb, termen_plata) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?)");
    $bind = mysqli_stmt_bind_param($stmt, "siiiddsi", $obj->invoiceSerial, $obj->invoiceNumber, $obj->clientCode, $obj->clientType, $obj->totalAmount, $obj->amountPaid, $obj->onlinecodawb, $obj->deadline);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt1 = $conn->prepare("SELECT idfactura AS invoiceId, serie AS invoiceSerial, numar AS invoiceNumber FROM facturi WHERE serie = ? AND numar = ? AND idclient = ?");
    $stmt1->bind_param("sii", $obj->invoiceSerial, $obj->invoiceNumber, $obj->clientCode);
    $stmt1->execute();
    $result = $stmt1->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
}

if ($obj->whatRun == 'addNewInvoiceNew')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"INSERT INTO facturi (serie, numar, idclient, is_juridic, total, suma_achitata, data_vanzare, online_cod_awb, termen_plata) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?, ?)");
    $bind = mysqli_stmt_bind_param($stmt, "siiiddsi", $obj->invoiceSerial, $obj->invoiceNumber, $obj->clientCode, $obj->clientType, $obj->totalAmount, $obj->amountPaid, $obj->onlinecodawb, $obj->deadline);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    

    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt1 = $conn->prepare("SELECT idfactura AS invoiceId, serie AS invoiceSerial, numar AS invoiceNumber FROM facturi WHERE serie = ? AND numar = ? AND idclient = ?");
    $stmt1->bind_param("sii", $obj->invoiceSerial, $obj->invoiceNumber, $obj->clientCode);
    $stmt1->execute();
    $result = $stmt1->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    $invoiceId = $outp[0]["invoiceId"];
   
    foreach($obj->products as $prd) {
        $stmt1 = mysqli_prepare($mysqli,"INSERT INTO facturi_produse (id_factura, id_produs, pret, cantitate, tva, suma_totala) VALUES (?, ?, ?, ?, ?, ?)");
        $bind1 = mysqli_stmt_bind_param($stmt1, "iidiid", $invoiceId, $prd->id,
            $prd->price, $prd->quantity, $prd->vat, $prd->total);
        mysqli_stmt_execute($stmt1);
        mysqli_stmt_close($stmt1);

        $stmt1 = mysqli_prepare($mysqli,"UPDATE produse SET stoc = stoc - ? WHERE idprodus = ?");
        $bind1 = mysqli_stmt_bind_param($stmt1, "ii", $prd->quantity, $prd->id);
        mysqli_stmt_execute($stmt1);
        mysqli_stmt_close($stmt1);
    }
    mysqli_close($mysqli);
   
}


if ($obj->whatRun == 'deleteInvoice')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"DELETE FROM facturi WHERE idfactura = ?");
    $bind = mysqli_stmt_bind_param($stmt, "i", $obj->invoiceId);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);

    $outp = ['text' => 'Factura a fost stearsa!'];
    echo json_encode($outp);
}

if ($obj->whatRun == 'addProductToOwnInvoice')
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"INSERT INTO facturi_produse (id_factura, id_produs, pret, cantitate, tva, suma_totala) VALUES (?, ?, ?, ?, ?, ?)");
    $bind = mysqli_stmt_bind_param($stmt, "iidiid", $obj->invoiceId, $obj->productIdAndPrice,
        $obj->productPrice, $obj->productQuantity, $obj->productVAT, $obj->productTotalAmount);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    $stmt1 = mysqli_prepare($mysqli,"UPDATE produse SET stoc = stoc - ? WHERE idprodus = ?");
    $bind1 = mysqli_stmt_bind_param($stmt1, "ii", $obj->productQuantity, $obj->productIdAndPrice);
    mysqli_stmt_execute($stmt1);
    mysqli_stmt_close($stmt1);
    mysqli_close($mysqli);

    $outp = ['text' => 'Produsul a fost adaugat la factura'];
    echo json_encode($outp);
}

###############################################################################################################################


if ($obj->whatRun == 23)
{
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt = $conn->prepare("SELECT retururi.idretur AS returnId, retururi.valoare AS totalAmount, retururi.suma_achitata AS paidAmount,".
            "retururi.data_retur AS returnDate, furnizori.denumire AS providerName, produse.denumire AS productName, produse.codprodus AS productCode".
            "FROM retururi ".
            "INNER JOIN furnizori ON furnizori.idfurnizor = retururi.idfurnizor ".
            "INNER JOIN produse ON produse.idprodus = retururi.idprodus WHERE retururi.idretur > ?");
    $stmt->bind_param("s", $obj->limit);
    $stmt->execute();
    $result = $stmt->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
}

if ($obj->whatRun == 25)
{
    $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
    if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
    $stmt = mysqli_prepare($mysqli,"INSERT INTO retururi (idfurnizor, idprodus, valoare, suma_achitata, data_retur) VALUES (?, ?, ?, ?, NOW())");
    $bind = mysqli_stmt_bind_param($stmt, "iidd", $obj->providerId, $obj->returnProduct, $obj->returnAmount, $obj->returnPaid);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
    mysqli_close($mysqli);
    
    $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
    $stmt1 = $conn->prepare("SELECT retururi.idretur AS returnId, retururi.valoare AS totalAmount, retururi.suma_achitata AS paidAmount,".
            "retururi.data_retur AS returnDate, furnizori.denumire AS providerName, produse.denumire AS productName, produse.codprodus AS productCode".
            "FROM retururi ".
            "INNER JOIN furnizori ON furnizori.idfurnizor = retururi.idfurnizor ".
            "INNER JOIN produse ON produse.idprodus = retururi.idprodus WHERE retururi.idretur > ?");
    $stmt1->bind_param("s", $obj->limit);
    $stmt1->execute();
    $result = $stmt1->get_result();
    $outp = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($outp);
}
if ($obj->whatRun == 26) 
    { 
        $mysqli = mysqli_connect("localhost", $userDB, $userPasswordDB, $dbname);
	if (mysqli_connect_errno()) { printf("Connect failed: %s\n", mysqli_connect_error()); }
	$stmt = mysqli_prepare($mysqli,"DELETE FROM furnizori WHERE idfurnizor = ?");
	$bind = mysqli_stmt_bind_param($stmt, "i", $obj->providerId);
	mysqli_stmt_execute($stmt);
	mysqli_stmt_close($stmt);
	mysqli_close($mysqli);
        
        $conn = new mysqli("localhost", $userDB, $userPasswordDB, $dbname);
        $stmt1 = $conn->prepare("SELECT idfurnizor AS providerId, denumire AS providerName, cui AS providerCui, telefon AS providerPhone, email AS providerEmail, reprezentant AS providerContact FROM furnizori WHERE idfurnizor > ?");
        $stmt1->bind_param("s", $obj->limit);
        $stmt1->execute();
        $result = $stmt1->get_result();
        $outp = $result->fetch_all(MYSQLI_ASSOC);

        echo json_encode($outp);
    }

?>