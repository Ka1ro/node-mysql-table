let deleteBtns = document.querySelectorAll('.b-delete');

let editBtns = document.querySelectorAll('.b-edit');

let form = document.getElementById('add-form');

deleteBtns.forEach(button=>{
  button.addEventListener('click', (act)=>{
    console.log(button.id);
    fetch('/btn-delete', {method: 'POST', body: button.id}).then(data=>{
      if(data.redirected){
        location.reload();
      }
    })
  })
});

editBtns.forEach(button=>{
  button.addEventListener('click', (act)=>{
    // fetch('/btn-edit', {method: 'POST', body: button.id}).then(resp=>resp.json()).then(data=>console.log(data));
    console.log("Action is not active now");
  })
});

form.addEventListener('submit', (event)=>{
  event.preventDefault();
  const formData = new FormData(form);
  const data = {
    "name": formData.get('name'),
    "model":formData.get('model'),
    "available": formData.get('available'),
    "year": formData.get('year'),
    "price": formData.get('price')
  };
  fetch('/btn-add-product', {
    method:"POST",
    body: JSON.stringify(data)
    }).then(data=>{
      if(data.redirected)
        {
          location.reload();
        }
    })
});