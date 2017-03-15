
function Application() {

    this.inputFocus = function(inputElem) {

        var parentDiv = inputElem.parentElement

        formDivError(parentDiv, false);
    }

    this.sendRequest = function() {

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

    function formDivError(formDiv, errorEnable)
    {
        var errorClass = " has-error";
        var hasErrorMark = formDiv.className.indexOf(errorClass) > -1;

        if (errorEnable == hasErrorMark) return;

        if (errorEnable)
        {
            formDiv.className += errorClass;
        }
        else
        {
            formDiv.className = formDiv.className.replace(errorClass, "");
        }
    }

    function highlightFormElemByType(type)
    {
        var inputElemID = type + "TextInput";
        var parentDiv = document.getElementById(inputElemID).parentElement;
        formDivError(parentDiv, true);
    }

    function getRequestVars(){
        return  {
            first_name: document.getElementById("first_nameTextInput").value,
            last_name: document.getElementById("last_nameTextInput").value,
            email: document.getElementById("emailTextInput").value,
            password: document.getElementById("passwordTextInput").value
        };
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
        errorLi.innerHTML = "<i class='glyphicon glyphicon-remove right-margin'></i>";
        errorLi.innerHTML += "<b class='right-margin'>" + type.replace("_"," ") + ":" + "</b>";
        errorLi.innerHTML += text;

        document.getElementById("basicResponseDiv").appendChild(errorLi);
    }
}

var application = new Application();

function inputFocus(inputElem) {
    application.inputFocus(inputElem);
}

function sendRequest() {
    application.sendRequest();
}