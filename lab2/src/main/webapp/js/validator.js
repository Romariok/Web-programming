let r, x ,y;



let graph_values = document.getElementsByClassName("graph_value");


const buttons = document.querySelectorAll('.button-X');
buttons.forEach((g) => {
   g.addEventListener("click", (e) => {
      let element = e.target;
      x = `${element.innerText}`;
   });
});


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


function formatParams(params) {
   return (
      "?" +
      Object.keys(params)
         .map(function (key) {
            return key + "=" + encodeURIComponent(params[key]);
         })
         .join("&")
   );
}



const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
   checkbox.addEventListener('click', () => {
      r = `${checkbox.value}`;
      for (let index = 0; index < graph_values.length; index++) {
         graph_values[index].textContent =r;
      }
      checkboxes.forEach((cb) => {
         if (cb !== checkbox) {
            cb.checked = false;
         }
      });
   });
});














function validateR() {
   if ((!isNumeric(r))) {
      createNotification("R - не число ");
      return false;
   }
   else if (!((r >= 1) && (r <= 5))) {
      createNotification("R - не входит в диапозон");
      return false;
   }
   else {
      return true;
   }
}

function validateY() {
   y = document.querySelector(".textY").value.replace(",", ".");
   if (y === undefined) {
      createNotification("Y не введён");
      return false;
   }
   else if ((!isNumeric(y))) {
      createNotification("Y - не число ");
      return false;
   }
   else if (!((y >= -5) && (y <= 5))) {
      createNotification("Y - не входит в диапозон");
      return false;
   }
   else {
      return true;
   }
}

function validateX() {
   if ((!isNumeric(x))) {
      createNotification("X - не число ");
      return false;
   }
   else if (!((x >= -4) && (x <= 4))) {
      createNotification("X - не входит в диапозон");
      return false;
   }
   else {
      return true;
   }

}




function isNumeric(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
}


document.getElementById("clearButton").onclick = function (){
   let params = {
      clear: "true"
   };
   fetch("app"+formatParams(params), {
      method:"get",
      headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
   }).then(response => response.text()).then(function (serverAnswer) {
      document.getElementById("main__table-block").innerHTML = serverAnswer;
      createNotification("Таблица очищена");
      points=``;
   }).catch(err => createNotification(`Ошибка HTTP ${err.textContent}. Повторите попытку позже.`));
};
document.getElementById("submitButton").onclick = function () {
   if (validateX() && validateY() && validateR()) sendRequest("button");
};

function sendRequest(key) {
   const keys = ["button", "svg"];
   if (keys.includes(key)) {
      let params = {
         x: x,
         y: y,
         r: r,
         key: key
      };
      fetch("app"+formatParams(params), {
         method:"get",
         headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"}
      }).then(response => response.text()).then(function (serverAnswer) {
         document.getElementById("main__table-block").innerHTML = serverAnswer;
         setPointer(params["x"], params["y"])
         createNotification("Результат обработан")
      }).catch(err => createNotification(`Ошибка HTTP ${err.textContent}. Повторите попытку позже.`));
   } else throw new Error("Не указан ключ отправки");
}






// const clearBtn = document.querySelector('.reset_button[type="reset"]');
// clearBtn.addEventListener("click", (e) => {
//    e.preventDefault();
//
//    let xhr = new XMLHttpRequest();
//    xhr.onloadend = () => {
//       if (xhr.status === 200) {
//          tbody.innerHTML = "";
//          localStorage.removeItem('data');
//          createNotification("Таблица очищена");
//       } else console.log("status: ", xhr.status);
//    };
//    xhr.open("POST", "php/clear.php");
//    xhr.send();
// });






// var getUrlParameter = function getUrlParameter(sParam) {
//    var sPageURL = window.location.search.substring(1),
//       sURLVariables = sPageURL.split('&'),
//       sParameterName,
//       i;
//    for (i = 0; i < sURLVariables.length; i++) {
//       sParameterName = sURLVariables[i].split('=');
//       if (sParameterName[0] === sParam) {
//          return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
//       }
//    }
//    return false;
// };

