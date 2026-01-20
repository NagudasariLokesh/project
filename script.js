fetch("menu.json")
  .then(response => response.json())
  .then(data => {
    const categoriesDiv = document.getElementById("categories");
    data.categories.forEach(category => {
      const button = document.createElement("button");
      button.textContent = category.name;
      button.onclick = () => showCategory(category);
      categoriesDiv.appendChild(button);
    });
  })
  .catch(error => {
    console.error("Error loading menu.json:", error);
  });


function showCategory(category) {
  const menuDiv = document.getElementById("menu");

  menuDiv.innerHTML = `
    <button onclick="goBack()" style="margin-bottom:15px;">⬅ Back</button>
    <h2>${category.name}</h2>
  `;

  if (category.sections) {
    category.sections.forEach(section => {
      menuDiv.innerHTML += `<div class="section"><h3>${section.title}</h3></div>`;

      section.items.forEach(item => {
        let priceText = "";

        if (item.milk !== undefined && item.thick !== undefined) {
          priceText = `Milk ₹${item.milk} | Thick ₹${item.thick}`;
        }
        else if (item.mini !== undefined && item.family !== undefined) {
          priceText = `Mini ₹${item.mini} | Family ₹${item.family}`;
        }
        else if (item.price !== undefined) {
          priceText = `₹${item.price}`;
        }

        menuDiv.innerHTML += `
          <div class="item">
            <span>${item.name}</span>
            <span>${priceText}</span>
          </div>
        `;
      });
    });
  }

  else if (category.items) {
    category.items.forEach(item => {
      let priceText = "";

      if (item.half !== undefined) {
        priceText = `½ KG ₹${item.half}`;
      }
      else if (item.price !== undefined) {
        priceText = `₹${item.price}`;
      }

      menuDiv.innerHTML += `
        <div class="item">
          <span>${item.name}</span>
          <span>${priceText}</span>
        </div>
      `;
    });
  }
}


function goBack() {
  document.getElementById("menu").innerHTML = "";
}
