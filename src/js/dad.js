let mouseX = null;
let mouseY = null;
let mouseDown = false;

let offsetX = null;
let offsetY = null;

let moving_element = null;

let element_down = false;
let element_up = false;

let blockBellow = null;

let placeholder = document.createElement("div");
placeholder.classList.add("placeholder");
placeholder.classList.add("dad_block");

function dadBlock() {
    let element = document.createElement("div");
    element.classList.add("dad_block");
    element.innerHTML = moving_element.innerHTML;

    return element;
}

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

        placeholder.innerHTML = moving_element.innerHTML;

        moving_element.parentNode.insertBefore(placeholder, moving_element);
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

        if(divBellow.children[0] == undefined || divBellow.children[0].classList.contains("moving")) {
            let element = dadBlock();

            divBellow.appendChild(placeholder);
        }
    
        if(blockBellow != null) {
            rect = blockBellow.getBoundingClientRect();

            placeholder.innerHTML = moving_element.innerHTML;
        
            if(rect.top + (rect.height / 2) > e.clientY && blockBellow.classList.contains("dad_block")) {
                element_up = true;
                element_down = false;

            } else {
                element_down = true;
                element_up = false;
            }

            if(element_up) {
                blockBellow.parentNode.insertBefore(placeholder, blockBellow); 

            } else if(element_down) {
                blockBellow.parentNode.insertBefore(placeholder, blockBellow.nextSibling); 
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
                let element = dadBlock();
        
                blockBellow.parentNode.insertBefore(element, blockBellow); 
            } else if(element_down) {
                let element = dadBlock();
        
                blockBellow.parentNode.insertBefore(element, blockBellow.nextSibling); 
            }
        }

        else if(divBellow.classList.contains("dad_block_container")) {
            let element = dadBlock();
    
            divBellow.appendChild(element); 
        }

    } catch (error) {
        // if the block is not dropped in a container, it goes back in it's previous position
        let element = dadBlock();

        placeholder.parentNode.insertBefore(element, placeholder);
    }
    
    moving_element.remove();
    placeholder.remove();
    moving_element = null;
    divBellow = null;
});