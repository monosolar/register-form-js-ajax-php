
function sendRequest() {

    clearErrorsContainer();

    var requestVars = getRequestVars();

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = onRequestResponsed;


    var varsString = '';

    for (var varId in requestVars)
    {
        if (varsString.length != 0)
            varsString += '&';

        varsString += varId + "=" + requestVars[varId];
    }


    xmlhttp.open("POST", "api.php", true);
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
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

function onRequestResponsed(evt)
{
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("basicResponseDiv").innerHTML = "";

        var responseObj = JSON.parse(this.responseText);

        if (responseObj.status == "ok")
        {
            window.location = "success.html";
        } else {

            for (type in responseObj.errors)
            {
                addErrorToDocument(type, responseObj.errors[type]);
            }
        }
    }

}

function clearErrorsContainer()
{
    document.getElementById("basicResponseDiv").innerHTML = "";
}

function addErrorToDocument(type, text)
{
    var errorLi = document.createElement('li');
    errorLi.className = "list-group-item list-group-item-danger"
    errorLi.innerHTML = "<i class='glyphicon glyphicon-remove' style='margin-right: 5px'></i>";
    errorLi.innerHTML += "<b style='margin-right: 5px'>" + type + ":" + "</b>";
    errorLi.innerHTML += text;

    document.getElementById("basicResponseDiv").appendChild(errorLi);

}

