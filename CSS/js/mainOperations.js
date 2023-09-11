/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    $("#addProductPopup").on('shown.bs.modal', function (e) {
        onShowSelectProductForInvoice();
    });
    $("#selectProductForOwnInvoice").on('change',function(){
        if(this.value=='-1')
            return;
        document.getElementById("ownInvoiceProductPrice").value = window.productsList[this.value].productPrice;
    });
});

let referenceCodeList = "";
let usersGeneralForm = "<div class=\"col-sm-6 col-md-6\"> <h2>Adaugati utilizator</h2>"+
    "<form class=\"form-horizontal\"><div class=\"form-group\"><div class=\"col-md-12\">"+
    "<select class=\"form-control\" id=\"tipUser\" name=\"tipUser\">"+
	"<option value='1'> Administrator</option><option value='0'>User normal</option></select></div></div>"+
	"<div class=\"form-group\"><div class=\"col-md-12\">"+
        "<input type=\"text\" class=\"form-control\" id=\"nameSurname\" name=\"nume\" placeholder=\"Nume si prenume\" />"+
            "</div></div><div class=\"form-group\"><div class=\"col-md-12\">"+
        "<input type=\"text\" class=\"form-control\" id=\"phone\" name=\"telefon\" placeholder=\"Telefon\" />"+
            "</div></div><div class=\"form-group\"><div class=\"col-md-12\">"+
        "<input type=\"text\" class=\"form-control\" id=\"email\" name=\"email\" placeholder=\"Email\" />"+
            "</div></div><div class=\"form-group\"><div class=\"col-md-12\">"+
        "<input type=\"text\" class=\"form-control\" id=\"username\" name=\"username\" placeholder=\"Username\" />"+
            "</div></div><div class=\"form-group\"><div class=\"col-md-12\">"+
        "<input type=\"password\" class=\"form-control\" id=\"password\" name=\"parola\" placeholder=\"Parola\" />"+
            "</div></div><div class=\"form-group\"><div class=\"col-md-12\">"+
        "<button class=\"btn btn-warning pull-right\" onclick=\"addUsers(); return false;\">Adaugati</button>"+
                    "</div></div></form></div>";
let providersGeneralForm = "<div class=\"col-sm-12 col-md-12\"> <h2>Adaugati furnizori</h2>"+
    "<form class=\"form-horizontal\">"+
	"<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerName\" name=\"nume\" placeholder=\"Denumire\" /></div>"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerAddress\" name=\"telefon\" placeholder=\"Adresa\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerCui\" name=\"email\" placeholder=\"CUI\" /></div>"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerReg\" name=\"username\" placeholder=\"Nr. Registru\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerPhone\" name=\"parola\" placeholder=\"Telefon\" /></div>"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerEmail\" name=\"username\" placeholder=\"Email\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerContact\" name=\"username\" placeholder=\"Nume reprezentant\" /></div>"+
            "<div class=\"col-md-6\"><button class=\"btn btn-warning pull-right\" onclick=\"addProviders(); return false;\">Adaugati</button></div>"+
        "</div>"+
     "</form></div>";
let clientsGeneralForm = "<div class=\"col-sm-12 col-md-12\"> <h2>Adaugati clienti - persoane fizice</h2>"+
    "<form class=\"form-horizontal\">"+
	"<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"clientName\" name=\"nume\" placeholder=\"Nume si prenume\" /></div>"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"clientAddress\" name=\"telefon\" placeholder=\"Adresa\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"clientPhone\" name=\"parola\" placeholder=\"Telefon\" /></div>"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"clientEmail\" name=\"username\" placeholder=\"Email\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><button class=\"btn btn-warning pull-right\" onclick=\"addClients(); return false;\">Adaugati</button></div>"+
        "</div>"+
     "</form></div>";
let companyGeneralForm = "<div class=\"col-sm-12 col-md-12\"> <h2>Adaugati persoane juridice</h2>"+
    "<form class=\"form-horizontal\">"+
	"<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyName\" name=\"nume\" placeholder=\"Denumire\" /></div>"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyAddress\" name=\"telefon\" placeholder=\"Adresa\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyCui\" name=\"email\" placeholder=\"CUI\" /></div>"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyReg\" name=\"username\" placeholder=\"Nr. Registru\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyPhone\" name=\"parola\" placeholder=\"Telefon\" /></div>"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyEmail\" name=\"username\" placeholder=\"Email\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyContact\" name=\"username\" placeholder=\"Nume reprezentant\" /></div>"+
            "<div class=\"col-md-6\"><button class=\"btn btn-warning pull-right\" onclick=\"addCompany(); return false;\">Adaugati</button></div>"+
        "</div>"+
     "</form></div>";
let referenceGeneralForm = "<div class=\"col-sm-6 col-md-6\"> <h2>Adaugati coduri de referinta</h2>"+
    "<form class=\"form-horizontal\">"+
        "<div class=\"form-group\">"+
            "<div class=\"col-md-12\" style='margin-bottom: 15px;'><input type=\"text\" class=\"form-control\" id=\"referenceCode\" name=\"referenceCode\" placeholder=\"Cod de referinta\" /></div>"+
            "<div class=\"col-md-12\" style='margin-bottom: 15px;'><input type=\"text\" class=\"form-control\" id=\"referenceDetail\" name=\"referenceDetail\" placeholder=\"Detalii ...\" /></div>"+
            "<div class=\"col-md-12\"><button class=\"btn btn-warning pull-right\" onclick=\"addReferenceCode(); return false;\">Adaugati</button></div>"+
        "</div>"+
     "</form></div>";

let receivedInvoicesFormContent = "<h2>Adaugati factura primita</h2>" +
    "<form class=\"form-horizontal\">" +
    "<div class=\"form-group\">" +
    "<div class=\"col-md-6\">" +
    "<input type=\"text\" class=\"form-control\" id=\"receivedInvoiceSerial\" name=\"receivedInvoiceSerial\" placeholder=\"Serie factura\" />" +
    "</div>" +
    "<div class=\"col-md-6\">" +
    "<input type=\"text\" class=\"form-control\" id=\"receivedInvoiceNumber\" name=\"receivedInvoiceNumber\" placeholder=\"Numar factura\" />" +
    "</div>" +
    "</div>" +
    "<div class=\"form-group\">" +
    "<div class=\"col-md-6\" id=\"clientsDivForReceivedInvoice\">" +

    "</div>" +
    "<div class=\"col-md-6\">" +
    "<input type=\"number\" class=\"form-control\" id=\"receivedInvoiceTotalAmount\" name=\"receivedInvoiceTotalAmount\" placeholder=\"Suma totala\" />" +
    "</div>" +
    "</div>" +
    "<div class=\"form-group\">" +
    "<div class=\"col-md-6\">" +
    "<input type=\"number\" class=\"form-control\" id=\"receivedInvoicePaidAmount\" name=\"receivedInvoicePaidAmount\" placeholder=\"Suma achitata\" />" +
    "</div>" +
    "<div class=\"col-md-6\">" +
    "<input type=\"text\" class=\"form-control\" id=\"receivedInvoiceAwbCode\" name=\"receivedInvoiceAwbCode\" placeholder=\"Cod AWB\" />" +
    "</div>" +
    "</div>" +
    "<div class=\"form-group\">" +
    "<div class=\"col-md-6\">" +
    "<input type=\"number\" class=\"form-control\" id=\"receivedInvoiceDeadline\" name=\"receivedInvoiceDeadline\" min=\"1\" max=\"60\" placeholder=\"Termen de plata - nr. zile\" />" +
    "</div>" +
    "<div class=\"col-md-3\">" +
    "<input type=\"date\" class=\"form-control\" id=\"receivedInvoiceDate\" name=\"receivedInvoiceDate\" placeholder=\"Data emiterii\" />" +
    "</div>" +
    "<div class=\"col-md-3\">" +
    "<button class=\"btn btn-warning pull-right\" onclick=\"addReceivedInvoice(); return false;\">Adaugati</button>" +
    "</div>" +
    "</div>" +
    "</form>";

function showUsers() {
    let textForDiv = "";
    textForDiv += usersGeneralForm;
    let tipUser = "";
    let obj = { whatRun:'showUsers', "limit":0 };
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var myObj = JSON.parse(this.responseText);
        textForDiv += "<div class=\"col-sm-6 col-md-6\" style='max-height: 700px; overflow: scroll;'><h2>Utilizatori activi</h2>"+
	    "<table class=\"table\"><thead><tr><th>Nume si prenume</th><th>Tip user</th><th>Telefon</th><th>Email</th><th>Username</th><th>Editare</th><th>Stergere</th>"+
	    "</tr></thead><tbody>";
	for (var x in myObj) 
		{   
                    if (myObj[x].userType === 1) tipUser = "Admin";
                    else tipUser = "Angajat";
                    textForDiv += "<tr><td>"+myObj[x].userFullName+"</td><td>"+tipUser+"</td>"+"<td>"+myObj[x].phone+"</td>"+"<td>"+myObj[x].email+"</td>"+"<td>"+myObj[x].userName+"</td>"+
			"<td><button class=\"btn btn-warning\" onclick=\"seeDetails("+myObj[x].userId+")\" style=\"color:white;\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-pencil-fill\" viewBox=\"0 0 16 16\">\n" +
                        "  <path d=\"M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z\"/>\n" +
                        "</svg></button></td>"+
			"<td><button class=\"btn btn-danger\" onclick=\"deleteUser("+myObj[x].userId+")\" style=\"color:white;\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash-fill\" viewBox=\"0 0 16 16\">\n" +
                        "  <path d=\"M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z\"/>\n" +
                        "</svg></button></td>"+
		    "</tr>";
		}
           textForDiv += "</tbody></table></div>";
        document.getElementById("workingArea").innerHTML = textForDiv; 
        document.getElementById("workingAreaSecond").innerHTML = "";
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
 }
 function addUsers() //run 1
 {
     var userType = document.getElementById("tipUser").value;
     var userName = document.getElementById("username").value;
     var nameUser = document.getElementById("nameSurname").value;
     var phone = document.getElementById("phone").value;
     var email = document.getElementById("email").value;
     var password = document.getElementById("password").value;
     var textForDiv = "";
     var tipUser = "";
     textForDiv += usersGeneralForm;
     var obj = { whatRun: 'addUser', userType: userType, userName: userName, nameUser: nameUser, phone: phone, email: email, password: password, limit:0};
     var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var myObj = JSON.parse(this.responseText);

	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
  showUsers();
 }
function seeDetails(userId) //run 1
{
    var textForDiv = "";
    var obj = { whatRun: 'showEditUser', editId: userId, limit:0};
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var myObj = JSON.parse(this.responseText);
            for (var x in myObj)
            {
                textForDiv += "<div class=\"col-sm-6 col-md-6\"> <h2>Editati date utilizator</h2>"+
                    "<form class=\"form-horizontal\"><div class=\"form-group\"><div class=\"col-md-12\">"+
                    "<select class=\"form-control\" id=\"tipUserEdit\" name=\"tipUserEdit\">";
                if (myObj[x].userType === 1)
                {
                    textForDiv +="<option value='1' selected> Administrator</option>" +
                                 "<option value='0'>User normal</option>";
                }
                else {
                    textForDiv +="<option value='1'> Administrator</option>" +
                        "<option value='0' selected>User normal</option>";
                }
                textForDiv +="</select></div></div>"+
                    "<div class=\"form-group\"><div class=\"col-md-12\">"+
                    "<input type=\"text\" class=\"form-control\" id=\"nameSurnameEdit\" name=\"numeEdit\" value=\""+myObj[x].userFullName+"\" />"+
                    "</div></div><div class=\"form-group\"><div class=\"col-md-12\">"+
                    "<input type=\"text\" class=\"form-control\" id=\"phoneEdit\" name=\"telefonEdit\" value=\""+myObj[x].phone+"\" />"+
                    "</div></div><div class=\"form-group\"><div class=\"col-md-12\">"+
                    "<input type=\"text\" class=\"form-control\" id=\"emailEdit\" name=\"emailEdit\" value=\""+myObj[x].email+"\" />"+
                    "</div></div><div class=\"form-group\"><div class=\"col-md-12\">"+
                    "<input type=\"text\" class=\"form-control\" id=\"usernameEdit\" name=\"usernameEdit\" value=\""+myObj[x].userName+"\" />"+
                    "</div></div><div class=\"form-group\"><div class=\"col-md-12\">"+
                    "<button class=\"btn btn-warning pull-right\" onclick=\"editUserDetails("+userId+"); return false;\">Salvati noile date</button>"+
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class=\"btn btn-primary pull-left\" onclick=\"showUsers(); return false;\">Anulati editarea</button>"+
                    "</div></div></form></div>";
            }
            textForDiv += "<div class=\"col-sm-6 col-md-6\"> <h2>Resetati parola</h2>"+
                "<form class=\"form-horizontal\"><div class=\"form-group\"><div class=\"col-md-6\">"+
                "<input type=\"password\" class=\"form-control\" id=\"passwordEdit\" name=\"passwordEdit\" value=\"\" />"+
            "</div></div><div class=\"form-group\"><div class=\"col-md-6\">"+
            "<button class=\"btn btn-warning pull-right\" onclick=\"resetUserPassword("+userId+"); return false;\">Salvati noua parola</button>"+
            "</div></div></form></div>";
            document.getElementById("workingAreaSecond").innerHTML = textForDiv;
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}
function editUserDetails(userId) //run 1
{
    let userType = document.getElementById("tipUserEdit").value;
    let nameSurnameEdit = document.getElementById("nameSurnameEdit").value;
    let phoneEdit = document.getElementById("phoneEdit").value;
    let emailEdit = document.getElementById("emailEdit").value;
    let usernameEdit = document.getElementById("usernameEdit").value;
    var obj = { whatRun: 'editUserDetails', userIdEdit: userId, userType: userType, userName: usernameEdit, nameUser: nameSurnameEdit, phone: phoneEdit, email: emailEdit, limit:0};
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
    showUsers();
}
function resetUserPassword(userId) //run 1
{
    let newPassword = document.getElementById("passwordEdit").value;
    let obj = { whatRun: 'resetUserPassword', userIdEdit: userId, password: newPassword, limit:0};
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            alert(myObj.text);
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
    showUsers();
}
 function showProviders()//run 2
 {
   var textForDiv = "";
   textForDiv += providersGeneralForm;
    var obj = { whatRun:'showProviders', "limit":0 };
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var myObj = JSON.parse(this.responseText);
        textForDiv += "<div class=\"col-sm-12 col-md-12\" style='max-height: 700px; overflow: scroll;'><h2>Lista furnizori</h2>"+
	    "<table class=\"table\"><thead><tr><th>Denumire</th><th>CUI</th><th>Telefon</th><th>Email</th><th>Contact</th><th>Editare</th><th>Stergere</th>"+
	    "</tr></thead><tbody>";
	for (var x in myObj) 
		{   
                    textForDiv += "<tr><td>"+myObj[x].providerName+"</td><td>"+myObj[x].providerCui+"</td><td>"+myObj[x].providerPhone+"</td><td>"+myObj[x].providerEmail+"</td><td>"+myObj[x].providerContact+"</td>"+
			"<td><button class=\"button-small\" onclick=\"seeProvider("+myObj[x].providerId+")\" style=\"color:white; background-color: #EB9316;\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button></td>"+
			"<td><button class=\"button-small\" onclick=\"deleteProvider("+myObj[x].providerId+")\" style=\"color:white; background-color: red;\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button></td>"+
		    "</tr>";
		}
           textForDiv += "</tbody></table></div>";
        document.getElementById("workingArea").innerHTML = textForDiv; 
        document.getElementById("workingAreaSecond").innerHTML = "";
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);  
 }
