
function sendRequest() {

    var requestVars = getRequestVars();

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("basicResponseDiv").innerHTML = (this.responseText);
        }
    };

    var varsString = '';

    for (var varId in requestVars)
    {
        if (varsString.length == 0)
            varsString += '&';

        varsString += varId + "=" + requestVars[varId];
    }


    xmlhttp.open("POST", "api.php", true);
    xmlhttp.send(varsString);
}

function getRequestVars(){
    var varsObj = {};

    varsObj['first_name'] = document.getElementById("firstNameTextInput").value;
    varsObj['last_name'] = document.getElementById("lastNameTextInput").value;
    varsObj['email'] = document.getElementById("emailTextInput").value;
    varsObj['password'] = document.getElementById("passwordTextInput").value;

    return  varsObj;
}

