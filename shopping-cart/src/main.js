let shop = document.querySelector("#shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

//creates products section dynamically
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      let { id, name, price, desc, img } = item;
      let searchingItem = basket.find((item) => item.id === id) || [];
      return `<div id=product-id-${id} class="item">
            <img width="220" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})"class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">
                    ${
                      searchingItem.count === undefined
                        ? 0
                        : searchingItem.count
                    }
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
                </div>
            </div>
        </div>
    `;
    })
    .join(""));
};

generateShop();

//increases product count
let increment = (selectedItem) => {
  let id = selectedItem.getAttribute("id");
  let searchingItem = basket.find((item) => item.id === id);
  if (searchingItem === undefined) {
    basket.push({
      id: id,
      count: 1,
    });
  } else {
    searchingItem.count++;
  }
  localStorage.setItem("data", JSON.stringify(basket));
  update(id);
};

//decreases product count
let decrement = (selectedItem) => {
  let id = selectedItem.getAttribute("id");
  let searchingItem = basket.find((item) => item.id === id);
  if (searchingItem !== undefined) {
    if (searchingItem.count === 0) return;
    else {
      searchingItem.count--;
    }
  } else {
    return;
  }
  update(id);
  basket = basket.filter((item) => item.count !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};

//renders product count part
let update = (id) => {
  let searchingItem = basket.find((item) => item.id === id);
  document.getElementById(id).innerHTML = searchingItem.count;
  calculation();
};

//sums all products count in basket
let calculation = () => {
  document.getElementById("cartAmount").innerHTML = basket
    .map((item) => item.count)
    .reduce((x, y) => x + y, 0);
};

calculation();