function addProviders() //run 3
 {
     var provName = document.getElementById("providerName").value;
     var provAddress = document.getElementById("providerAddress").value;
     var provCui = document.getElementById("providerCui").value;
     var provReg = document.getElementById("providerReg").value;
     var provPhone = document.getElementById("providerPhone").value;
     var provEmail = document.getElementById("providerEmail").value;
     var provContact = document.getElementById("providerContact").value;
     var obj = { whatRun: 'addProvider', providerName: provName, providerAddress: provAddress, providerCui: provCui, providerReg: provReg, providerPhone: provPhone, providerEmail: provEmail, providerContact: provContact, limit:0};
     var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState === 4 && this.status === 200) {
             let myObj = JSON.parse(this.responseText);
             alert(myObj.text);
         }
     };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
  showProviders();
 }

function seeProvider(providerId)
{
    let textForDiv = "";
    let obj = { whatRun: 'providerForEdit', providerId: providerId, limit:0};
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var myObj = JSON.parse(this.responseText);
            for (var x in myObj)
            {
                textForDiv += "<div class=\"col-sm-12 col-md-12\"> <h2>Editati furnizor</h2>"+
                    "<form class=\"form-horizontal\">"+
                    "<div class=\"form-group\">"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerNameEdit\" name=\"numeEdit\" value=\""+myObj[x].providerName+"\" /></div>"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerAddressEdit\" name=\"telefonEdit\" value=\""+myObj[x].providerAddress+"\" /></div>"+
                    "</div>"+
                    "<div class=\"form-group\">"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerCuiEdit\" name=\"emailEdit\" value=\""+myObj[x].providerCui+"\" /></div>"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerRegEdit\" name=\"usernameEdit\" value=\""+myObj[x].providerRegistry+"\" /></div>"+
                    "</div>"+
                    "<div class=\"form-group\">"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerPhoneEdit\" name=\"parolaEdit\" value=\""+myObj[x].providerPhone+"\" /></div>"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerEmailEdit\" name=\"usernameEdit\" value=\""+myObj[x].providerEmail+"\" /></div>"+
                    "</div>"+
                    "<div class=\"form-group\">"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"providerContactEdit\" name=\"username\" value=\""+myObj[x].providerContact+"\" /></div>"+
                    "<div class=\"col-md-6\"><button class=\"btn btn-warning pull-right\" onclick=\"saveProviderChanges("+providerId+"); return false;\">Salvati modificarile</button>"+
                    "<button class=\"btn btn-primary pull-left\" onclick=\"showProviders(); return false;\">Anulati editarea</button></div>"+
                    "</div>"+
                    "</form></div>";
            }
            document.getElementById("workingAreaSecond").innerHTML = textForDiv;
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function saveProviderChanges(provId) //run 3
{
    let provName = document.getElementById("providerNameEdit").value;
    let provAddress = document.getElementById("providerAddressEdit").value;
    let provCui = document.getElementById("providerCuiEdit").value;
    let provReg = document.getElementById("providerRegEdit").value;
    let provPhone = document.getElementById("providerPhoneEdit").value;
    let provEmail = document.getElementById("providerEmailEdit").value;
    let provContact = document.getElementById("providerContactEdit").value;
    let obj = { whatRun: 'saveProviderChanges', providerId: provId, providerName: provName, providerAddress: provAddress, providerCui: provCui, providerReg: provReg, providerPhone: provPhone, providerEmail: provEmail, providerContact: provContact, limit:0};
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            alert(myObj.text);
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
    showProviders();
}

 function showClients()
 {
   let textForDiv = "";
   textForDiv += clientsGeneralForm;
    var obj = { whatRun:'showClients', "limit":0 };
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var myObj = JSON.parse(this.responseText);
        textForDiv += "<div class=\"col-sm-12 col-md-12\" style='max-height: 700px; overflow: scroll;'><h2>Lista clienti persoane fizice</h2>"+
	    "<table class=\"table\"><thead><tr><th>Nume si prenume</th><th>Adresa</th><th>Telefon</th><th>Email</th><th>Editare</th><th>Stergere</th>"+
	    "</tr></thead><tbody>";
	for (let x in myObj)
		{   
                    textForDiv += "<tr><td>"+myObj[x].clientName+"</td><td>"+myObj[x].clientAddress+"</td><td>"+myObj[x].clientPhone+"</td><td>"+myObj[x].clientEmail+"</td>"+
			"<td><button class=\"button-small\" onclick=\"seeClient("+myObj[x].clientId+")\" style=\"color:white; background-color: #EB9316;\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button></td>"+
			"<td><button class=\"button-small\" onclick=\"deleteClient("+myObj[x].clientId+")\" style=\"color:white; background-color: red;\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button></td>"+
		    "</tr>";
		}
           textForDiv += "</tbody></table></div>";
        document.getElementById("workingArea").innerHTML = textForDiv;
        document.getElementById("workingAreaSecond").innerHTML = "";
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);  
 }
 function addClients()
 {
     let clName = document.getElementById("clientName").value;
     let clAddress = document.getElementById("clientAddress").value;
     let clPhone = document.getElementById("clientPhone").value;
     let clEmail = document.getElementById("clientEmail").value;
     let obj = { whatRun: 'addClient', clientName: clName, clientAddress: clAddress, clientPhone: clPhone, clientEmail: clEmail, limit:0};
     var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var myObj = JSON.parse(this.responseText);

	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
  showClients();
 }

function seeClient(clientId)
{
    let textForDiv = "";
    let obj = { whatRun:'showClientDetails', clientId: clientId, "limit":0 };
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var myObj = JSON.parse(this.responseText);
            for (let x in myObj)
            {
                textForDiv += "<div class=\"col-sm-12 col-md-12\"> <h2>Editati client - persoana fizica</h2>"+
                    "<form class=\"form-horizontal\">"+
                    "<div class=\"form-group\">"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"clientNameEdit\" name=\"clientNameEdit\" value=\""+myObj[x].clientName+"\" /></div>"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"clientAddressEdit\" name=\"clientAddressEdit\" value=\""+myObj[x].clientAddress+"\" /></div>"+
                    "</div>"+
                    "<div class=\"form-group\">"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"clientPhoneEdit\" name=\"clientPhoneEdit\" value=\""+myObj[x].clientPhone+"\" /></div>"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"clientEmailEdit\" name=\"clientEmailEdit\" value=\""+myObj[x].clientEmail+"\" /></div>"+
                    "</div>"+
                    "<div class=\"form-group\">"+
                    "<div class=\"col-md-6\"><button class=\"btn btn-warning pull-right\" onclick=\"saveClientChanges("+clientId+"); return false;\">Salvati modificarile</button>"+
                    "<button class=\"btn btn-primary pull-left\" onclick=\"showClients(); return false;\">Anulati editarea</button></div>"+
                    "</div>"+
                    "</form></div>";
            }
            document.getElementById("workingAreaSecond").innerHTML = textForDiv;
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function saveClientChanges(clientId) //run 3
{
    let clientNameEdit = document.getElementById("clientNameEdit").value;
    let clientAddressEdit = document.getElementById("clientAddressEdit").value;
    let clientPhoneEdit = document.getElementById("clientPhoneEdit").value;
    let clientEmailEdit = document.getElementById("clientEmailEdit").value;
    let obj = { whatRun: 'saveClientChanges', clientEditId: clientId, clientName: clientNameEdit, clientAddress: clientAddressEdit, clientPhone: clientPhoneEdit, clientEmail: clientEmailEdit, limit:0};
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            alert(myObj.text);
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
    showClients();
}

function deleteClient(clientId)
{
    if (confirm("Sunteti sigur ca doriti sa stergeti clientul?") == true) {
        let obj = { whatRun: 'deleteClient', clientName: clientId, limit:0};
        let dbParam = JSON.stringify(obj);
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let myObj = JSON.parse(this.responseText);
                alert(myObj.text);
            }
        };
        xmlhttp.open("POST", "processController.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("details=" + dbParam);
        showClients();
    }
}

 function showCompanies()
 {
    let textForDiv = "";
    textForDiv += companyGeneralForm;
    let obj = { whatRun:'showCompanies', "limit":0 };
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        let myObj = JSON.parse(this.responseText);
        textForDiv += "<div class=\"col-sm-12 col-md-12\" style='max-height: 700px; overflow: scroll;'><h2>Lista clienti persoane juridice</h2>"+
	    "<table class=\"table\"><thead><tr><th>Denumire</th><th>CUI</th><th>Telefon</th><th>Email</th><th>Contact</th><th>Editare</th><th>Stergere</th>"+
	    "</tr></thead><tbody>";
	for (let x in myObj)
		{   
            textForDiv += "<tr><td>"+myObj[x].companyName+"</td><td>"+myObj[x].companyCui+"</td><td>"+myObj[x].companyPhone+"</td><td>"+myObj[x].companyEmail+"</td><td>"+myObj[x].companyContact+"</td>"+
			"<td><button class=\"button-small\" onclick=\"seeCompany("+myObj[x].companyId+")\" style=\"color:white; background-color: #EB9316;\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button></td>"+
			"<td><button class=\"button-small\" onclick=\"deleteCompany("+myObj[x].companyId+")\" style=\"color:white; background-color: red;\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button></td>"+
		    "</tr>";
		}
           textForDiv += "</tbody></table></div>";
        document.getElementById("workingArea").innerHTML = textForDiv; 
        document.getElementById("workingAreaSecond").innerHTML = "";
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);  
 }

function addCompany()
 {
     let compName = document.getElementById("companyName").value;
     let compAddress = document.getElementById("companyAddress").value;
     let compCui = document.getElementById("companyCui").value;
     let compReg = document.getElementById("companyReg").value;
     let compPhone = document.getElementById("companyPhone").value;
     let compEmail = document.getElementById("companyEmail").value;
     let compContact = document.getElementById("companyContact").value;
     let obj = { whatRun: 'addCompany', companyName: compName, companyAddress: compAddress, companyCui: compCui, companyReg: compReg, companyPhone: compPhone, companyEmail: compEmail, companyContact: compContact, limit:0};
     let dbParam = JSON.stringify(obj);
     let xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState === 4 && this.status === 200) {
             let myObj = JSON.parse(this.responseText);
             alert(myObj.text);
             showCompanies();
         }
     };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
 }

