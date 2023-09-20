const sortByName = document.getElementById('byName')
const mainContainer = document.getElementsByClassName('main__container')[0]
const sortByPrice = document.getElementById('byPrice')
const search = document.getElementById('name')
const closeBtn = document.getElementsByClassName('close-btn')
let searchValue;

let jsonData;
search.addEventListener('input',(e)=>{
  searchByName(e.target.value)
})
function searchByName(value){
  searchValue = value
  const searchData = jsonData.filter((item) => {
    return item.name.toLowerCase().includes(value.toLowerCase());
  });
  displayData(searchData)
}

function handleDelete(event){
  let temp = event.view.document.activeElement.id;
  if(temp == 'byPrice'){
    sortByPrice.remove()
  }else{
    sortByName.remove()
  }
}
for(let i = 0 ; i < closeBtn.length ; i++){
  closeBtn[i].addEventListener('click',handleDelete)
}
sortByPrice.addEventListener('click',()=>{
  jsonData.sort((a,b)=>{
    return a.price - b.price
  })
  displayData(jsonData)
})

sortByName.addEventListener('click',()=>{
  console.log(jsonData);
  jsonData.sort((a,b)=>{
    return a.name.localeCompare(b.name)
  })
  displayData(jsonData)
})


function displayData(data_json){
  console.log(data_json);  
    for(let i = 0 ; i < data_json.length ;i++){
      const existingDiv = mainContainer.querySelector(`#item-${i}`)
      if(existingDiv){
        existingDiv.innerHTML = `<img src=${data_json[i].image_url} alt=${data_json[i].name} />
        <div class="flex__items">
          <h1>Name: ${data_json[i].name}</h1>
          <p>${data_json[i].description}</p>
          <h4>Price:<span id="price">${data_json[i].price}</span></h4>  
        </div>`        
        console.log(data_json[i].image_url);
      }else{
        console.log(data_json[i]);    
        const newDiv = document.createElement('div')
        newDiv.setAttribute('id',`item-${i}`)
        newDiv.classList.add('flex__container')
        mainContainer.appendChild(newDiv)
        newDiv.innerHTML = `<img src=${data_json[i].image_url} alt=${data_json[i].name} />
        <div class="flex__items">
          <h1>Name: ${data_json[i].name}</h1>
          <p>${data_json[i].description}</p>
          <h4>Price:<span id="price">${data_json[i].price}</span></h4>  
        </div>`
        console.log(existingDiv);
      }  
  }

}
    

document.addEventListener('DOMContentLoaded',async()=>{
  const response  = await fetch('https://raw.githubusercontent.com/CynthiaEstherMetilda/Xhrdemo/main/products.json');
  const data = await response.json();
  console.log(data);
  jsonData = data;
  displayData(jsonData)    
})
