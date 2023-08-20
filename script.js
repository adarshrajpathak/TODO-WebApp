//Data
// task={};
let tasks=[{
    text:'Demo Task',
    id:1,
    done:false
},
{
    text:'Demo HomeWork',
    id:2,
    done:true
}];
const taskList=document.getElementById('taskList');
const addTaskInput=document.getElementById('taskInput');
const counter=document.getElementById('counter');
const addButton=document.getElementById('button-addon2');

//functions
function addItem(task){
    if(task){
        tasks.push(task); //add the task to the array
        renderList();       //calling th renderList function
        showNotification("Task added successfully");
        return;
    }
    showNotification("Error in adding task");
}

function deleteItem(taskId){
    const newTasks=tasks.filter((task)=>{
        return task.id!=taskId;
    })
    tasks=newTasks;
    renderList();
    showNotification("Element Deleted successfully");
}

function checkItem(taskId){
    let tag=false;
    tasks.forEach((task)=>{
        if(task.id==taskId){
            // task.done=true;
            task.done=!task.done;
            if(task.done==true){
                tag=true;
            }
        }
    })
    renderList();
    if(tag){    
        showNotification("Completed the Task");
    }else{
        showNotification("Task not Completed!!")
    }
}

function showNotification(msg){
    // alert(msg);     //showing the alert
    //to show the pop-up 
    
    //to show the toast
    showToast(msg);
}
function addTasksToDOM(task,i){
    const ele=document.createElement('li');
    ele.classList.add('input-group');
    ele.classList.add('mb-3');
    ele.innerHTML= `
    <div class="input-group-text">
    <input id="${task.id}" class="form-check-input mt-0 checkbx" type="checkbox" value="" aria-label="Checkbox for following text input" ${task.done ? 'checked' : ''} data-id=${task.id}>
  </div>
  <div class="form-control alignment2 task-field bodyCheck" data-id="${task.id}"><span>${i+1}</span>.&nbsp;<span class="task-text" data-id=${task.id}>${task.text}</span><img class="trash trashIcon" alt="trash" src="res/trash-can-regular.svg" data-id=${task.id}></div>
    `;
    taskList.append(ele);
    lineCut();
}
function renderList(){
    console.log(tasks);
    taskList.innerHTML='';
    for(let i=0;i<tasks.length;i++){
        addTasksToDOM(tasks[i],i);
    }
    if(tasks.length==1 || tasks.length==2){
        if(tasks[0].id==1 || tasks[0].id==2){return;}
    }
    counter.innerHTML=tasks.length;
    lineCut();
}
//function for the two event listeners
function addTask(){
    if(counter.innerHTML==0){
        tasks=[];
    }
    // const text=e.target.value;
    const text=addTaskInput.value;

    if(!text){
        showNotification("Task can't be empty !!");
        return;
    }
    const task={
        text:text,  //taskItem(i.e, what is task)
        id:Date.now().toString(),   //using time-stamp for unique id
        done:false      //bolean checkbox
    }
    // e.target.value="";  //making the input box empty
    addTaskInput.value="";  //making the input box empty
    addItem(task);  //adding task to the array
}
//contained in the initializedEvent()
// //adding the Item through Enter key
// addTaskInput.addEventListener('keypress',(e)=>{
//     if(e.key=='Enter'){
//         addTask();
//     }
// })
// //adding the Item through click on Add button
// addButton.addEventListener('click',addTask);

//for the toast
function showToast(msg){
    var toastBox=document.getElementById('toastBox');
    var Toast= document.createElement('div');    //creating  a div element
    Toast.classList.add('Toast');    //adding a class to the div element
    if(msg.includes('Error') || msg.includes("can't")){
        Toast.classList.add('red');
        Toast.innerHTML='<i class="fa-solid fa-circle-xmark"></i>'+msg;
    }else if(msg.includes('Deleted')){
        Toast.classList.add('red');
        Toast.innerHTML='<i class="fa-solid fa-circle-check" style="color: #e01b24;"></i>'+msg;
    }else if(msg.includes('empty') || msg.includes('not')){
        Toast.classList.add('orange');
        Toast.innerHTML='<i class="fa-solid fa-circle-exclamation"></i>'+msg;
    }else{
        Toast.innerHTML='<i class="fa-solid fa-circle-check"></i>'+msg; 
    }
    toastBox.appendChild(Toast);    //appending the div element to the toastBox
    setTimeout(function(){
     Toast.remove();},3000);   //removing the toast after 5 seconds from the DOM
}
//line-through text
// setInterval(()=>{
function lineCut(){
const checkbxs = document.querySelectorAll('.checkbx');
const taskTexts=document.querySelectorAll('.task-text')
checkbxs.forEach((checkbox, index) => {
    // checkbox.addEventListener('change', function() {
        if(checkbox.checked){
            taskTexts[index].style.textDecoration = 'line-through';
        }else{
            taskTexts[index].style.textDecoration='none';
        }
        // if (this.checked) {
        //     taskTexts[index].style.textDecoration = 'line-through';
        // }else{
        //     taskTexts[index].style.textDecoration='none';
        // }
    // });
});
}
// },10);
//contained in the intializedEvent()
// document.addEventListener('click',function(e){
//     const tar=e.target;
//     console.log(tar);
//     console.log(tar.className);
//     if(tar.classList.contains('trashIcon')){
//         const taskId=tar.dataset.id;
//         console.log(taskId);
//         deleteItem(taskId);
//         return;
//         // console.log("delete");
//     }else if(tar.classList.contains('task-text')){
//         const taskId=tar.dataset.id;
//         checkItem(taskId);
//         return;
//     // }else if(tar.className.includes('bodyCheck')){
//     }else if(tar.classList.contains('bodyCheck')){
//         const taskId=tar.dataset.id;
//         checkItem(taskId);
//         return;
//     }else if(tar.classList.contains('checkbx')){
//         const taskId=tar.dataset.id;
//         checkItem(taskId);
//         return;
//     }
// })
function initializedApp(){
    lineCut();
    renderList();
}
function initializedEvent(){
    //adding the Item through Enter key
    addTaskInput.addEventListener('keypress',(e)=>{
        if(e.key=='Enter'){
            addTask();
        }
    })
    // adding the Item through click on Add button
    addButton.addEventListener('click',addTask);
    //Event Delegation
    document.addEventListener('click',function(e){
        const tar=e.target;
        console.log(tar);
        console.log(tar.className);
        if(tar.classList.contains('trashIcon')){
            const taskId=tar.dataset.id;
            console.log(taskId);
            deleteItem(taskId);
            return;
            // console.log("delete");
        }else if(tar.classList.contains('task-text')){
            const taskId=tar.dataset.id;
            checkItem(taskId);
            return;
        // }else if(tar.className.includes('bodyCheck')){
        }else if(tar.classList.contains('bodyCheck')){
            const taskId=tar.dataset.id;
            checkItem(taskId);
            return;
        }else if(tar.classList.contains('checkbx')){
            const taskId=tar.dataset.id;
            checkItem(taskId);
            return;
        }
    })
}
initializedApp();
initializedEvent();