let svg = document.querySelector("svg");

document.addEventListener("DOMContentLoaded", () => {
    svg.addEventListener("click", (event) => {
        if (validateR()) {
            let position = getMousePosition(svg, event);
            x = position.x;
            y = position.y;
            // let k = 270 / r; //отношение радиуса и плоскости
            x = ((x-150)*r/120).toFixed(3);
            y = ((150-y)*r/120).toFixed(3);
            console.log(x+' '+y);
            submitBtn.onclick(undefined);
            setPointer(x, y);
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
    pointer.setAttribute("cx", (x * 120) / r + 150);
    pointer.setAttribute("cy", 150 - (y * 120) / r);
}
