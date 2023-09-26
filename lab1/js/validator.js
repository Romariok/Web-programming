let r;
let valX = false, valY = false, valR = false;



let graph_values = document.getElementsByClassName("graph_value");




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
      checkboxes.forEach((cb) => {
         if (cb !== checkbox) {
            cb.checked = false;
         }
      });
   });
});

function validateR(rr) {
   if ((!isNumeric(rr))) {
      createNotification("R - не число ");
      valR = false;
      return;
   }
   else if (!((rr >= 0) && (rr <= 5))) {
      createNotification("R - не входит в диапозон");
      valR = false;
      return;
   }
   else {
      valR = true;
      return rr;
   }
}

function validateY(yy) {
   if (yy === undefined) {
      createNotification("Y не введён");
      valY = false;
      return;
   }
   else if ((!isNumeric(yy))) {
      createNotification("Y - не число ");
      valY = false;
      return;
   }
   else if (!((yy >= -3) && (yy <= 3))) {
      createNotification("Y - не входит в диапозон");
      valY = false;
      return;
   }
   else {
      valY = true;
      return yy;
   }
}

function validateX(xx) {
   if ((!isNumeric(xx))) {
      createNotification("X - не число ");
      valX = false;
      return;
   }
   else if (!((xx >= -4) && (xx <= 4))) {
      createNotification("X - не входит в диапозон");
      valX = false;
      return;
   }
   else {
      valX = true;
      return xx;
   }


}




function isNumeric(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
}

function setPointer(x, y, r) {
   let pointer = document.getElementById("pointer");
   pointer.style.visibility = "visible";
   pointer.setAttribute("cx", (x * 120) / r + 150);
   pointer.setAttribute("cy", 150 - (y * 120) / r);
}

function saveData(response) {
   localStorage.setItem('data', response);
}

const tbody = document.querySelector(".main__table tbody");

const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {
   e.preventDefault(); // prevent submitting

   let params = {
      x: validateX(document.querySelector("input[type=checkbox]:checked").value),
      y: validateY(document.querySelector("input[name=textY]").value.replace(",", ".")),
      r: validateR(r),
   };
   if (valR && valX && valY) {
      const target = "php/script.php" + formatParams(params);

      const xhr = new XMLHttpRequest();
      xhr.open("GET", target);

      xhr.onloadend = () => {
         if (xhr.status === 200) {
            tbody.innerHTML = xhr.response;
            saveData(xhr.response);
            setPointer(document.querySelector("input[type=checkbox]:checked").value, document.querySelector("input[name=textY]").value.replace(",", "."), r);
            createNotification("Результат обработаны");
         } else
            console.log(
               "status: ",
               xhr.status,
               "X: ",
               x,
               "Y: ",
               y,
               "R: ",
               r
            );
      };

      xhr.send();
   }

});




const clearBtn = document.querySelector('.reset_button[type="reset"]');
clearBtn.addEventListener("click", (e) => {
   e.preventDefault();

   let xhr = new XMLHttpRequest();
   xhr.onloadend = () => {
      if (xhr.status === 200) {
         tbody.innerHTML = "";
         localStorage.removeItem('data');
         createNotification("Таблица очищена");
      } else console.log("status: ", xhr.status);
   };
   xhr.open("POST", "php/clear.php");
   xhr.send();
});

const buttons = document.querySelectorAll('.button-R');
buttons.forEach((g) => {
   g.addEventListener("click", (e) => {
      let element = e.target;
      r = `${element.innerText}`;
      for (let index = 0; index < graph_values.length; index++) {
         graph_values[index].textContent = r;
      }
   });
});

var getUrlParameter = function getUrlParameter(sParam) {
   var sPageURL = window.location.search.substring(1),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
   for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] === sParam) {
         return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
      }
   }
   return false;
};


window.onload = function () {
   try {
      var savedData = localStorage.getItem('data');

      tbody.innerHTML = savedData;


      if (isNumeric(getUrlParameter('x')) && isNumeric(getUrlParameter('y')) && isNumeric(getUrlParameter('r'))) {
         let params = {
            x: validateX(getUrlParameter('x')),
            y: validateY(getUrlParameter('y')),
            r: validateR(getUrlParameter('r')),
         };
         if (valR && valX && valY) {
            const target = "php/script.php" + formatParams(params);

            const xhr = new XMLHttpRequest();
            xhr.open("GET", target);

            xhr.onloadend = () => {
               if (xhr.status === 200) {
                  tbody.innerHTML = xhr.response;
                  saveData(xhr.response);
                  setPointer(params['x'], params['y'], params['r']);
                  createNotification("Результат обработаны");
               } else
                  console.log(
                     "X: ",
                     params['x'],
                     "Y: ",
                     params['y'],
                     "R: ",
                     params['r']
                  );
            };

            xhr.send();
         }
      }
   }
   catch (err) {
      console.log(
         err,
         "X: ",
         getUrlParameter('x'),
         "Y: ",
         getUrlParameter('y'),
         "R: ",
         getUrlParameter('r')
      );
   }


}