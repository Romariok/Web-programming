let x, y, r;


document.getElementById("submit").onclick = function () {
   if (validateR && validateX && validateY) {
      fetch("script.php", {
         method: "GET",
         headers: { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },
      }).then(response => response.text()).then(function (serverAnswer) {
         setPointer();
         document.getElementById("outputContainer").innerHTML = serverAnswer;
      }).catch(err => createNotification("Ошибка HTTP. Повторите попытку позже." + err));
   }

};




function validateR() {
   if (isNumeric(r)) return true;
   else {
      createNotification("r не выбран");
      return false;
   }
}

function validateY() {
   y = document.querySelector("input[name=textY]").value.replace(",", ".");
   if (y == undefined) {
      createNotification("Y не введён");
      return false;
   }
   else if ((!isNumeric(y))) {
      createNotification("Y - не число ");
      return false;
   }
   else if (!(y >= -3 && y <= 3)) {
      createNotification("Y - не входит в диапозон");
      return false;
   }
   else return true;
}

function validateX() {
   try {
      var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
      if (checkboxes.length > 1) {
         createNotification("Выберите только одно значение");
         return false;
      }
      else {
         x = checkboxes[0];
         return true;
      }
   }
   catch (err) {
      createNotification("X не выбрано");
   }

}

function isNumeric(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
}

function setPointer() {
   let pointer = document.getElementById("pointer");
   pointer.style.visibility = "visible";
   pointer.setAttribute("cx", x * 54 + 150); // 1:54 - масштаб, +150 позволяет вести отсёт от 0,0
   pointer.setAttribute("cy", y * 54 + 150);
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