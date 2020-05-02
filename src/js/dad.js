let mouseX = null;
let mouseY = null;
let mouseDown = false;

let offsetX = null;
let offsetY = null;

let moving_element = null;

let element_down = false;
let element_up = false;

let blockBellow = null;

// MOUSE DOWN
document.addEventListener("mousedown", function(e) {   
    if(e.target.classList.contains("dad_block")) {
        // activate the mouseDown state
        mouseDown = true;
        
        // when a ded_block is pressed, we add a "moving" class to it
        e.target.classList.add("moving");
    
        // saving the current moving element in a variable for later
        moving_element = e.target;
    
        // for getting the mouse position relative to the clicked div
        // used for div movement when the mouse is down
        let rect = e.target.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        moving_element.style.position = "absolute";
        moving_element.style.left = e.clientX - offsetX + "px";
        moving_element.style.top = e.clientY - offsetY + "px";
    }
});

// MOUSE MOVE
document.addEventListener("mousemove", function(e) {

    if(mouseDown == true) {
        // changing dragged block style to make it follow the mouse
        
        moving_element.style.left = e.clientX - offsetX + "px";
        moving_element.style.top = e.clientY - offsetY + "px";
        
        // checking the div under the dragged block
        moving_element.hidden = true;
        divBellow = document.elementFromPoint(event.clientX, event.clientY).closest(".dad_block_container");
        blockBellow = document.elementFromPoint(event.clientX, event.clientY).closest(".dad_block");
        moving_element.hidden = false;

        //////////////////

        if(blockBellow != null) {
            rect = blockBellow.getBoundingClientRect();
        
            if(rect.top + (rect.height / 2) > e.clientY && blockBellow.classList.contains("dad_block")) {
                element_up = true;
                element_down = false;

            } else {
                element_down = true;
                element_up = false;
            }
        }
    }
});


// MOUSE UP
document.addEventListener("mouseup", function(e) {
    mouseDown = false;
    moving_element.classList.remove("moving");
    
    try {
        // if the block is dropped in container, we move this block to the new container

        if(blockBellow != null) {
            if(element_up) {
                let element = document.createElement("div");
                element.classList.add("dad_block");
                element.innerHTML = moving_element.innerHTML;
        
                blockBellow.parentNode.insertBefore(element, blockBellow); 
            } else if(element_down) {
                let element = document.createElement("div");
                element.classList.add("dad_block");
                element.innerHTML = moving_element.innerHTML;
        
                blockBellow.parentNode.insertBefore(element, blockBellow.nextSibling); 
            }
        }

        else if(divBellow.classList.contains("dad_block_container")) {
            let element = document.createElement("div");
            element.classList.add("dad_block");
            element.innerHTML = moving_element.innerHTML;
    
            divBellow.appendChild(element); 
        }

    } catch (error) {
 
    }
    
    moving_element.remove();
    moving_element = null;
    divBellow = null;
});