let svg = document.querySelector("svg");
let graph = false
let xOld, yOld;
document.addEventListener("DOMContentLoaded", () => {
    svg.addEventListener("click", (event) => {
        if (rValid) {
            let position = getMousePosition(svg, event);
            xOld = xInput.value;
            yOld = yInput.value;

            xInput.value = position.x;
            yInput.value = position.y;
            xInput.value = ((xInput.value-150)*rInput/120).toFixed(3);
            yInput.value = ((150-yInput.value)*rInput/120).toFixed(3);
            graph = true;
            submitBtn.onclick(undefined);
        }
    });
});

function getMousePosition(svg, event) {
    let rect = svg.getBoundingClientRect();
    return {
        x: event.clientX - rect.left-15,
        y: event.clientY - rect.top-15
    };
}


function setPointer(x, y) {
    console.log(x + " " + y);
    let pointer = document.getElementById("pointer");
    pointer.style.visibility = "visible";
    pointer.setAttribute("cx", (x * 120) / rInput + 150);
    pointer.setAttribute("cy", 150 - (y * 120) / rInput);
    if(graph){
        xInput.value = xOld;
        yInput.value = yOld;
        graph = false;
    }
}
