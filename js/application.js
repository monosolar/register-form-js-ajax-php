
function inputFocus(inputElem) {

    var parentDiv = inputElem.parentElement

    formDivError(parentDiv, false);
}

function formDivError(formDiv, errorEnable)
{
    var errorClass = " has-error";
    var hasErrorMark = formDiv.className.indexOf(errorClass) > -1;

    console.log("►",errorEnable,hasErrorMark);

    if (errorEnable == hasErrorMark) return;

    if (errorEnable)
    {
        formDiv.className += errorClass;

    } else {
        formDiv.className = formDiv.className.replace(errorClass, "");
    }
}

function highlightFormElemByType(type)
{
    var inputElemID = type + "TextInput";
    var parentDiv = document.getElementById(inputElemID).parentElement;
    formDivError(parentDiv, true);
}

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

    varsObj['first_name'] = document.getElementById("first_nameTextInput").value;
    varsObj['last_name'] = document.getElementById("last_nameTextInput").value;
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
                highlightFormElemByType(type);
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
    errorLi.innerHTML += "<b style='margin-right: 5px'>" + type.replace("_"," ") + ":" + "</b>";
    errorLi.innerHTML += text;

    document.getElementById("basicResponseDiv").appendChild(errorLi);
}

