
//JSON에 있는 파일을 동적으로 받아올 것이다.
function loadItems(){
  return fetch('data/data.json')
  .then(response => response.json())
  .then(json => json.items);
}

function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map(item => createHTMLString(item)).join('');
}

function createHTMLString(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" />
      <span class="">${item.gender}, ${item.size}</span>
    </li>
  `;
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if(key == null || value == null) {
    return;
  }

  const filtered = items.filter(item => item[key] === value);
  displayItems(filtered);
}

function setEventListner(items){
  const logo = document.querySelector('.logo');
  const buttons = document.querySelector(".selector");
  logo.addEventListener('click', () => displayItems(items));
  buttons.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems()
  .then(items => {
    displayItems(items);
    setEventListner(items)
  })
.catch(console.log);
/*
item을 받아와서 promise(비동기)가 성공적으로 return이 되면 전달받은 items를 
displayItems로 아이템들을 보여주고 리스너를 등록해서 버튼을 클릭했을 때 적절하게 필터링을 해줄거에요!

*/