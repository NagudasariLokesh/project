let menuData = null;

fetch("menu.json")
  .then(res => res.json())
  .then(data => {
    menuData = data;
    const categoriesDiv = document.getElementById("categories");
    categoriesDiv.innerHTML = "";

    data.categories.forEach(category => {
      const btn = document.createElement("button");
      btn.textContent = category.name;
      btn.onclick = () => showCategory(category);
      categoriesDiv.appendChild(btn);
    });
  });

function showCategory(category) {
  const menu = document.getElementById("menu");
  document.getElementById("searchInput").value = "";

  menu.innerHTML = `
    <button onclick="goBack()" style="margin-bottom:15px;border:none;padding:10px 18px;border-radius:20px;cursor:pointer;">⬅ Back</button>
    <h2>${category.name}</h2>
  `;

  if (category.sections) {
    category.sections.forEach(section => {
      menu.innerHTML += `<h3>${section.title}</h3>`;
      section.items.forEach(item => {
        menu.innerHTML += renderItem(item);
      });
    });
  } else {
    category.items.forEach(item => {
      menu.innerHTML += renderItem(item);
    });
  }
}

function renderItem(item) {
  let price = "";

  if (item.milk !== undefined && item.thick !== undefined) {
    price = `Milk ₹${item.milk} | Thick ₹${item.thick}`;
  } else if (item.mini !== undefined && item.family !== undefined) {
    price = `Mini ₹${item.mini} | Family ₹${item.family}`;
  } else if (item.half !== undefined && item.one !== undefined) {
    price = `½ KG ₹${item.half} | 1 KG ₹${item.one}`;
  } else if (item.price !== undefined) {
    price = `₹${item.price}`;
  }

  return `
    <div class="item">
      <span>${item.name}</span>
      <span>${price}</span>
    </div>
  `;
}

function searchMenu() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const menu = document.getElementById("menu");

  if (!query) {
    menu.innerHTML = "";
    return;
  }

  menu.innerHTML = `<h2>Search Results</h2>`;

  menuData.categories.forEach(category => {
    if (category.sections) {
      category.sections.forEach(section => {
        section.items.forEach(item => {
          if (item.name.toLowerCase().includes(query)) {
            menu.innerHTML += renderItem(item);
          }
        });
      });
    } else {
      category.items.forEach(item => {
        if (item.name.toLowerCase().includes(query)) {
          menu.innerHTML += renderItem(item);
        }
      });
    }
  });
}

function goBack() {
  document.getElementById("menu").innerHTML = "";
  document.getElementById("searchInput").value = "";
}