function seeCompany(companyId)
{
    let textForDiv = "";
    let obj = { whatRun:'showCompanyDetails', clientId: companyId, "limit":0 };
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            for (let x in myObj)
            {
                textForDiv += "<div class=\"col-sm-12 col-md-12\"> <h2>Editati persoane juridice</h2>"+
                    "<form class=\"form-horizontal\">"+
                    "<div class=\"form-group\">"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyNameEdit\" name=\"companyNameEdit\" value=\""+myObj[x].companyName+"\" /></div>"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyAddressEdit\" name=\"companyAddressEdit\" value=\""+myObj[x].companyAddress+"\" /></div>"+
                    "</div>"+
                    "<div class=\"form-group\">"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyCuiEdit\" name=\"companyCuiEdit\" value=\""+myObj[x].companyCui+"\" /></div>"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyRegEdit\" name=\"companyRegEdit\" value=\""+myObj[x].companyRegistry+"\" /></div>"+
                    "</div>"+
                    "<div class=\"form-group\">"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyPhoneEdit\" name=\"companyPhoneEdit\" value=\""+myObj[x].companyPhone+"\" /></div>"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyEmailEdit\" name=\"companyEmailEdit\" value=\""+myObj[x].companyEmail+"\" /></div>"+
                    "</div>"+
                    "<div class=\"form-group\">"+
                    "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"companyContactEdit\" name=\"companyContactEdit\" value=\""+myObj[x].companyContact+"\" /></div>"+
                    "<div class=\"col-md-6\"><button class=\"btn btn-warning pull-right\" onclick=\"saveCompanyChanges("+companyId+"); return false;\">Salvati modificarile</button>"+
                    "<button class=\"btn btn-primary pull-left\" onclick=\"showCompanies(); return false;\">Anulati editarea</button></div>"+
                    "</div>"+
                    "</form></div>";
            }
            document.getElementById("workingAreaSecond").innerHTML = textForDiv;
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function saveCompanyChanges(companyId)
{
    let compName = document.getElementById("companyNameEdit").value;
    let compAddress = document.getElementById("companyAddressEdit").value;
    let compCui = document.getElementById("companyCuiEdit").value;
    let compReg = document.getElementById("companyRegEdit").value;
    let compPhone = document.getElementById("companyPhoneEdit").value;
    let compEmail = document.getElementById("companyEmailEdit").value;
    let compContact = document.getElementById("companyContactEdit").value;
    let obj = { whatRun: 'saveCompanyChanges', editCompanyId: companyId, companyName: compName, companyAddress: compAddress, companyCui: compCui, companyReg: compReg, companyPhone: compPhone, companyEmail: compEmail, companyContact: compContact, limit:0};
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            alert(myObj.text);
            showCompanies();
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}
function deleteCompany(companyId)
{
    if (confirm("Sunteti sigur ca doriti sa stergeti firma?") == true) {
        let obj = { whatRun: deleteCompany, companyName: companyId, limit:0};
        let dbParam = JSON.stringify(obj);
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let myObj = JSON.parse(this.responseText);
                alert(myObj.text);
                showCompanies();
            }
        };
        xmlhttp.open("POST", "processController.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("details=" + dbParam);
    }
}

 function showReferenceCodes()
 {
        let textForDiv = "";
        let i = 0;
        textForDiv += referenceGeneralForm;
        let obj = { whatRun: 'showReferenceCodes', "limit":0 };
        let dbParam = JSON.stringify(obj);
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            textForDiv += "<div class=\"col-sm-6 col-md-6\" style='max-height: 700px; overflow: scroll;'><h2>Lista coduri de referinta</h2>"+
            "<table class=\"table\"><thead><tr><th>Nr.</th><th>Cod referinta</th><th>Detalii</th><th>Editare</th><th>Stergere</th>"+
            "</tr></thead><tbody>";
            for (let x in myObj)
            {
                        i = i+1;
                        textForDiv += "<tr><td>"+i+"</td><td>"+myObj[x].referenceCode+"</td>"+"<td>"+myObj[x].details+"</td>"+
                "<td><button class=\"button-small\" onclick=\"seeReferenceCode("+myObj[x].referenceId+")\" style=\"color:white; background-color: #EB9316;\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button></td>"+
                "<td><button class=\"button-small\" onclick=\"deleteReferenceCode("+myObj[x].referenceId+")\" style=\"color:white; background-color: red;\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button></td>"+
                "</tr>";
            }
           textForDiv += "</tbody></table></div>";
        document.getElementById("workingArea").innerHTML = textForDiv; 
        document.getElementById("workingAreaSecond").innerHTML = "";
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);  
 }

 function addReferenceCode()
 {
     let refCode = document.getElementById("referenceCode").value;
     let refDetails = document.getElementById("referenceDetail").value;
     let textForDiv = "";
     textForDiv += referenceGeneralForm;
     let obj = { whatRun: 'addReferenceCode', referenceCode: refCode, referenceDetail: refDetails, limit:0};
     let dbParam = JSON.stringify(obj);
     let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let myObj = JSON.parse(this.responseText);
                alert(myObj.text);
                showReferenceCodes();
            }
        };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
 }

function seeReferenceCode(referenceId)
{
    let textForDiv = "";
    let obj = { whatRun:'seeReferenceCodeForUpdate', referenceId: referenceId, "limit":0 };
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            for (let x in myObj)
            {
                textForDiv +=  "<div class=\"col-sm-6 col-md-6\"> <h2>Editare cod de referinta</h2>"+
                    "<form class=\"form-horizontal\">"+
                    "<div class=\"form-group\">"+
                    "<div class=\"col-md-12\" style='margin-bottom: 15px;'><input type=\"text\" class=\"form-control\" id=\"referenceCodeEdit\" name=\"referenceCodeEdit\" value=\""+myObj[x].referenceCode+"\" /></div>"+
                    "<div class=\"col-md-12\" style='margin-bottom: 15px;'><input type=\"text\" class=\"form-control\" id=\"referenceDetailEdit\" name=\"referenceDetailEdit\" value=\""+myObj[x].referenceCodeDetail+"\" /></div>"+
                    "<div class=\"col-md-12\"><button class=\"btn btn-warning pull-right\" onclick=\"saveReferenceCodeChanges("+referenceId+"); return false;\">Salvati modificarile</button>"+
                    "<button class=\"btn btn-primary pull-left\" onclick=\"showReferenceCodes(); return false;\">Anulati editarea</button></div>"+
                    "</div>"+
                    "</form></div>";
            }
            document.getElementById("workingAreaSecond").innerHTML = textForDiv;
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function saveReferenceCodeChanges(referenceId)
{
    let refCode = document.getElementById("referenceCodeEdit").value;
    let refDetails = document.getElementById("referenceDetailEdit").value;
    let textForDiv = "";
    textForDiv += referenceGeneralForm;
    let obj = { whatRun: 'changeReferenceCode', referenceCode: refCode, referenceDetail: refDetails, referenceId: referenceId, limit:0};
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            alert(myObj.text);
            showReferenceCodes();
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function deleteReferenceCode(referenceId)
{
    if (confirm("Sunteti sigur ca doriti sa stergeti codul de referinta?") == true) {
        let obj = { whatRun: 'deleteReferenceCode', referenceName: referenceId, limit:0};
        let dbParam = JSON.stringify(obj);
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let myObj = JSON.parse(this.responseText);
                alert(myObj.text);
                showReferenceCodes();
            }
        };
        xmlhttp.open("POST", "processController.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("details=" + dbParam);
    }
}
 function getReferenceCodes()
 {
    let coduri = "<h2>Adaugati produse</h2>"+
    "<form class=\"form-horizontal\">"+
	"<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"productCode\" name=\"productCode\" placeholder=\"Cod produs\" /></div>"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"productName\" name=\"productName\" placeholder=\"Denumire\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+"<div class=\"col-md-6\"><select class=\"form-control\" id=\"productReferenceCode\" name=\"productReferenceCode\">"+
	"<option value='0'>Alegeti cod referinta</option>";
     let obj = { whatRun: 'getAllReferenceCodes', "limit":0 };
     let dbParam = JSON.stringify(obj);
     let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let myObj = JSON.parse(this.responseText);

                for (let x in myObj)
                    {
                        coduri += "<option value='"+myObj[x].referenceId+"'>"+myObj[x].referenceCode+ "</option>";
                    }
                       coduri += "</select></div>"+
                           "<div class=\"col-md-6\"><select class=\"form-control\" id=\"productType\" name=\"productType\">"+
                           "<option value='0'>Alegeti tipul de produs</option>"+
                           "<option value='1'>Nespecificat</option>"+
                           "<option value='2'>Produs</option>"+
                           "<option value='3'>Servicii</option>"+
                           "</select></div></div>"+
                           "<div class=\"form-group\">"+
                           "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"productPurchasePrice\" name=\"productPurchasePrice\" placeholder=\"Pret achizitie\" /></div>"+
                           "<div class=\"col-md-6\"><select class=\"form-control\" id=\"productAddedValue\" name=\"productAddedValue\" onchange=\"calculateFinalPrice()\">"+
                           "<option value='0'>Alegeti adaosul</option>"+
                           "<option value='0.05'>Adaos 5%</option>"+
                           "<option value='0.1'>Adaos 10%</option>"+
                           "<option value='0.15'>Adaos 15%</option>"+
                           "<option value='0.2'>Adaos 20%</option>"+
                           "<option value='0.25'>Adaos 25%</option>"+
                           "<option value='0.30'>Adaos 30%</option>"+
                           "<option value='0.35'>Adaos 35%</option>"+
                           "</select></div>"+
                           "</div>"+
                           "<div class=\"form-group\">"+
                           "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"productSellingPrice\" name=\"productSellingPrice\" placeholder=\"Pret vanzare\" /></div>"+
                           "<div class=\"col-md-6\"><button class=\"btn btn-warning pull-right\" onclick=\"addProduct(); return false;\">Adaugati</button></div>"+
                           "</div>"+
                            "</form>";
                document.getElementById("productsFormDiv").innerHTML = coduri;
        }
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
 }

 function calculateFinalPrice()
 {
     let addedPercentage = parseFloat(document.getElementById("productAddedValue").value);
     let purchasePrice = parseFloat(document.getElementById("productPurchasePrice").value);
     let toAddToPrice = purchasePrice * addedPercentage;
     document.getElementById("productSellingPrice").value = purchasePrice + toAddToPrice;
 }

function showProducts()
{
    document.getElementById("workingArea").innerHTML = "<div id=\"productsFormDiv\" class=\"col-sm-6 col-md-6\"></div>" +
        "<div id=\"productsTableDiv\" class=\"col-sm-6 col-md-6\"></div>";
    getReferenceCodes();
    let textForDiv = "";
    let i = 0;
    let obj = { whatRun: 'showProducts', "limit":0 };
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            textForDiv += "<div style=\"overflow-x:auto;\"><table class=\"table\"><thead><tr><th>Nr.</th><th>Cod produs</th><th>Denumire</th><th>Cod referinta</th><th>Tip</th><th>Pret vanzare</th><th>Editare</th><th>Stergere</th>"+
                "</tr></thead><tbody>";
            for (let x in myObj)
            {
                i = i+1;
                textForDiv += "<tr><td>"+i+"</td><td>"+myObj[x].productCode+"</td><td>"+myObj[x].productName+"</td><td>"+myObj[x].referenceCode+"</td><td>"+myObj[x].productType+"</td><td>"+myObj[x].productPrice+"</td>"+
                    "<td><button class=\"button-small\" onclick=\"seeProduct("+myObj[x].productId+")\" style=\"color:white; background-color: #EB9316;\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button></td>"+
                    "<td><button class=\"button-small\" onclick=\"deleteProduct("+myObj[x].productId+")\" style=\"color:white; background-color: red;\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button></td>"+
                    "</tr>";
            }
            textForDiv += "</tbody></table></div>";
            document.getElementById("productsTableDiv").innerHTML = textForDiv;
            document.getElementById("workingAreaSecond").innerHTML = "";
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

 function addProduct()
 {
     let prodCode = document.getElementById("productCode").value;
     let prodName = document.getElementById("productName").value;
     let prodRefCode = document.getElementById("productReferenceCode").value;
     let prodType = document.getElementById("productType").value;
     let prodPurchasePrice = document.getElementById("productPurchasePrice").value;
     let prodAddedValue = document.getElementById("productAddedValue").value;
     let prodSellingPrice = document.getElementById("productSellingPrice").value;
     let i = 0;
     let obj = { whatRun: 'addProduct', productCode: prodCode, productName: prodName, ref: prodRefCode, productType: prodType,
         productPurchasePrice: prodPurchasePrice, productAddedValue: prodAddedValue, productSellingPrice: prodSellingPrice, limit:0};
     let dbParam = JSON.stringify(obj);
     let xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState === 4 && this.status === 200) {
             let myObj = JSON.parse(this.responseText);
             alert(myObj.text);
             showProducts();
         }
     };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);  
 }

 function seeProduct(productId)
 {
     let productEditForm = "<h2>Editare produs</h2>";
     let obj = { whatRun: 'getProductDetails', product: productId, "limit":0 };
     let dbParam = JSON.stringify(obj);
     let xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState === 4 && this.status === 200) {
             let myObj = JSON.parse(this.responseText);

             for (let x in myObj)
             {
                 productEditForm += "<form class=\"form-horizontal\">"+
                 "<div class=\"form-group\">"+
                 "<div class=\"col-md-4\"><input type=\"text\" class=\"form-control\" id=\"productCodeEdit\" name=\"productCodeEdit\" value=\""+myObj[x].productCode+"\" /></div>"+
                 "<div class=\"col-md-4\"><input type=\"text\" class=\"form-control\" id=\"productNameEdit\" name=\"productNameEdit\" value=\""+myObj[x].productName+"\" /></div>"+
                     "<div id = \"referenceForProductEdit\" class=\"col-md-4\"></div>"+
                     "</div>";
                 productEditForm += "<div class=\"form-group\">"+
                     "<div class=\"col-md-4\">" +
                     "<select class=\"form-control\" id=\"productTypeEdit\" name=\"productTypeEdit\">"+
                     "<option value='1'>Nespecificat</option>"+
                     "<option value='2'>Produs</option>"+
                     "<option value='3'>Servicii</option>"+
                     "</select></div>"+
                     "<div class=\"col-md-4\"><input type=\"text\" class=\"form-control\" id=\"purchasePriceEdit\" name=\"purchasePriceEdit\" value=\""+myObj[x].purchasePrice+"\" /></div>"+
                     "<div class=\"col-md-4\">" +
                     "<select class=\"form-control\" id=\"productAddedValueEdit\" name=\"productAddedValueEdit\" onchange=\"calculateFinalPriceEdit()\">"+
                     "<option value='0'>Alegeti adaosul</option>"+
                     "<option value='0.05'>Adaos 5%</option>"+
                     "<option value='0.1'>Adaos 10%</option>"+
                     "<option value='0.15'>Adaos 15%</option>"+
                     "<option value='0.2'>Adaos 20%</option>"+
                     "<option value='0.25'>Adaos 25%</option>"+
                     "<option value='0.30'>Adaos 30%</option>"+
                     "<option value='0.35'>Adaos 35%</option>"+
                     "</select></div>"+
                     "</div>"+
                     "<div class=\"form-group\">"+
                     "<div class=\"col-md-4\"><input type=\"text\" class=\"form-control\" id=\"sellingPriceEdit\" name=\"sellingPriceEdit\" value=\""+myObj[x].sellingPrice+"\" /></div>"+
                     "<div class=\"col-md-4\"></div>"+
                     "<div class=\"col-md-4\"><button class=\"btn btn-warning pull-right\" onclick=\"saveProductChanges("+productId+"); return false;\">Salvati modificarile</button>"+
                     "<button class=\"btn btn-primary pull-left\" onclick=\"showProducts(); return false;\">Anulati editarea</button></div>"+
                     "</div>"+
                     "</form>";
                 document.getElementById("workingAreaSecond").innerHTML = productEditForm;
                 getReferenceForProductEditing(myObj[x].productReference);
                 const $select = document.querySelector('#productAddedValueEdit');
                 $select.value = myObj[x].addedValue;
                 const $selectType = document.querySelector('#productTypeEdit');
                 $selectType.value = myObj[x].productType;
             }

         }
     };
     xmlhttp.open("POST", "processController.php", true);
     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xmlhttp.send("details=" + dbParam);
 }

