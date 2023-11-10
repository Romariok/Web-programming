let r, x, y;
let xValid = false, yValid = false, rValid = false;

let graph_values = document.querySelectorAll(".graph_value");


document.addEventListener("DOMContentLoaded", () => {
    let buttons = document.querySelectorAll("input[type=button]");
    buttons.forEach(click);

    function click(element) {
        element.onclick = function () {
            x = this.value;
            buttons.forEach(function (element) {
                element.style.boxShadow = null;
                element.style.backgroundColor = null;
                element.style.color = null;
            });
            this.style.boxShadow = "0 0 20px 5px #999BA9";
            this.style.backgroundColor = "#9CAFA4";
        }
    }
});
function reactToChangeRRadio(param) {
    r = param;
    let pointer = document.getElementById("pointer");
    pointer.style.visibility = "hidden";
    for (let index = 0; index < graph_values.length; index++) {
        graph_values[index].textContent = r;
    }
}

const submitBtn = document.getElementById('form:submitButton');
document.getElementById("submitButton").onclick = function () {
    if (validateY() && validateR() && validateX()) {
        setPointer(x, y);
    }
};


function updateCheckboxes(clickedCheckbox, value) {
    x = value;
    var checkboxes = document.querySelectorAll('.checkboxes input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] !== clickedCheckbox) {
            checkboxes[i].checked = false;
        }
    }
}



function validateR() {
    if ((!isNumeric(r))) {
        createNotification("R - не число ");
        return false;
    } else if (!((r >= 1) && (r <= 3))) {
        createNotification("R - не входит в диапозон");
        return false;
    } else {
        return true;
    }
}

function validateY() {
    y = document.querySelector(".textY").value.replace(",", ".");
    if (y === undefined) {
        createNotification("Y не введён");
        return false;
    } else if ((!isNumeric(y))) {
        createNotification("Y - не число ");
        return false;
    } else if (!((y >= -5) && (y <= 3))) {
        createNotification("Y - не входит в диапозон");
        return false;
    } else {
        return true;
    }
}

function validateX() {
    if ((!isNumeric(x))) {
        createNotification("X - не число ");
        return false;
    } else if (!((x >= -4) && (x <= 4))) {
        createNotification("X - не входит в диапозон");
        return false;
    } else {
        return true;
    }

}


function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function createNotification(message) {
    let outputContainer = document.getElementById("outputContainer");
    if (outputContainer.contains(document.querySelector(".notification"))) {
        let stub = document.querySelector(".notification");
        stub.textContent = message;
        stub.classList.replace("outputStub", "errorStub");
    } else {
        let notificationTableRow = document.createElement("h4");
        notificationTableRow.innerHTML = "<span class='notification errorStub'></span>";
        outputContainer.prepend(notificationTableRow);
        let span = document.querySelector(".notification");
        span.textContent = message;
    }
}
