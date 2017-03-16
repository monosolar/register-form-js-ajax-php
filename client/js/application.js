function Application() {

    const successFilePath = "content/success.html";
    const apiPath = "../server/api.php";

    this.inputFocus = function (inputElem) {
        var parentDiv = inputElem.parentElement
        formDivError(parentDiv, false);
    }

    this.sendRequest = function () {

        const varsString = getRequestVars()
            .map(e => `${e.key}=${e.value}`)
            .join("&");

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = onRequestResponsed;
        xmlhttp.open("POST", apiPath, true);
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(varsString);
    }

    this.clearErrorsContainer = function () {
        document.getElementById("basicResponseDiv").innerHTML = "";
    }

    function formDivError(formDiv, errorEnable) {
        const errorClass = "has-error";

        if (formDiv.classList.contains(errorClass)) return;

        if (errorEnable) {
            formDiv.classList.add(errorClass);
        } else {
            formDiv.classList.remove(errorClass);
        }
    }

    function highlightFormElemByType(type) {
        var inputElemID = type + "TextInput";
        var parentDiv = document.getElementById(inputElemID).parentElement;
        formDivError(parentDiv, true);
    }

    function getRequestVars() {
        return [
            {key: "first_name", value: document.getElementById("first_nameTextInput").value},
            {key: "last_name", value: document.getElementById("last_nameTextInput").value},
            {key: "email", value: document.getElementById("emailTextInput").value},
            {key: "password", value: document.getElementById("passwordTextInput").value}
        ];
    }

    function onRequestResponsed(evt) {
        if (this.readyState === 4 && this.status === 200) {

            document.getElementById("basicResponseDiv").innerHTML = "";

            var responseObj = JSON.parse(this.responseText);

            if (responseObj.status === "ok") {
                window.location = successFilePath;
            } else {
                for (type in responseObj.errors) {
                    addErrorToDocument(type, responseObj.errors[type]);
                    highlightFormElemByType(type);
                }
            }

            /*try {



            } catch (err) {
                alert("JSON error");
            }*/
        }
    }

    function addErrorToDocument(type, text) {
        var errorLi = document.createElement('li');
        errorLi.className = "list-group-item list-group-item-danger"
        errorLi.innerHTML = "<i class='glyphicon glyphicon-remove right-margin'></i>";
        errorLi.innerHTML += "<b class='right-margin'>" + type.replace(/_/g, " ") + ":" + "</b>";
        errorLi.innerHTML += text;

        document.getElementById("basicResponseDiv").appendChild(errorLi);


       /* const errorItemToClone = document.getElementById('errorItemToClone');

        const errorItem = errorItemToClone.cloneNode(true);
        errorItem.removeAttribute('id');
        errorItem.classList.remove('hided-error-item');
        errorItem.textContent = text;

        console.log("----->", errorItemToClone, errorItem);

        return;

        errorItem.getElementById('typeField').textContent = type.replace(/_/g, " ") + ":";
        document.getElementById("basicResponseDiv").appendChild(errorItem);*/

    }
}

var application = new Application();

function inputFocus(inputElem) {
    application.inputFocus(inputElem);
}

function onSendButtonClick() {
    application.clearErrorsContainer();
    application.sendRequest();
}