function calculateFinalPriceEdit()
{
    let addedPercentage = parseFloat(document.getElementById("productAddedValueEdit").value);
    let purchasePrice = parseFloat(document.getElementById("purchasePriceEdit").value);
    let toAddToPrice = purchasePrice * addedPercentage;
    document.getElementById("sellingPriceEdit").value = purchasePrice + toAddToPrice;
}

 function getReferenceForProductEditing(productReferenceId)
 {
     let coduri = "<select class=\"form-control\" id=\"productReferenceCodeEdit\" name=\"productReferenceCodeEdit\">";
     let obj = { whatRun: 'getAllReferenceCodes', "limit":0 };
     let dbParam = JSON.stringify(obj);
     let xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState === 4 && this.status === 200) {
             let myObj = JSON.parse(this.responseText);

             for (let x in myObj)
             {
                 if (myObj[x].referenceId == productReferenceId)
                 {
                     coduri += "<option value='"+myObj[x].referenceId+"' selected>"+myObj[x].referenceCode+ "</option>";
                 }
                 else
                 {
                     coduri += "<option value='"+myObj[x].referenceId+"'>"+myObj[x].referenceCode+ "</option>";
                 }

             }
             coduri += "</select>";
             document.getElementById("referenceForProductEdit").innerHTML = coduri;
         }
     };
     xmlhttp.open("POST", "processController.php", true);
     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xmlhttp.send("details=" + dbParam);
 }

 function saveProductChanges(productId)
 {
     let prodCode = document.getElementById("productCodeEdit").value;
     let prodName = document.getElementById("productNameEdit").value;
     let prodRefCode = document.getElementById("productReferenceCodeEdit").value;
     let prodType = document.getElementById("productTypeEdit").value;
     let prodPurchasePrice = document.getElementById("purchasePriceEdit").value;
     let prodAddedValue = document.getElementById("productAddedValueEdit").value;
     let prodSellingPrice = document.getElementById("sellingPriceEdit").value;
     let i = 0;
     let obj = { whatRun: 'saveProductChanges', productCode: prodCode, productName: prodName, ref: prodRefCode,
                 productType: prodType, purchasePrice: prodPurchasePrice, addedValue: prodAddedValue,
                 sellingPrice: prodSellingPrice, productId: productId, limit:0};
     let dbParam = JSON.stringify(obj);
     let xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState === 4 && this.status === 200) {
             let myObj = JSON.parse(this.responseText);
             alert(myObj.text);
             showProducts();
         }
     };
     xmlhttp.open("POST", "processController.php", true);
     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xmlhttp.send("details=" + dbParam);
 }
function deleteProduct(productId)
{
    if (confirm("Sunteti sigur ca doriti sa stergeti produsul?") == true) {
        let obj = { whatRun: 'deleteProduct', productCode: productId, limit:0};
        let dbParam = JSON.stringify(obj);
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let myObj = JSON.parse(this.responseText);
                alert(myObj.text);
                showProducts();
            }
        };
        xmlhttp.open("POST", "processController.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("details=" + dbParam);
    }
}

 function showSasiuOption()
 {
     let textForSasiuOption = "";
     textForSasiuOption = "<div class=\"col-sm-6 col-md-6\"> <h2>Adaugare sasiu</h2><h3>Alegeti clientul (fizic sau juridic)</h3>"+
    "<form class=\"form-horizontal\"><div class=\"form-group\"><div class=\"col-md-12\">"+
    "<select class=\"form-control\" id=\"tipClient\" name=\"tipClient\">"+
	"<option value='1'> Client Juridic</option><option value='0'>Client fizic</option></select></div></div>"+
	"<div class=\"form-group\"><div class=\"col-md-12\">"+
        "<button class=\"btn btn-warning pull-right\" onclick=\"chooseClientSasiu(); return false;\">Alegeti tip client</button>"+
                    "</div></div></form></div>";
    document.getElementById("workingArea").innerHTML = textForSasiuOption;
    document.getElementById("workingAreaSecond").innerHTML = "";
        
 }
 function chooseClientSasiu()
 {
     let tipClient = document.getElementById("tipClient").value;
     document.getElementById("workingArea").innerHTML = "<div id=\"sasiuFormArea\" class=\"col-sm-12 col-md-12\"></div>" +
         "<div id=\"sasiuTableArea\" class=\"col-sm-12 col-md-12\" style='max-height: 700px; overflow: scroll;'></div>";
     showAllSasiu();
     let formText = "";
    formText = " <h2>Adaugati sasiuri</h2>"+
    "<form class=\"form-horizontal\">"+
    "<input type=\"hidden\" id=\"clientType\" name=\"clientType\" value='"+tipClient+"'/>"+
	"<div class=\"form-group\">"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"sasiu\" name=\"sasiu\" placeholder=\"Numar sasiu\" /></div>"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"model\" name=\"model\" placeholder=\"Model\" /></div>"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"madeDate\" name=\"madeDate\" placeholder=\"Data fabricatiei - zz.ll.aaaa\" /></div>"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"yearModel\" name=\"yearModel\" placeholder=\"Model an\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"sellType\" name=\"sellType\" placeholder=\"Tip vanzare\" /></div>"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"engineCode\" name=\"engineCode\" placeholder=\"Cod motor (max. 3 caractere)\" /></div>"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"transmissionCode\" name=\"transmissionCode\" placeholder=\"Cod transmisie (max. 3 caractere)\" /></div>"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"axelDrive\" name=\"axelDrive\" placeholder=\"Axel drive (max. 3 caractere)\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"equipment\" name=\"equipment\" placeholder=\"Echipament (max. 3 caractere)\" /></div>"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"colorPlafon\" name=\"colorPlafon\" placeholder=\"Culoare plafon (max. 3 caractere)\" /></div>"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"colorExt\" name=\"colorExt\" placeholder=\"Culoare exterior (max. 10 caractere)\" /></div>"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"colorCarpet\" name=\"colorCarpet\" placeholder=\"Culoare covor (max. 10 caractere)\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"placesCombination\" name=\"placesCombination\" placeholder=\"Combinatie locuri (max. 10 caractere)\" /></div>"+
            "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"zOrders\" name=\"zOrders\" placeholder=\"Numar comenzi Z (max. 10 caractere)\" /></div>"+
            "<div class=\"col-md-3\"><select class=\"form-control\" id=\"clientCode\" name=\"clientCode\"><option value='0'>Alegeti client</option>";
     let obj = { whatRun: 'getClientsByType', "limit":0, clientType:tipClient };
     let dbParam = JSON.stringify(obj);
     let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        let myObj = JSON.parse(this.responseText);
	for (let x in myObj)
		{   
                    formText += "<option value='"+myObj[x].clientId+"'>"+myObj[x].clientNames+ "</option>";
		}
           formText += "</select></div>"+
               "<div id=\"referenceCodeForSasiuDiv\" class=\"col-md-3\">"+
               "</div></div>"+
               "<div class=\"form-group\">"+
               "<div class=\"col-md-12\"><button class=\"btn btn-warning pull-right\" onclick=\"addSasiu(); return false;\">Adaugati</button></div>"+
                "</div>"+
                "</form>";
           document.getElementById("sasiuFormArea").innerHTML = formText;
           getAllReferenceCodesForSasiu();
           document.getElementById("workingAreaSecond").innerHTML = "";
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
 }

 function getAllReferenceCodesForSasiu()
 {
     let textForDiv = "<select class=\"form-control\" id=\"referenceSasiuCode\" name=\"referenceSasiuCode\">" +
                      "<option value='0'>Alegeti codul de referinta</option>";
     let obj = { whatRun: 'showReferenceCodes', "limit":0 };
     let dbParam = JSON.stringify(obj);
     let xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState === 4 && this.status === 200) {
             let myObj = JSON.parse(this.responseText);
             for (let x in myObj)
             {
                 textForDiv += "<option value='"+myObj[x].referenceId+"'>"+myObj[x].referenceCode+"</option>";
             }
             textForDiv += "</select>";
             document.getElementById("referenceCodeForSasiuDiv").innerHTML = textForDiv;
         }
     };
     xmlhttp.open("POST", "processController.php", true);
     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xmlhttp.send("details=" + dbParam);
 }
 function showAllSasiu()
 {
     let textForDiv = "";
     let i = 0;
     let obj = { whatRun: 'showAllSasiu', "limit":0 };
     let dbParam = JSON.stringify(obj);
     let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
        let myObj = JSON.parse(this.responseText);
        textForDiv += "<h2>Lista Sasiuri</h2>"+
	    "<table class=\"table\"><thead><tr><th>Nr.</th><th>Nr. Sasiu</th><th>Model</th><th>Data fabricatie</th><th>Cod motor</th><th>Cod transmisie</th><th>Tip vanzare</th><th>Cod referinta</th><th>Editare</th><th>Stergere</th>"+
	    "</tr></thead><tbody>";
	for (let x in myObj)
		{   
                    i = i+1;
                    textForDiv += "<tr><td>"+i+"</td><td>"+myObj[x].sasiuNumber+"</td><td>"+myObj[x].sasiuModel+"</td>"+
                         "<td>"+myObj[x].sasiuYear+"</td><td>"+myObj[x].sasiuEngine+"</td><td>"+myObj[x].sasiuTransmission+"</td><td>"+myObj[x].sellingType+"</td><td>"+myObj[x].referenceCodeSasiu+"</td>"+
        "<td><button class=\"button-small\" onclick=\"seeSasiu("+myObj[x].sasiuId+")\" style=\"color:white; background-color: #EB9316;\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button></td>"+
			"<td><button class=\"button-small\" onclick=\"deleteSasiu("+myObj[x].sasiuId+")\" style=\"color:white; background-color: red;\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button></td>"+
		    "</tr>";
		}
           textForDiv += "</tbody></table>";
           document.getElementById("sasiuTableArea").innerHTML = textForDiv;
           document.getElementById("workingAreaSecond").innerHTML = "";
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam); 
 }
 function addSasiu()
 {
     let clientCode = document.getElementById("clientCode").value;
     let sasiu = document.getElementById("sasiu").value;
     let model = document.getElementById("model").value;
     let madeDate = document.getElementById("madeDate").value;
     let yearModel = document.getElementById("yearModel").value;
     let sellType = document.getElementById("sellType").value;
     let engineCode = document.getElementById("engineCode").value;
     let transmissionCode = document.getElementById("transmissionCode").value;
     let axelDrive = document.getElementById("axelDrive").value;
     let equipment = document.getElementById("equipment").value;
     let colorPlafon = document.getElementById("colorPlafon").value;
     let colorExt = document.getElementById("colorExt").value;
     let colorCarpet = document.getElementById("colorCarpet").value;
     let placesCombination = document.getElementById("placesCombination").value;
     let zOrders = document.getElementById("zOrders").value;
     let referenceSasiuCode = document.getElementById("referenceSasiuCode").value;
     let clientType = document.getElementById("clientType").value;
     let obj = { whatRun: 'addNewSasiu', clientCode: clientCode, sasiu: sasiu, model: model, madeDate: madeDate,
                 yearModel: yearModel, sellType: sellType, engineCode: engineCode, transmissionCode: transmissionCode, 
                 axelDrive: axelDrive, equipment: equipment, colorPlafon: colorPlafon, colorExt: colorExt, 
                 colorCarpet: colorCarpet, placesCombination: placesCombination, zOrders: zOrders, referenceCode: referenceSasiuCode, clientType: clientType, limit:0};
     let dbParam = JSON.stringify(obj);
     let xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState === 4 && this.status === 200) {
             let myObj = JSON.parse(this.responseText);
             alert(myObj.text);
             document.getElementById("sasiu").value = "";
             document.getElementById("model").value = "";
             document.getElementById("madeDate").value = "";
             document.getElementById("yearModel").value = "";
             document.getElementById("sellType").value = "";
             document.getElementById("engineCode").value = "";
             document.getElementById("transmissionCode").value = "";
             document.getElementById("axelDrive").value = "";
             document.getElementById("equipment").value = "";
             document.getElementById("colorPlafon").value = "";
             document.getElementById("colorExt").value = "";
             document.getElementById("colorCarpet").value = "";
             document.getElementById("placesCombination").value = "";
             document.getElementById("zOrders").value = "";
             showAllSasiu();
         }
     };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
 }

 function seeSasiu(sasiuId)
 {
     let formText = " <h2>Editati sasiu</h2>";
     let obj = { whatRun: 'getSasiuForEdit', "limit":0, sasiuId: sasiuId };
     let dbParam = JSON.stringify(obj);
     let xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState === 4 && this.status === 200) {
             let myObj = JSON.parse(this.responseText);
             for (let x in myObj)
             {
                 formText += "<form class=\"form-horizontal\">"+
                     "<input type=\"hidden\" id=\"clientType\" name=\"clientType\" value='"+myObj[x].tipClient+"'/>"+
                     "<div class=\"form-group\">"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"sasiuEdit\" name=\"sasiuEdit\" value=\""+myObj[x].sasiuNumber+"\" /></div>"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"modelEdit\" name=\"modelEdit\" value=\""+myObj[x].sasiuModel+"\" /></div>"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"madeDateEdit\" name=\"madeDateEdit\" value=\""+myObj[x].sasiuYear+"\" /></div>"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"yearModelEdit\" name=\"yearModelEdit\" value=\""+myObj[x].yearModel+"\" /></div>"+
                     "</div>"+
                     "<div class=\"form-group\">"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"sellTypeEdit\" name=\"sellTypeEdit\" value=\""+myObj[x].sellingType+"\" /></div>"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"engineCodeEdit\" name=\"engineCodeEdit\" value=\""+myObj[x].sasiuEngine+"\" /></div>"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"transmissionCodeEdit\" name=\"transmissionCodeEdit\" value=\""+myObj[x].sasiuTransmission+"\" /></div>"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"axelDriveEdit\" name=\"axelDriveEdit\" value=\""+myObj[x].axelDrive+"\" /></div>"+
                     "</div>"+
                     "<div class=\"form-group\">"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"equipmentEdit\" name=\"equipmentEdit\" value=\""+myObj[x].equipment+"\" /></div>"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"colorPlafonEdit\" name=\"colorPlafonEdit\" value=\""+myObj[x].roofColor+"\" /></div>"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"colorExtEdit\" name=\"colorExtEdit\" value=\""+myObj[x].externalColor+"\" /></div>"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"colorCarpetEdit\" name=\"colorCarpetEdit\" value=\""+myObj[x].carpetColor+"\" /></div>"+
                     "</div>"+
                     "<div class=\"form-group\">"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"placesCombinationEdit\" name=\"placesCombinationEdit\" value=\""+myObj[x].placesCombination+"\" /></div>"+
                     "<div class=\"col-md-3\"><input type=\"text\" class=\"form-control\" id=\"zOrdersEdit\" name=\"zOrdersEdit\" value=\""+myObj[x].zOrders+"\" /></div>";
                 formText += "<div id=\"clientCodeForSasiuEditDiv\" class=\"col-md-3\"></div><div id=\"referenceCodeForSasiuEditDiv\" class=\"col-md-3\">"+
                     "</div></div>"+
                     "<div class=\"form-group\">"+
                     "<div class=\"col-md-6\"><button class=\"btn btn-warning pull-right\" onclick=\"saveSasiuChanges("+sasiuId+"); return false;\">Salvati modificarile</button>"+
                     "<button class=\"btn btn-primary pull-left\" onclick=\"showAllSasiu(); return false;\">Anulati editarea</button></div>"+
                     "</div>"+
                     "</form>";
                 document.getElementById("workingAreaSecond").innerHTML = formText;
                 getClientCodesForSasiuEdit(myObj[x].clientId, myObj[x].tipClient);
                 getReferenceCodesForSasiuEdit(myObj[x].referenceCodeSasiu);
             }
         }
     };
     xmlhttp.open("POST", "processController.php", true);
     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xmlhttp.send("details=" + dbParam);
 }

 function getClientCodesForSasiuEdit(clientId, clientType)
 {
     let coduri = "<select class=\"form-control\" id=\"clientCodeForSasiuEdit\" name=\"clientCodeForSasiuEdit\">";
     let obj = { whatRun: 'getClientsByType', clientType: clientType, "limit":0 };
     let dbParam = JSON.stringify(obj);
     let xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState === 4 && this.status === 200) {
             let myObj = JSON.parse(this.responseText);

             for (let x in myObj)
             {
                 if (myObj[x].clientId == clientId)
                 {
                     coduri += "<option value='"+myObj[x].clientId+"' selected>"+myObj[x].clientNames+ "</option>";
                 }
                 else
                 {
                     coduri += "<option value='"+myObj[x].clientId+"'>"+myObj[x].clientNames+ "</option>";
                 }

             }
             coduri += "</select>";
             document.getElementById("clientCodeForSasiuEditDiv").innerHTML = coduri;
         }
     };
     xmlhttp.open("POST", "processController.php", true);
     xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
     xmlhttp.send("details=" + dbParam);
 }

