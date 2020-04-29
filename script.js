mouseX = null;
mouseY = null;
mouseDown = false;

offsetX = null;
offsetY = null;

moving_element = null;



document.addEventListener("mousedown", function(e) {   
    if(e.target.classList.contains("element")) {
        mouseDown = true;
    
        e.target.classList.add("moving");
    
        moving_element = e.target;
    
    
        let rect = e.target.getBoundingClientRect();
    
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    }
});

document.addEventListener("mousemove", function(e) {
    if(mouseDown == true) {
        console.log("mousedown");

        moving_element.style.position = "absolute";
        moving_element.style.left = e.clientX - offsetX + "px";
        moving_element.style.top = e.clientY - offsetY + "px";
        moving_element.style.zIndex = "-9999";
    }
});



document.addEventListener("mouseup", function(e) {
    mouseDown = false;
    moving_element.classList.remove("moving");

    moving_element.style.zIndex = "9999";

    if(e.target.classList.contains("target_block"))  {

        let new_element = document.createElement("div");
        new_element.innerHTML = moving_element.innerHTML;
        new_element.classList.add("element");
        
        e.target.appendChild(new_element);

        moving_element.remove();
    } 

    else if(e.target.parentNode.classList.contains("target_block")) {
        let new_element = document.createElement("div");
        new_element.innerHTML = moving_element.innerHTML;
        new_element.classList.add("element");
        
        e.target.parentNode.appendChild(new_element);

        moving_element.remove();
    } else {

    }
});


