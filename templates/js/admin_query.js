
let deleteBtns = document.querySelectorAll('.b-delete');

let editBtns = document.querySelectorAll('.b-edit');

deleteBtns.forEach(button=>{
  button.addEventListener('click', (act)=>{
    console.log(button.id);
    fetch('/btn-delete', {method: 'POST', body: button.id})
  })
});

editBtns.forEach(button=>{
  button.addEventListener('click', (act)=>{
    // fetch('/btn-delete', {method: 'POST', body: button.id})
    console.log("Action is unactive now");
  })
});
// console.log(button);