function getReferenceCodesForSasiuEdit(referenceCodeId)
{
    let coduri = "<select class=\"form-control\" id=\"referenceCodeForSasiuEdit\" name=\"referenceCodeForSasiuEdit\">";
    let obj = { whatRun: 'getAllReferenceCodes', "limit":0 };
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);

            for (let x in myObj)
            {
                if (myObj[x].referenceId == referenceCodeId)
                {
                    coduri += "<option value='"+myObj[x].referenceId+"' selected>"+myObj[x].referenceCode+ "</option>";
                }
                else
                {
                    coduri += "<option value='"+myObj[x].referenceId+"'>"+myObj[x].referenceCode+ "</option>";
                }

            }
            coduri += "</select>";
            document.getElementById("referenceCodeForSasiuEditDiv").innerHTML = coduri;
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function saveSasiuChanges(sasiuId)
{
    let clientCode = document.getElementById("clientCodeForSasiuEdit").value;
    let sasiu = document.getElementById("sasiuEdit").value;
    let model = document.getElementById("modelEdit").value;
    let madeDate = document.getElementById("madeDateEdit").value;
    let yearModel = document.getElementById("yearModelEdit").value;
    let sellType = document.getElementById("sellTypeEdit").value;
    let engineCode = document.getElementById("engineCodeEdit").value;
    let transmissionCode = document.getElementById("transmissionCodeEdit").value;
    let axelDrive = document.getElementById("axelDriveEdit").value;
    let equipment = document.getElementById("equipmentEdit").value;
    let colorPlafon = document.getElementById("colorPlafonEdit").value;
    let colorExt = document.getElementById("colorExtEdit").value;
    let colorCarpet = document.getElementById("colorCarpetEdit").value;
    let placesCombination = document.getElementById("placesCombinationEdit").value;
    let zOrders = document.getElementById("zOrdersEdit").value;
    let referenceSasiuCode = document.getElementById("referenceCodeForSasiuEdit").value;
    let clientType = document.getElementById("clientType").value;
    let obj = { whatRun: 'saveSasiuChanges', clientCode: clientCode, sasiu: sasiu, model: model, madeDate: madeDate,
        yearModel: yearModel, sellType: sellType, engineCode: engineCode, transmissionCode: transmissionCode,
        axelDrive: axelDrive, equipment: equipment, colorPlafon: colorPlafon, colorExt: colorExt,
        colorCarpet: colorCarpet, placesCombination: placesCombination, zOrders: zOrders,
        referenceCode: referenceSasiuCode, clientType: clientType, sasiuId: sasiuId, limit:0};
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            alert(myObj.text);
            showAllSasiu();
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function deleteSasiu(sasiuId)
{
    if (confirm("Sunteti sigur ca doriti sa stergeti sasiul?") == true) {
        let obj = { whatRun: 'deleteSasiu', clientCode: sasiuId, limit:0};
        let dbParam = JSON.stringify(obj);
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let myObj = JSON.parse(this.responseText);
                alert(myObj.text);
                showAllSasiu();
            }
        };
        xmlhttp.open("POST", "processController.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("details=" + dbParam);
    }
}

function showReceivedInvoices()
{
    document.getElementById("workingArea").innerHTML = "<div class=\"col-sm-6 col-md-6\" id=\"receivedInvoiceFormDiv\"> </div>"+
        "<div class=\"col-sm-6 col-md-6\" id=\"allReceivedInvoicesDivTable\" style='max-height: 700px; overflow: scroll;'> </div>"
    document.getElementById("receivedInvoiceFormDiv").innerHTML = receivedInvoicesFormContent;
    document.getElementById("workingAreaSecond").innerHTML = "";
    addClientsForReceivedInvoiceSelect();
    getAllReceivedInvoices();
}

function getAllReceivedInvoices()
{
        let textForDiv = "";
        let i = 0;
        let obj = { whatRun: 'getAllReceivedInvoices', limit: 0 };
        let dbParam = JSON.stringify(obj);
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let myObj = JSON.parse(this.responseText);
                textForDiv += "<h2>Lista facturi primite</h2>"+
                    "<table class=\"table\"><thead><tr><th>Nr.</th><th>Serie/Numar</th><th>Furnizor</th><th>Total</th><th>Suma achitata</th><th>Data</th><th>Termen</th><th>AWB</th><th>Editare</th><th>Stergere</th>"+
                    "</tr></thead><tbody>";
                for (let x in myObj)
                {
                    i = i+1;
                    textForDiv += "<tr><td>"+i+"</td><td>"+myObj[x].invoiceSerial+"/"+myObj[x].invoiceNumber+"</td><td>"+myObj[x].clientName+"</td>"+
                        "<td>"+myObj[x].totalAmount+"</td><td>"+myObj[x].paidAmount+"</td><td>"+myObj[x].invoiceDate+"</td><td>"+myObj[x].deadline+" zile</td><td>"+myObj[x].awbCode+"</td>"+
                        "<td><button class=\"button-small\" onclick=\"seeRecievedInvoice("+myObj[x].invoiceId+")\" style=\"color:white; background-color: #EB9316;\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button></td>"+
                        "<td><button class=\"button-small\" onclick=\"deleteReceivedInvoice("+myObj[x].invoiceId+")\" style=\"color:white; background-color: red;\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button></td>"+
                        "</tr>";
                }
                textForDiv += "</tbody></table>";
                document.getElementById("allReceivedInvoicesDivTable").innerHTML = textForDiv;
            }
        };
        xmlhttp.open("POST", "processController.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("details=" + dbParam);
}

