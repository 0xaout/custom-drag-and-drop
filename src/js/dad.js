let is_mouse_down = false;

let element_offset_x = null;
let element_offset_y = null;

let moving_element = null;

let is_element_lower_side = false;
let is_element_upper_side = false;

let dad_block_bellow = null;

let placeholder = document.createElement("div");
placeholder.classList.add("placeholder");
placeholder.classList.add("dad_block");

function dadBlock() {
    let block = document.createElement("div");
    block.classList.add("dad_block");
    block.innerHTML = moving_element.innerHTML;

    return block;
}

// MOUSE DOWN
document.addEventListener("mousedown", function(e) {   
    if(e.target.classList.contains("dad_block")) {
        // activate the is_mouse_down state
        is_mouse_down = true;
        
        // when a ded_block is pressed, we add a "moving" class to it
        e.target.classList.add("moving");
    
        // saving the current moving element in a variable for later
        moving_element = e.target;
    
        // for getting the mouse position relative to the clicked div
        // used for div movement when the mouse is down
        let rect = e.target.getBoundingClientRect();
        element_offset_x = e.clientX - rect.left;
        element_offset_y = e.clientY - rect.top;

        placeholder.innerHTML = moving_element.innerHTML;

        moving_element.parentNode.insertBefore(placeholder, moving_element);
        moving_element.style.position = "absolute";
        moving_element.style.left = e.clientX - element_offset_x + "px";
        moving_element.style.top = e.clientY - element_offset_y + "px";
    }
});

// MOUSE MOVE
document.addEventListener("mousemove", function(e) {
    if(is_mouse_down == true) {
        // changing dragged block style to make it follow the mouse
        moving_element.style.left = e.clientX - element_offset_x + "px";
        moving_element.style.top = e.clientY - element_offset_y + "px";
        
        // checking the div under the dragged block
        moving_element.hidden = true;
        
        dad_container_bellow = document.elementFromPoint(event.clientX, event.clientY).closest(".dad_block_container");
        dad_block_bellow = document.elementFromPoint(event.clientX, event.clientY).closest(".dad_block");
        moving_element.hidden = false;

        if(dad_container_bellow.children[0] == undefined || dad_container_bellow.children[0].classList.contains("moving") && dad_container_bellow.children[1] == undefined) {
            let block = dadBlock();

            dad_container_bellow.appendChild(placeholder);
        }

    
        if(dad_block_bellow != null) {
            rect = dad_block_bellow.getBoundingClientRect();

            placeholder.innerHTML = moving_element.innerHTML;
        
            if(rect.top + (rect.height / 2) > e.clientY && dad_block_bellow.classList.contains("dad_block")) {
                is_element_upper_side = true;
                is_element_lower_side = false;

            } else {
                is_element_lower_side = true;
                is_element_upper_side = false;
            }

            if(is_element_upper_side) {
                dad_block_bellow.parentNode.insertBefore(placeholder, dad_block_bellow); 

            } else if(is_element_lower_side) {
                dad_block_bellow.parentNode.insertBefore(placeholder, dad_block_bellow.nextSibling); 
            } 
        }
    }
});


// MOUSE UP
document.addEventListener("mouseup", function(e) {
    is_mouse_down = false;
    moving_element.classList.remove("moving");
    
    try {
        // if the block is dropped in container, we move this block to the new container

        if(dad_block_bellow != null) {
            if(is_element_upper_side) {
                let block = dadBlock();
        
                dad_block_bellow.parentNode.insertBefore(block, dad_block_bellow); 
            } else if(is_element_lower_side) {
                let block = dadBlock();
        
                dad_block_bellow.parentNode.insertBefore(block, dad_block_bellow.nextSibling); 
            }
        }

        else if(dad_container_bellow.classList.contains("dad_block_container")) {
            let block = dadBlock();
    
            dad_container_bellow.appendChild(block); 
        }

    } catch (error) {
        // if the block is not dropped in a container, it goes back in it's previous position
        let block = dadBlock();

        placeholder.parentNode.insertBefore(block, placeholder);
    }
    
    moving_element.remove();
    placeholder.remove();
    moving_element = null;
    dad_container_bellow = null;
});