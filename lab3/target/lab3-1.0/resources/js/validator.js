let rValid = false, xValid = false, yValid = false;
let graph_values = document.querySelectorAll(".graph_value");

const submitBtn = document.getElementById('form:submitButton');

function toggleSubmitBtn() {
    submitBtn.disabled = !(xValid && rValid && yValid);
}


document.addEventListener("DOMContentLoaded", () => {
    let buttons = document.querySelectorAll("input[type=button]");
    buttons.forEach(click);

    function click(element) {
        element.onclick = function () {
            buttons.forEach(function (element) {
                element.style.boxShadow = null;
                element.style.backgroundColor = null;
                element.style.color = null;
            });
            this.style.boxShadow = "0 0 20px 5px #999BA9";
            this.style.backgroundColor = "#9CAFA4";
        }
    }

    toggleSubmitBtn();
});


let xInput = document.getElementById("form:X");
const checkboxes = document.querySelectorAll('.checkboxes input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        xInput.value = `${checkbox.value}`;
        xValid = true;
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== checkbox) {
                checkboxes[i].checked = false;
            }
        }
        toggleSubmitBtn();
    });
});

let rInput;

function reactToChangeRRadio(param) {
    rInput = param;
    rValid = true;
    let pointer = document.getElementById("pointer");
    pointer.style.visibility = "hidden";
    for (let index = 0; index < graph_values.length; index++) {
        graph_values[index].textContent = rInput;
    }
    toggleSubmitBtn();
}


function updateGraph() {
    createNotification("Результат отображён", false)
    setPointer(xInput.value, yInput.value);
}


let yInput = document.getElementById('form:Y');
yInput.addEventListener('input', () => {
    if (yInput.value === undefined) {
        createNotification("Y не введён", true);
        yValid = false;
    } else if ((!isNumeric(yInput.value))) {
        createNotification("Y - не число ", true);
        yValid = false;
    } else if (!((yInput.value >= -5) && (yInput.value <= 3))) {
        createNotification("Y - не входит в диапозон", true);
        yValid = false;
    } else {
        yValid = true;
    }
    toggleSubmitBtn();
})

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function createNotification(message, error) {
    let outputContainer = document.getElementById("outputContainer");

    if (outputContainer.contains(document.querySelector(".notification"))) {
        let stub = document.querySelector(".notification");
        stub.textContent = message;
        if (!error) {
            stub.classList.replace("errorStub", "outputStub");
        } else {
            stub.classList.replace("outputStub", "errorStub");
        }
    } else {
        let notificationTableRow = document.createElement("h4");
        notificationTableRow.innerHTML = "<span class='notification errorStub'></span>";
        outputContainer.prepend(notificationTableRow);
        let span = document.querySelector(".notification");
        span.textContent = message;
    }
}

yInput.value = '';
toggleSubmitBtn()