function addClientsForReceivedInvoiceSelect()
{
    let textForDiv = "<select class=\"form-control\" id=\"receivedInvoiceSupplier\" name=\"receivedInvoiceSupplier\">"+
        "<option value='0'>Alegeti furnizorul</option>";
    let obj = { whatRun: 'getSuppliers', "limit":0};
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            for (let x in myObj)
            {
                textForDiv += "<option value='"+myObj[x].supplierId+"'>"+myObj[x].supplierName+ "</option>";
            }
            textForDiv += "</select>";
            document.getElementById("clientsDivForReceivedInvoice").innerHTML = textForDiv;
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function addReceivedInvoice()
{
    let reInvoiceSerial = document.getElementById("receivedInvoiceSerial").value;
    let reInvoiceNumber = document.getElementById("receivedInvoiceNumber").value;
    let reInvoiceSupplier = document.getElementById("receivedInvoiceSupplier").value;
    let reInvoiceTotalAmount = document.getElementById("receivedInvoiceTotalAmount").value;
    let reInvoicePaidAmount = document.getElementById("receivedInvoicePaidAmount").value;
    let reInvoiceAwbCode = document.getElementById("receivedInvoiceAwbCode").value;
    let reInvoiceDeadline = document.getElementById("receivedInvoiceDeadline").value;
    let reInvoiceDate = document.getElementById("receivedInvoiceDate").value;
    let obj = { whatRun: 'addNewReceivedInvoice', receivedInvoiceSerial: reInvoiceSerial, receivedInvoiceNumber: reInvoiceNumber,
        receivedInvoiceSupplier: reInvoiceSupplier, receivedInvoiceTotalAmount: reInvoiceTotalAmount, receivedInvoicePaidAmount: reInvoicePaidAmount,
        receivedInvoiceAwbCode: reInvoiceAwbCode, receivedInvoiceDeadline:  reInvoiceDeadline, receivedInvoiceDate: reInvoiceDate, "limit":0};
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            for (let x in myObj)
            {
                createFormToAddReceivedInvoiceProducts(myObj[x].invoiceSerial, myObj[x].invoiceNumber, myObj[x].invoiceId);

            }
            getAllReceivedInvoices();
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function createFormToAddReceivedInvoiceProducts(invoiceSerial, invoiceNumber, invoiceId)
{
    document.getElementById('receivedInvoiceFormDiv').innerHTML = "<h2>Adaugati produse - factura " + invoiceSerial + "/" + invoiceNumber + "</h2>" +
        "<form class=\"form-horizontal\">" +
        "<div class=\"form-group\">" +
        "<input type=\"hidden\" class=\"form-control\" id=\"receivedInvoiceIdForProducts\" name=\"receivedInvoiceIdForProducts\" value = \"" + invoiceId + "\" />" +
        "<div class=\"col-md-6\" id=\"productsForReceivedInvoiceDiv\">" +

        "</div>" +
        "<div class=\"col-md-6\">" +
        "<input type=\"number\" class=\"form-control\" id=\"receivedInvoiceProductPrice\" name=\"receivedInvoiceProductPrice\" placeholder=\"Pret produs\" />" +
        "</div>" +
        "</div>" +
        "<div class=\"form-group\">" +
        "<div class=\"col-md-6\">" +
        "<input type=\"number\" class=\"form-control\" id=\"receivedInvoiceProductQuantity\" name=\"receivedInvoiceProductQuantity\" placeholder=\"Cantitate\" />" +
        "</div>" +
        "<div class=\"col-md-6\">" +
        "<input type=\"number\" class=\"form-control\" id=\"receivedInvoiceProductVAT\" name=\"receivedInvoiceProductVAT\" placeholder=\"TVA\" />" +
        "</div>" +
        "</div>" +
        "<div class=\"form-group\">" +
        "<div class=\"col-md-6\">" +
        "<input type=\"number\" class=\"form-control\" id=\"receivedInvoiceProductTotalAmount\" name=\"receivedInvoiceProductTotalAmount\" placeholder=\"Suma totala\" />" +
        "</div>" +
        "<div class=\"col-md-3\">" +
        "<button class=\"btn btn-primary pull-left\" onclick=\"showReceivedInvoices(); return false;\">AM TERMINAT!</button>" +
        "</div>" +
        "<div class=\"col-md-3\">" +
        "<button class=\"btn btn-warning pull-right\" onclick=\"addProductToReceivedInvoice(); return false;\">Adaugati</button>" +
        "</div>" +
        "</div>" +
        "</form>";
    addProductsForReceivedInvoiceSelect();
}

function addProductsForReceivedInvoiceSelect()
{
    let textForDiv = "<select class=\"form-control\" id=\"selectProductForReceivedInvoice\" name=\"selectProductForReceivedInvoice\">"+
        "<option value='0'>Alegeti produsul</option>";
    let obj = { whatRun: 'getProductsWithPrice', "limit":0};
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            for (let x in myObj)
            {
                textForDiv += "<option value='"+myObj[x].productId+"'>"+myObj[x].productName+ "</option>";
            }
            textForDiv += "</select>";
            document.getElementById("productsForReceivedInvoiceDiv").innerHTML = textForDiv;
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function addProductToReceivedInvoice()
{
    let receivedInvoiceId = document.getElementById('receivedInvoiceIdForProducts').value;
    let productId = document.getElementById('selectProductForReceivedInvoice').value;
    let productPrice = document.getElementById('receivedInvoiceProductPrice').value;
    let productQuantity = document.getElementById('receivedInvoiceProductQuantity').value;
    let productVAT = document.getElementById('receivedInvoiceProductVAT').value;
    let productTotalAmount = document.getElementById('receivedInvoiceProductTotalAmount').value;
    let obj = { whatRun: 'addProductToReceivedInvoice', receivedInvoiceId: receivedInvoiceId, productIdAndPrice: productId,
        productPrice: productPrice, productQuantity: productQuantity, productVAT: productVAT, productTotalAmount: productTotalAmount};
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            alert(myObj.text);
            document.getElementById("receivedInvoiceProductTotalAmount").value = "";
            document.getElementById("receivedInvoiceProductPrice").value = "";
            document.getElementById("receivedInvoiceProductQuantity").value = "";
            document.getElementById("receivedInvoiceProductVAT").value = "";
            addProductsForReceivedInvoiceSelect();
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function deleteReceivedInvoice(receivedInvoiceId)
{
    if (confirm("Sunteti sigur ca doriti sa stergeti factura primita?") == true) {
        let obj = { whatRun: 'deleteReceivedInvoice', invoiceId: receivedInvoiceId};
        let dbParam = JSON.stringify(obj);
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let myObj = JSON.parse(this.responseText);
                alert(myObj.text);
                getAllReceivedInvoices();
            }
        };
        xmlhttp.open("POST", "processController.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("details=" + dbParam);
    }
}

function seeRecievedInvoice(receivedInvoiceId)
{

}
function showInvoiceOption()
{
    let textForInvoiceOption = "";
    textForInvoiceOption = "<div class=\"col-sm-6 col-md-6\"> <h2>Facturi emise</h2><h3>Alegeti clientul (fizic sau juridic)</h3>"+
        "<form class=\"form-horizontal\"><div class=\"form-group\"><div class=\"col-md-12\">"+
        "<select class=\"form-control\" id=\"tipClient\" name=\"tipClient\">"+
        "<option value='1'> Client Juridic</option><option value='0'>Client fizic</option></select></div></div>"+
        "<div class=\"form-group\"><div class=\"col-md-12\">"+
        "<button class=\"btn btn-warning pull-right\" onclick=\"chooseClientInvoice(); return false;\">Alegeti tip client</button>"+
        "</div></div></form></div>";
    document.getElementById("workingArea").innerHTML = textForInvoiceOption;
    document.getElementById("workingAreaSecond").innerHTML = "";
}

function chooseClientInvoice() //13
{
    window.invoiceListOfProducts=[];
    window.invoiceTotalAmount=0;
    let tipClient = document.getElementById("tipClient").value;
    let formText = "";
    document.getElementById("workingArea").innerHTML = "<div id=\"divForInvoiceForm\" class=\"col-sm-12 col-md-6\"></div>" +
        "<div id=\"divForInvoiceTable\" class=\"col-sm-12 col-md-6\" style='max-height: 700px; overflow: scroll;'></div>";
    showAllInvoice();
    formText = `<div style="display: inline-flex;justify-content: space-between;width: 100%;"> 
        <span style="font-size:30px;">Creare factura</span>
        <span style="font-size:30px;" id="totalInvoice">Total: 0</span>
    </div>`;
    formText+=
        "<form class=\"form-horizontal\">"+
        "<input type=\"hidden\" id=\"ownInvoiceClientType\" name=\"ownInvoiceClientType\" value='"+tipClient+"'/>"+
        "<div class=\"form-group\">"+
        "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"ownInvoiceSerial\" name=\"ownInvoiceSerial\" placeholder=\"Serie factura\" /></div>"+
        "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"ownInvoiceNumber\" name=\"ownInvoiceNumber\" placeholder=\"Numar factura\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
        "<div class=\"col-md-6\"><input type=\"number\" class=\"form-control\" id=\"ownInvoiceDeadlinePayment\" name=\"ownInvoiceDeadlinePayment\" placeholder=\"Termen de plata\" /></div>"+
        "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"ownInvoiceOnlineAWB\" name=\"ownInvoiceOnlineAWB\" placeholder=\"Cod AWB (daca exista)\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
        "<div class=\"col-md-6\"><select class=\"form-control\" id=\"ownInvoiceClientCode\" name=\"ownInvoiceClientCode\"><option value='0'>Alegeti client</option>";
    let obj = { whatRun: 'getClientsByType', "limit":0, clientType:tipClient };
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            for (let x in myObj)
            {
                formText += "<option value='"+myObj[x].clientId+"'>"+myObj[x].clientNames+ "</option>";
            }
            formText += "</select></div>"+
                "<div class=\"col-md-6\"><button class=\"btn btn-warning pull-right\" onclick=\"addInvoice(); return false;\">Adaugare factura</button></div>"+
                "</div>"+
                "</form>";

            formText += `<div class="d-flex justify-content-between">
                <span style="font-size:30px;">Lista Produse</span>
                <button class="btn btn-warning pull-right" onclick="showSelectProductForInvoice(); return false;">
                    Adaugare produs
                </button>
                </div> 
                <div id="listOfProducts"> 
                <div style="max-height: 218px; overflow: auto;">
                <table class="table" id="invoiceProductsList">
                <thead>
                    <tr>
                        <th>Nume produs</th>
                        <th>Pret</th>
                        <th>Cantitate</th>
                        <th>TVA</th>
                        <th>Total</th>
                        <th>Sterge</th>
                    </tr>
                </thead>
                <tbody>
                    <tr id="noProductsRow"><td colspan="6">Lista goala</td></tr>
                </tbody>
                </table>
                </div>
                </div>`;

            document.getElementById("divForInvoiceForm").innerHTML = formText;
            document.getElementById("workingAreaSecond").innerHTML = "";
            showAllInvoice();
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function addProductToInvoice(){
    
    let idx = 0;
    if(window.invoiceListOfProducts.length>0){
        idx = window.invoiceListOfProducts[window.invoiceListOfProducts.length-1].idx+1;
    }
    
    let productId = document.getElementById('selectProductForOwnInvoice').value;
    let productPrice = document.getElementById('ownInvoiceProductPrice').value;
    let productQuantity = document.getElementById('ownInvoiceProductQuantity').value;
    let productVAT = document.getElementById('ownInvoiceProductVAT').value;

    if(productId=='-1' || productQuantity=='' || productVAT=='')
    {
        alert("Verificati valorile selectate!");
        return false;
    }
    
    let product={
        idx:idx,
        id:productId,
        name: window.productsList[productId].productName,
        price:productPrice,
        quantity:productQuantity,
        vat:productVAT/100,
        total:(1+productVAT/100)*productPrice*productQuantity
    };
    window.invoiceListOfProducts.push(product);
    document.getElementById("noProductsRow").style.display = 'none';
    let table = document.getElementById("invoiceProductsList");
    let row = table.insertRow(window.invoiceListOfProducts.length);
    let nume = row.insertCell(0);
    nume.innerHTML = product.name;
    let pret = row.insertCell(1);
    pret.innerHTML = product.price;
    let cantitate = row.insertCell(2);
    cantitate.innerHTML = product.quantity;
    let tva = row.insertCell(3);
    tva.innerHTML = `${productVAT}%` ;
    let total = row.insertCell(4);
    total.innerHTML = product.total;
    let sterge = row.insertCell(5);
    calcTotalInvoice();
    sterge.innerHTML = `<button class="button-small" onclick="deleteProductFromInvoice(${product.idx},this)" style="color:white; background-color: red;">
    <i class="fa fa-times" aria-hidden="true"></i>
    </button>`;

    document.getElementById('selectProductForOwnInvoice').value=-1;
    document.getElementById('ownInvoiceProductPrice').value="";
    document.getElementById('ownInvoiceProductQuantity').value="";
    document.getElementById('ownInvoiceProductVAT').value="";
    $('#addProductPopup').modal('hide');
}

function calcTotalInvoice(){
    let val = 0;
    window.invoiceListOfProducts.forEach(p=>{
        val+=(1+p.vat/100)*p.price*p.quantity;
    });
    window.invoiceTotalAmount=val;
    document.getElementById('totalInvoice').innerHTML = `Total: ${val.toFixed(2)}`;
}

function showSelectProductForInvoice(){
    $('#addProductPopup').modal();
}

function onShowSelectProductForInvoice(){
    $("#selectProductForOwnInvoice").empty();
    let select = document.getElementById("selectProductForOwnInvoice");

    let el = document.createElement("option");
    el.textContent = "Alegere produs";
    el.value = '-1';
    select.appendChild(el);

    window.productsList = {};
    
    
    let obj = { whatRun: 'getProductsWithPrice', "limit":0};
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            for (let x in myObj)
            {
                let el = document.createElement("option");
                el.textContent = myObj[x].productName;
                el.value = myObj[x].productId;
                select.appendChild(el);
                window.productsList[myObj[x].productId]=myObj[x];
            }
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}


function deleteProductFromInvoice(idx, btn){
    let table = document.getElementById("invoiceProductsList");
    table.deleteRow(btn.parentElement.parentElement.rowIndex);
    let i  = window.invoiceListOfProducts.findIndex(p=>p.idx==idx);
    window.invoiceListOfProducts.splice(i,1);
    if(window.invoiceListOfProducts.length==0)
        document.getElementById("noProductsRow").style.display = '';
    calcTotalInvoice();
}

function showAllInvoice()
{
    let textForDiv = "";
    let i = 0;
    let obj = { whatRun: 'getAllInvoices', "limit":0 };
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            textForDiv += "<h2 style=\"margin-top:4px;\">Lista Facturi</h2><br/>Client fizic = 0, Client juridic = 1"+
                "<table class=\"table\"><thead><tr><th>Nr.</th><th>Serie/Nr.</th><th>Client</th><th>Total</th><th>Suma achitata</th><th>Data</th><th>Termen plata</th><th>Descarcare</th><th>Stergere</th>"+
                "</tr></thead><tbody>";
            for (let x in myObj)
            {
                i = i+1;
                textForDiv += "<tr><td>"+i+"</td><td>"+myObj[x].invoiceSerial+"/"+myObj[x].invoiceNumber+"</td><td>"+myObj[x].clientType+"</td>"+
                    "<td>"+myObj[x].totalAmount+"</td><td>"+myObj[x].paidAmount+"</td><td>"+myObj[x].invoiceDate+"</td><td>"+myObj[x].invoiceDeadline+" zile</td>"+
                    "<td><button class=\"button-small\" onclick=\"seeInvoice("+myObj[x].invoiceId+")\" style=\"color:white; background-color: #EB9316;\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></button></td>"+
                    "<td><button class=\"button-small\" onclick=\"deleteInvoice("+myObj[x].invoiceId+")\" style=\"color:white; background-color: red;\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button></td>"+
                    "</tr>";
            }
            textForDiv += "</tbody></table>";
            document.getElementById("divForInvoiceTable").innerHTML = textForDiv;
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function seeInvoice(invoiceId){
    let obj = { whatRun: 'getInvoiceDetails', "invoiceId":invoiceId };
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            console.log(myObj);
            var pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
                putOnlyUsedFonts:true
                });
            factura = myObj.invoice[0];
            let height = 297;

            pdf.text(`Serie: ${factura.invoiceSerial}`,20, 20);
            pdf.text(`Numar: ${factura.invoiceNumber}`, 20, 30);
            pdf.text(`Data: ${factura.invoiceDate}`, 20, 40);
            pdf.text(`Total: ${factura.totalAmount}`, 20, 50);

            let pos=70;
            pdf.text(`Denumire`, 20, pos);
            pdf.text(`Pret`, 90, pos);
            pdf.text(`Cantitate`, 110, pos);
            pdf.text(`TVA`, 140, pos);
            pdf.text(`Suma totala`, 160, pos);
            pdf.setLineWidth(1.1);
            pdf.line(20, 72, 190, 72);
            pos+=10;
            
            pdf.setFont('Helvetica', '').setFontSize(12);
            pdf.setLineWidth(0.5);
            myObj.products.forEach(p=>{
                pdf.text(`${p.name}`, 20, pos);
                pdf.text(`${p.price}`, 90, pos);
                pdf.text(`${p.quantity}`, 110, pos);
                pdf.text(`${p.vat}`, 140, pos);
                pdf.text(`${p.total}`, 160, pos);
                pos+=6;
                pdf.line(20, pos-4, 190, pos-4);
                if(pos>height-20){
                    pdf.addPage();
                    pos=20;
                }
            });

            //pdf.save('factura.pdf');
            
            let string = pdf.output('datauristring');
            var embed = "<embed width='100%' height='100%' src='" + string + "'/>"
            var x = window.open();
            x.document.open();
            x.document.write(embed);
            x.document.close();


            let csvContent="";
            csvContent+="Factura,,,,\n";
            csvContent+="Serie,Numar,Data,Total,,\n";
            csvContent+=`${factura.invoiceSerial},${factura.invoiceNumber},${factura.invoiceDate},${factura.totalAmount},\n`; 
            csvContent+=",,,,\n"
            csvContent+="Produse,,,,\n"
            csvContent+="Denumire,Pret,Cantitate,TVA,SumaTotala\n";
            myObj.products.forEach(p=>{
                csvContent+=`${p.name},${p.price},${p.quantity},${p.vat},${p.total}\n`;
            });
            downloadCsv(csvContent,`factura_${factura.invoiceSerial}_${factura.invoiceNumber}.csv`);
        }
    }
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function downloadCsv(text,fileName) {
    var el = document.createElement('a');
    var csvContent = text; 
    var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    el.href = url;
    el.setAttribute('download', fileName);
    el.click();
}


function addInvoice()
{
    let clientType = document.getElementById("ownInvoiceClientType").value;
    let invoiceSerial = document.getElementById("ownInvoiceSerial").value;
    let invoiceNumber = document.getElementById("ownInvoiceNumber").value;
    let totalAmount = window.invoiceTotalAmount;//document.getElementById("ownInvoiceTotalAmount").value;
    let amountPaid = 0;//document.getElementById("ownInvoiceAmountPaid").value;
    let deadline = document.getElementById("ownInvoiceDeadlinePayment").value;
    let onlineAWB = document.getElementById("ownInvoiceOnlineAWB").value;
    let clientCode = document.getElementById("ownInvoiceClientCode").value;
    let obj = { whatRun: 'addNewInvoiceNew', clientType: clientType, invoiceSerial: invoiceSerial, invoiceNumber: invoiceNumber,
        totalAmount: totalAmount, amountPaid: amountPaid, onlinecodawb: onlineAWB, clientCode: clientCode, deadline: deadline,
        products:window.invoiceListOfProducts
    };
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            clearInvoice();
            showAllInvoice();
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function clearInvoice(){
    document.getElementById("ownInvoiceSerial").value="";
    document.getElementById("ownInvoiceDeadlinePayment").value="";
    document.getElementById("ownInvoiceNumber").value="";
    document.getElementById("ownInvoiceOnlineAWB").value="";
    document.getElementById("ownInvoiceClientCode").value="";
    let table = document.getElementById("invoiceProductsList");
    for(let i=0;i<window.invoiceListOfProducts.length;i++)
        table.deleteRow(1);
    window.invoiceListOfProducts=[];
    document.getElementById('totalInvoice').innerHTML = `Total: 0`;
    document.getElementById("noProductsRow").style.display = '';
    console.log("formular reinitializat");
}

function deleteInvoice(invoiceId)
{
    if (confirm("Sunteti sigur ca doriti sa stergeti factura emisa?") == true) {
        let obj = { whatRun: 'deleteInvoice', invoiceId: invoiceId, limit:0};
        let dbParam = JSON.stringify(obj);
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let myObj = JSON.parse(this.responseText);
                alert(myObj.text);
                showAllInvoice();
            }
        };
        xmlhttp.open("POST", "processController.php", true);
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.send("details=" + dbParam);
    }
}

function createFormToAddInvoiceProducts(invoiceSerial, invoiceNumber, invoiceId)
{
    document.getElementById('divForInvoiceForm').innerHTML = "<h2>Adaugati produse - factura " + invoiceSerial + "/" + invoiceNumber + "</h2>" +
        "<form class=\"form-horizontal\">" +
        "<div class=\"form-group\">" +
        "<input type=\"hidden\" class=\"form-control\" id=\"ownInvoiceIdForProducts\" name=\"ownInvoiceIdForProducts\" value = \"" + invoiceId + "\" />" +
        "<div class=\"col-md-6\" id=\"productsForOwnInvoiceDiv\">" +

        "</div>" +
        "<div class=\"col-md-6\">" +
        "<input type=\"number\" class=\"form-control\" id=\"ownInvoiceProductPrice\" name=\"ownInvoiceProductPrice\" placeholder=\"Pret produs\" />" +
        "</div>" +
        "</div>" +
        "<div class=\"form-group\">" +
        "<div class=\"col-md-6\">" +
        "<input type=\"number\" class=\"form-control\" id=\"ownInvoiceProductQuantity\" name=\"ownInvoiceProductQuantity\" placeholder=\"Cantitate\" />" +
        "</div>" +
        "<div class=\"col-md-6\">" +
        "<input type=\"number\" class=\"form-control\" id=\"ownInvoiceProductVAT\" name=\"ownInvoiceProductVAT\" placeholder=\"TVA\" />" +
        "</div>" +
        "</div>" +
        "<div class=\"form-group\">" +
        "<div class=\"col-md-6\">" +
        "<input type=\"number\" class=\"form-control\" id=\"ownInvoiceProductTotalAmount\" name=\"ownInvoiceProductTotalAmount\" placeholder=\"Suma totala\" />" +
        "</div>" +
        "<div class=\"col-md-3\">" +
        "<button class=\"btn btn-primary pull-left\" onclick=\"showInvoiceOption(); return false;\">AM TERMINAT!</button>" +
        "</div>" +
        "<div class=\"col-md-3\">" +
        "<button class=\"btn btn-warning pull-right\" onclick=\"addProductToOwnInvoice(); return false;\">Adaugati</button>" +
        "</div>" +
        "</div>" +
        "</form>";
    addProductsForOwnInvoiceSelect();
}

function addProductsForOwnInvoiceSelect()
{
    let textForDiv = "<select class=\"form-control\" id=\"selectProductForOwnInvoice\" name=\"selectProductForOwnInvoice\">"+
        "<option value='0'>Alegeti produsul</option>";
    let obj = { whatRun: 'getProductsWithPrice', "limit":0};
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            for (let x in myObj)
            {
                textForDiv += "<option value='"+myObj[x].productId+"'>"+myObj[x].productName+ "</option>";
            }
            textForDiv += "</select>";
            document.getElementById("productsForOwnInvoiceDiv").innerHTML = textForDiv;
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

function addProductToOwnInvoice()
{
    let ownInvoiceId = document.getElementById('ownInvoiceIdForProducts').value;
    let productId = document.getElementById('selectProductForOwnInvoice').value;
    let productPrice = document.getElementById('ownInvoiceProductPrice').value;
    let productQuantity = document.getElementById('ownInvoiceProductQuantity').value;
    let productVAT = document.getElementById('ownInvoiceProductVAT').value;
    let productTotalAmount = document.getElementById('ownInvoiceProductTotalAmount').value;
    let obj = { whatRun: 'addProductToOwnInvoice', invoiceId: ownInvoiceId, productIdAndPrice: productId,
        productPrice: productPrice, productQuantity: productQuantity, productVAT: productVAT, productTotalAmount: productTotalAmount};
    let dbParam = JSON.stringify(obj);
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let myObj = JSON.parse(this.responseText);
            alert(myObj.text);
            document.getElementById("ownInvoiceProductTotalAmount").value = "";
            document.getElementById("ownInvoiceProductPrice").value = "";
            document.getElementById("ownInvoiceProductQuantity").value = "";
            document.getElementById("ownInvoiceProductVAT").value = "";
            addProductsForOwnInvoiceSelect();
        }
    };
    xmlhttp.open("POST", "processController.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("details=" + dbParam);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function showSellOption()//16
{
    
    var textForSellOption = "";
     textForSellOption = "<div class=\"col-sm-6 col-md-6\"> <h2>Adaugare vanzari</h2><h3>Alegeti factura pentru care se introduce vanzarea</h3>"+
    "<form class=\"form-horizontal\"><div class=\"form-group\"><div class=\"col-md-12\">"+
    "<select class=\"form-control\" id=\"invoiceCode\" name=\"invoiceCode\">"+
	"<option value='0'> Alegeti factura</option>";
	
    var obj = { whatRun:16, "limit":0 };
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var myObj = JSON.parse(this.responseText);
	for (var x in myObj) 
		{   
                    textForSellOption += "<option value='"+myObj[x].invoiceCode+"'>"+myObj[x].invoiceCode+ "</option>";
		}
           textForSellOption += "</select></div></div>"+
                "<div class=\"form-group\"><div class=\"col-md-12\">"+
                "<button class=\"btn btn-warning pull-right\" onclick=\"chooseInvoiceCode(); return false;\">OKAY</button>"+
                    "</div></div></form></div>";  
           document.getElementById("workingArea").innerHTML = textForSellOption;
           document.getElementById("workingAreaSecond").innerHTML = "";
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
    
}

function chooseInvoiceCode()//17
{
    showAllSells();
    var invoiceCode = document.getElementById("invoiceCode").value;
    var formText = "";
    formText = "<div class=\"col-sm-12 col-md-12\"> <h2>Adaugati vanzari</h2>"+
    "<form class=\"form-horizontal\">"+
    "<input type=\"hidden\" id=\"invoiceCode\" name=\"invoiceCode\" value='"+invoiceCode+"'/>"+
	"<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"quantity\" name=\"quantity\" placeholder=\"Cantitate\" /></div>"+
            "<div class=\"col-md-6\"><input type=\"text\" class=\"form-control\" id=\"price\" name=\"price\" placeholder=\"Pret unitar\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
            "<div class=\"col-md-6\"><select class=\"form-control\" id=\"productId\" name=\"productId\"><option value='0'>Alegeti produsul</option>";
    var obj = { whatRun:17, "limit":0};
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var myObj = JSON.parse(this.responseText);
	for (var x in myObj) 
		{   
                    formText += "<option value='"+myObj[x].productId+"'>"+myObj[x].productCode+"-"+myObj[x].productName+ "</option>";
		}
           formText += "</select></div>"+
                "<div class=\"col-md-3\"><button class=\"btn btn-warning pull-right\" onclick=\"addSell(); return false;\">Adaugati</button></div>"+
        "</div>"+
     "</form></div>";   
           document.getElementById("workingArea").innerHTML = formText;
           //document.getElementById("workingAreaSecond").innerHTML = "";
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
 }

function showAllSells()//18
{
    var textForDiv = "";
    var i = 0;
    var obj = { whatRun:18, "limit":0 };
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var myObj = JSON.parse(this.responseText);
        textForDiv += "<div class=\"col-sm-12 col-md-12\"><h2>Lista Vanzari</h2>"+           
	    "<table class=\"table\"><thead><tr><th>Nr.</th><th>Produs</th><th>Factura</th><th>Cantitate</th><th>Total</th><th>Editare</th><th>Stergere</th>"+
	    "</tr></thead><tbody>";
	for (var x in myObj) 
		{   
                    i = i+1;
                    textForDiv += "<tr><td>"+i+"</td><td>"+myObj[x].product+"</td><td>"+myObj[x].invoice+"</td>"+
                         "<td>"+myObj[x].quantity+"</td><td>"+myObj[x].total+"</td>"+   
			"<td><button class=\"button-small\" onclick=\"seeVanzare("+myObj[x].vanzareId+")\" style=\"color:white; background-color: #EB9316;\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button></td>"+
			"<td><button class=\"button-small\" onclick=\"deleteVanzare("+myObj[x].vanzareId+")\" style=\"color:white; background-color: red;\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button></td>"+
		    "</tr>";
		}
           textForDiv += "</tbody></table></div>";
           document.getElementById("workingAreaSecond").innerHTML = textForDiv;     
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
}
function addSell()//19
{
    var invoiceCode = document.getElementById("invoiceCode").value;
    var quantity = document.getElementById("quantity").value;
    var price = document.getElementById("price").value;
    var productId = document.getElementById("productId").value;
    var textForDiv = "";
    var i = 0;
    var obj = { whatRun:19, invoiceCode: invoiceCode, quantity: quantity, price: price, productId: productId, limit:0};
     var dbParam = JSON.stringify(obj);
     var xmlhttp = new XMLHttpRequest();
     var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var myObj = JSON.parse(this.responseText);
        textForDiv += "<div class=\"col-sm-12 col-md-12\"><h2>Lista Vanzari</h2>"+           
	    "<table class=\"table\"><thead><tr><th>Nr.</th><th>Produs</th><th>Factura</th><th>Cantitate</th><th>Total</th><th>Editare</th><th>Stergere</th>"+
	    "</tr></thead><tbody>";
	for (var x in myObj) 
		{   
                    i = i+1;
                    textForDiv += "<tr><td>"+i+"</td><td>"+myObj[x].product+"</td><td>"+myObj[x].invoice+"</td>"+
                         "<td>"+myObj[x].quantity+"</td><td>"+myObj[x].total+"</td>"+   
			"<td><button class=\"button-small\" onclick=\"seeVanzare("+myObj[x].vanzareId+")\" style=\"color:white; background-color: #EB9316;\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button></td>"+
			"<td><button class=\"button-small\" onclick=\"deleteVanzare("+myObj[x].vanzareId+")\" style=\"color:white; background-color: red;\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button></td>"+
		    "</tr>";
		}
           textForDiv += "</tbody></table></div>";
           document.getElementById("workingAreaSecond").innerHTML = textForDiv;     
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
 }

function deleteUser(userId)//21
 {
     if (confirm("Sunteti sigur ca doriti sa stergeti utilizatorul?") == true) {
         let textForDiv = "";
         let tipUser = "";
         textForDiv += usersGeneralForm;
         let obj = { whatRun: 21, userType: userId};
         let dbParam = JSON.stringify(obj);
         let xmlhttp = new XMLHttpRequest();
         xmlhttp.onreadystatechange = function() {
             if (this.readyState === 4 && this.status === 200) {
                 let myObj = JSON.parse(this.responseText);
                 showUsers();
                 textForDiv += "</tbody></table></div>";
                 //document.getElementById("workingArea").innerHTML = textForDiv;
                 document.getElementById("workingAreaSecond").innerHTML = "";
             }
         };
         xmlhttp.open("POST", "processController.php", true);
         xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         xmlhttp.send("details=" + dbParam);

     }
 }
 
 function showReturnOption()//2
{
    var textForReturnOption = "";
    textForReturnOption = "<div class=\"col-sm-6 col-md-6\"> <h2>Adaugare retururi</h2><h3>Alegeti furnizorul pentru care faceti returul</h3>"+
    "<form class=\"form-horizontal\"><div class=\"form-group\"><div class=\"col-md-12\">"+
    "<select class=\"form-control\" id=\"providerId\" name=\"providerId\">"+
	"<option value='0'> Alegeti furnizor</option>";
	
    var obj = { whatRun: 'getSuppliers', "limit":0 };
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var myObj = JSON.parse(this.responseText);
	for (var x in myObj) 
		{   
                    textForReturnOption += "<option value='"+myObj[x].suplierId+"'>"+myObj[x].supplierName+ "</option>";
		}
           textForReturnOption += "</select></div></div>"+
                "<div class=\"form-group\"><div class=\"col-md-12\">"+
                "<button class=\"btn btn-warning pull-right\" onclick=\"showReturnsForm(); return false;\">OKAY</button>"+
                    "</div></div></form></div>";  
           document.getElementById("workingArea").innerHTML = textForReturnOption;
           document.getElementById("workingAreaSecond").innerHTML = "";
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
    
}
 
function showReturnsForm()//24
{
    showAllReturns();
    var providerId = document.getElementById("providerId").value;
    var formText = "";
    formText = "<div class=\"col-sm-12 col-md-12\"> <h2>Creati retur</h2>"+
    "<form class=\"form-horizontal\">"+
    "<input type=\"hidden\" id=\"providerId\" name=\"providerId\" value='"+providerId+"'/>"+
	"<div class=\"form-group\">"+
            "<div class=\"col-md-4\"><input type=\"text\" class=\"form-control\" id=\"returnAmount\" name=\"returnAmount\" placeholder=\"Valoare (ex. 78.00)\" /></div>"+
            "<div class=\"col-md-4\"><input type=\"text\" class=\"form-control\" id=\"returnPaid\" name=\"returnPaid\" placeholder=\"Suma achitata (ex. 78.00)\" /></div>"+
        "</div>"+
        "<div class=\"form-group\">"+
        "<div class=\"col-md-4\"><select class=\"form-control\" id=\"returnProduct\" name=\"returnProduct\"><option value='0'>Alegeti produsul</option>";
    var obj = { whatRun:24, "limit":0};
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var myObj = JSON.parse(this.responseText);
	for (var x in myObj) 
		{   
                    formText += "<option value='"+myObj[x].productId+"'>"+myObj[x].productCode+" - "+myObj[x].productName+ "</option>";
		}
           formText += "</select></div>"+
                "<div class=\"col-md-4\"><button class=\"btn btn-warning pull-right\" onclick=\"addReturn(); return false;\">Adaugati</button></div>"+
        "</div>"+
     "</form></div>";   
           document.getElementById("workingArea").innerHTML = formText;
           //document.getElementById("workingAreaSecond").innerHTML = "";
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
}

function addReturn()//25
{
     var providerId = document.getElementById("providerId").value;
     var returnAmount = document.getElementById("returnAmount").value;
     var returnPaid = document.getElementById("totalAmount").value;
     var returnProduct = document.getElementById("amountPaid").value;
     var textForDiv = "";
     var i = 0;
     var obj = { whatRun:25, providerId: providerId, returnAmount: returnAmount, returnPaid: returnPaid, 
         returnProduct: returnProduct, limit:0};
     var dbParam = JSON.stringify(obj);
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var myObj = JSON.parse(this.responseText);
        textForDiv += "<div class=\"col-sm-12 col-md-12\"><h2>Lista Retururi</h2>"+           
	    "<table class=\"table\"><thead><tr><th>Nr.</th><th>Furnizor</th><th>Produs</th><th>Valoare</th><th>Suma achitata</th><th>Data</th><th>Editare</th><th>Stergere</th>"+
	    "</tr></thead><tbody>";
	for (var x in myObj) 
		{   
                    i = i+1;
                    textForDiv += "<tr><td>"+i+"</td><td>"+myObj[x].providerName+"</td><td>"+myObj[x].productCode+" - "+myObj[x].productName+"</td>"+
                         "<td>"+myObj[x].totalAmount+"</td><td>"+myObj[x].paidAmount+"</td><td>"+myObj[x].returnDate+"</td>"+    
			"<td><button class=\"button-small\" onclick=\"seeReturn("+myObj[x].returnId+")\" style=\"color:white; background-color: #EB9316;\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button></td>"+
			"<td><button class=\"button-small\" onclick=\"deleteReturn("+myObj[x].returnId+")\" style=\"color:white; background-color: red;\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button></td>"+
		    "</tr>";
		}
           textForDiv += "</tbody></table></div>";
           document.getElementById("workingAreaSecond").innerHTML = textForDiv;     
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam);
 }

function showAllReturns()//23
   {
    var textForDiv = "";
    var i = 0;
    var obj = { whatRun:23, "limit":0 };
    var dbParam = JSON.stringify(obj);
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var myObj = JSON.parse(this.responseText);
        textForDiv += "<div class=\"col-sm-12 col-md-12\"><h2>Lista Retururi</h2>"+           
	    "<table class=\"table\"><thead><tr><th>Nr.</th><th>Furnizor</th><th>Produs</th><th>Valoare</th><th>Suma achitata</th><th>Data</th><th>Editare</th><th>Stergere</th>"+
	    "</tr></thead><tbody>";
	for (var x in myObj) 
		{   
                    i = i+1;
                    textForDiv += "<tr><td>"+i+"</td><td>"+myObj[x].providerName+"</td><td>"+myObj[x].productCode+" - "+myObj[x].productName+"</td>"+
                         "<td>"+myObj[x].totalAmount+"</td><td>"+myObj[x].paidAmount+"</td><td>"+myObj[x].returnDate+"</td>"+    
			"<td><button class=\"button-small\" onclick=\"seeReturn("+myObj[x].returnId+")\" style=\"color:white; background-color: #EB9316;\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button></td>"+
			"<td><button class=\"button-small\" onclick=\"deleteReturn("+myObj[x].returnId+")\" style=\"color:white; background-color: red;\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button></td>"+
		    "</tr>";
		}
           textForDiv += "</tbody></table></div>";
           document.getElementById("workingAreaSecond").innerHTML = textForDiv;     
	}
    };
  xmlhttp.open("POST", "processController.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("details=" + dbParam); 
 }
 //26
 function deleteProvider(providerId)
 {
     if (confirm("Sunteti sigur ca doriti sa stergeti furnizorul?") == true) {
         let textForDiv = "";
         textForDiv += providersGeneralForm;
         let obj = { whatRun: 26, providerId: providerId, limit:0};
         let dbParam = JSON.stringify(obj);
         let xmlhttp = new XMLHttpRequest();
         xmlhttp.onreadystatechange = function() {
             if (this.readyState === 4 && this.status === 200) {
                 let myObj = JSON.parse(this.responseText);
                 textForDiv += "<div class=\"col-sm-12 col-md-12\"><h2>Lista furnizori</h2>"+
                     "<table class=\"table\"><thead><tr><th>Denumire</th><th>CUI</th><th>Telefon</th><th>Email</th><th>Contact</th><th>Editare</th><th>Stergere</th>"+
                     "</tr></thead><tbody>";
                 for (let x in myObj)
                 {
                     textForDiv += "<tr><td>"+myObj[x].providerName+"</td><td>"+myObj[x].providerCui+"</td><td>"+myObj[x].providerPhone+"</td><td>"+myObj[x].providerEmail+"</td><td>"+myObj[x].providerContact+"</td>"+
                         "<td><button class=\"button-small\" onclick=\"seeProvider("+myObj[x].providerId+")\" style=\"color:white; background-color: #EB9316;\"><i class=\"fa fa-pencil\" aria-hidden=\"true\"></i></button></td>"+
                         "<td><button class=\"button-small\" onclick=\"deleteProvider("+myObj[x].providerId+")\" style=\"color:white; background-color: red;\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button></td>"+
                         "</tr>";
                 }
                 textForDiv += "</tbody></table></div>";
                 document.getElementById("workingArea").innerHTML = textForDiv;
                 document.getElementById("workingAreaSecond").innerHTML = "";
             }
         };
         xmlhttp.open("POST", "processController.php", true);
         xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
         xmlhttp.send("details=" + dbParam);
     }
 }
