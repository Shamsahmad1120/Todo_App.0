console.log("welcome to our Todo App");


let todos =[];

let todoDataList = document.getElementById("todo-data-list");
let saveButton = document.getElementById("save-todo");
let todoInputbar = document.getElementById("todo-input-bar");
let getPendingTodosButton = document.getElementById("get-todos");

getPendingTodosButton.addEventListener("click", ()=>{
    todos = todos.filter((todo) =>  todo.status != "Finished");
     reRenderTodos();

})



// This function is to handle the disabled and enabling of the save button depending
// on the lenght of text in the to-do-text bar

todoInputbar.addEventListener("keyup" ,function togglesavebutton(){
    let todotext = todoInputbar.value;
    if(todotext.length == 0 ){
        if(saveButton.classList.contains("disabled"))  return;
        saveButton.classList.add("disabled"); 
        // ths attributes sees the name of class is present or not
    }
    else if(saveButton.classList.contains("disabled")){
        saveButton.classList.remove("disabled");
    }
});





// this function is to add the new to when clicked on save button 
saveButton.addEventListener("click", function getTextAndTodo(){
   let todotext = todoInputbar.value;
   if(todotext.length ==0) return;
   let todo = {text: todotext, status :'In Progress', finishButtonText : 'Finish'};
   todos.push(todo);
   addTodo(todo, todos.length);
   todoInputbar.value = '';
});

todoInputbar.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        // Only trigger if not disabled
        if (!saveButton.classList.contains("disabled")) {
            saveButton.click();
        }
    }
});



function reRenderTodos(){
    todoDataList.innerHTML= '';
    todos.forEach((element , idx)=> {
    addTodo(element , idx+1);
 });
}

function removeTodo(event){
let deleteButtonPressed = event.target;
let indexTobeRemoved = Number(deleteButtonPressed.getAttribute("todo-idx"));
todos.splice(indexTobeRemoved , 1);
reRenderTodos();

}

//toggle
function finishTodo(event){
   let finishButtonPressed = event.target;
   let indexToBeFinished = Number( finishButtonPressed.getAttribute("todo-idx"));
   if(todos[indexToBeFinished].status == "Finished"){
    todos[indexToBeFinished].status = "In Progress";
    todos[indexToBeFinished].finishButtonText = "Finish"
   }
   else{
    todos[indexToBeFinished].status = "Finished";
    todos[indexToBeFinished].finishButtonText = "undo";
   }

   todos.sort((a, b) => {
   console.log("inside sort")
   if(a.status == 'Finished'){
      return 1;
   }
   return -1;
   });

    reRenderTodos();

   
}


function editTodo(event){
    let editButtonPressed = event.target;
    let indexTobeEdit = Number(editButtonPressed.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx="${indexTobeEdit}"]`);
    let input = document.querySelector(`input[todo-idx="${indexTobeEdit}"]`);
    detailDiv.style.display = "none";
    input.type="text";
    input.value = detailDiv.textContent;

}  

function saveEditedtodo(event){
    let input = event.target;
    let indexTobeEdit= Number(input.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx="${indexTobeEdit}"]`);
    
    if(event.keyCode == 13){
       detailDiv.textContent = input.value;
       detailDiv.style.display="block";
       input.value='';
       input.type="hidden";
    }
}




function addTodo(todo , todocount){
     console.log("called add todo");
     let rowDiv = document.createElement("div");
     let todoItem = document.createElement("div");
     let todoNumber = document.createElement("div");
     let todoDetail = document.createElement("div");
     let todoStatus = document.createElement("div");
     let todoActions = document.createElement("div");
     let deleteButton = document.createElement("button");
     let finishedButton = document.createElement("button");
     let editButton = document.createElement("button");
     let hiddenInput = document.createElement("input");
     let hr = document.createElement("hr");
    

     // adding classes
     rowDiv.classList.add("row");
     todoItem.classList.add("todo-item","d-flex", "flex-row", "justify-content-between" , "align-items-center")
     todoNumber.classList.add("tod-no");    
     todoDetail.classList.add("todo-details" ,"text-muted");
     todoStatus.classList.add("todo-status" ,"text-muted");
     todoActions.classList.add("todo-actions" , "d-flex", "justify-content-start", "gap-2");
     deleteButton.classList.add("btn" ,"btn-danger", "delete-todo");
     finishedButton.classList.add("btn" , "btn-success", "finish-todo")
     editButton.classList.add("btn", "btn-warning", "edit-todo");
     hiddenInput.classList.add("form-control","todo-details");
    
    // adding attributes
    finishedButton.setAttribute("todo-idx", todocount-1);
    deleteButton.setAttribute("todo-idx", todocount-1); 
    editButton.setAttribute("todo-idx", todocount-1);
    todoDetail.setAttribute("todo-idx", todocount-1);
    hiddenInput.setAttribute("todo-idx", todocount-1);
    hiddenInput.type = "hidden";
   


     //adding click listners
     deleteButton.onclick = removeTodo;
     finishedButton.onclick = finishTodo;
     editButton.onclick = editTodo;
     hiddenInput.addEventListener("keypress", saveEditedtodo);
    


     todoStatus.textContent = todo.status;
     todoNumber.textContent = `${todocount}.`;
     todoDetail.textContent = todo.text;
     deleteButton.textContent = "Delete";
     finishedButton.textContent = todo.finishButtonText;
     editButton.textContent ="Edit";

     // creating the div on dom
     todoActions.appendChild(deleteButton);
     todoActions.appendChild(finishedButton);
     todoActions.appendChild(editButton);

     todoItem.appendChild(todoNumber);
     todoItem.appendChild(todoDetail);
     todoItem.appendChild(hiddenInput);
     todoItem.appendChild(todoStatus);
     todoItem.appendChild(todoActions);

     rowDiv.appendChild(todoItem);
     rowDiv.appendChild(hr);

    todoDataList.appendChild(rowDiv);

}




























// Refrences


// let getTodosbutton = document.getElementById('get-todo');
//  getTodosbutton.addEventListener("click", () =>{
//     console.log("clicked");
//  });

//  // here we are doing is registring the handler

//  getTodosbutton.addEventListener("click", handler) 

//  function handler(){
//     console.log("clicked wow");
//  }
   
//  getTodosbutton.addEventListener("mouseover", ()=>{
//     console.log("the mouse is on the top");
//  });
//  getTodosbutton.addEventListener("mouseout" , ()=>{
//     console.log("mouse is removd");
//  });

//  // shorthand for events

//  getTodosbutton.onclick = () =>{
//     console.log("register the event through on click shorthand")
//  }
 