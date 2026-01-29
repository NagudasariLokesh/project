let menuData;

fetch("menu.json")
  .then(r => r.json())
  .then(d => {
    menuData = d;
    loadCategories();
  });

function loadCategories(){
  const c = document.getElementById("categories");
  c.innerHTML = "";
  c.style.display = "flex";

  menuData.categories.forEach(cat=>{
    const b = document.createElement("button");
    b.textContent = cat.name;
    b.onclick = ()=>openCategory(cat);
    c.appendChild(b);
  });
}

function openCategory(cat){
  document.getElementById("categories").style.display="none";
  document.getElementById("searchInput").value="";

  const m = document.getElementById("menu");
  m.innerHTML = `
    <button onclick="goBack()" style="margin-bottom:14px;border:none;padding:10px 18px;border-radius:20px;">← Back</button>
    <h2>${cat.name}</h2>
  `;

  if(cat.sections){
    cat.sections.forEach(sec=>{
      m.innerHTML += `<h3>${sec.title}</h3>`;
      addPriceHeader(m, sec.items[0]);
      sec.items.forEach(i=>m.innerHTML+=renderItem(i));
    });
  }else{
    addPriceHeader(m, cat.items[0]);
    cat.items.forEach(i=>m.innerHTML+=renderItem(i));
  }
}

function addPriceHeader(m,item){
  let a,b;
  if(item.milk!==undefined){a="Milk";b="Thick";}
  else if(item.half!==undefined){a="½ KG";b="1 KG";}
  else if(item.mini!==undefined){a="Mini";b="Family";}
  else return;

  m.innerHTML+=`
    <div class="price-header">
      <div class="left"></div>
      <div class="right">
        <span>${a}</span>
        <span>${b}</span>
      </div>
    </div>
  `;
}

function renderItem(i){
  let p="";
  if(i.milk!==undefined)p=`<span>₹${i.milk}</span><span>₹${i.thick}</span>`;
  else if(i.half!==undefined)p=`<span>₹${i.half}</span><span>₹${i.one}</span>`;
  else if(i.mini!==undefined)p=`<span>₹${i.mini}</span><span>₹${i.family}</span>`;
  else p=`<span>₹${i.price}</span>`;

  return `
    <div class="item">
      <span class="name">${i.name}</span>
      <span class="prices">${p}</span>
    </div>
  `;
}

function searchMenu(){
  const q=document.getElementById("searchInput").value.toLowerCase();
  const m=document.getElementById("menu");
  const c=document.getElementById("categories");

  if(!q){
    m.innerHTML="";
    c.style.display="flex";
    return;
  }

  c.style.display="none";
  m.innerHTML="<h2>Search Results</h2>";

  menuData.categories.forEach(cat=>{
    const items=cat.sections?cat.sections.flatMap(s=>s.items):cat.items;
    const f=items.filter(i=>i.name.toLowerCase().includes(q));
    if(f.length){
      addPriceHeader(m,f[0]);
      f.forEach(i=>m.innerHTML+=renderItem(i));
    }
  });
}

function goBack(){
  document.getElementById("menu").innerHTML="";
  document.getElementById("categories").style.display="flex";
}
