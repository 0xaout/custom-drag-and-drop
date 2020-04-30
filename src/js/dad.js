let mouseX = null;
let mouseY = null;
let mouseDown = false;

let offsetX = null;
let offsetY = null;

let moving_element = null;

let placeholder = null;


let new_element = null;

let element_down = false;
let element_up = false;

let sorting_target = null;


// MOUSE DOWN
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


// MOUSE MOVE
document.addEventListener("mousemove", function(e) {
    if(mouseDown == true) {
        moving_element.style.position = "absolute";
        moving_element.style.left = e.clientX - offsetX + "px";
        moving_element.style.top = e.clientY - offsetY + "px";
        moving_element.style.zIndex = "-9999";


        rect = e.target.getBoundingClientRect();
    
        if(rect.top + (rect.height / 2) > e.clientY && e.target.classList.contains("element")) {
            element_up = true;
            element_down = false;

        } else {
            element_down = true;
            element_up = false;
        }

        sorting_target = e.target;
    }
});


    
// MOUSE OVER
document.addEventListener("mouseover", function(e) {
    

    placeholder = document.createElement("div");
    placeholder.classList.add("element");
    placeholder.classList.add("placeholder");
    placeholder.style.background = "pink";

    if(e.target.classList.contains("element")) {
 
        
    }
   


    if(e.target.classList.contains("target_block") && mouseDown == true) {
        
        //e.target.appendChild(new_element);

    }
});

// MOUSE LEAVE
document.addEventListener("mouseout", function(e) {
  
    //console.log(e.relatedTarget);

    new_element.remove();
});


// MOUSE UP
document.addEventListener("mouseup", function(e) {
    mouseDown = false;
    moving_element.classList.remove("moving");

    moving_element.style.zIndex = "9999";


    if(e.target.classList.contains("target_block")) {
        let new_element = document.createElement("div");
        new_element.innerHTML = moving_element.innerHTML;
        new_element.classList.add("element");

        e.target.appendChild(new_element);
    }

    else if(element_up == true) {
        let new_element = document.createElement("div");
        new_element.innerHTML = moving_element.innerHTML;
        new_element.classList.add("element");

        sorting_target.parentNode.insertBefore(new_element, sorting_target);
    } else if (element_down == true) {
        let new_element = document.createElement("div");
        new_element.innerHTML = moving_element.innerHTML;
        new_element.classList.add("element");

        sorting_target.parentNode.insertBefore(new_element, sorting_target.nextSibling);
    }

   
    
        
    placeholder.classList.remove("placeholder");

    moving_element.remove();
    

    moving_element = null;
    //new_element.remove();
});


