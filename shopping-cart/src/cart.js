let label = document.querySelector("#label");
let ShoppingCart = document.querySelector("#shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

//sums all products count in basket
let calculation = () => {
  document.getElementById("cartAmount").innerHTML = basket
    .map((item) => item.count)
    .reduce((x, y) => x + y, 0);
};

calculation();

//creates cart items dynamically
let generateCartItems = () => {
  if (basket.length !== 0) {
    return (ShoppingCart.innerHTML = basket
      .map((item) => {
        let { id, count } = item;
        const searchingItem =
          shopItemsData.find((item) => item.id === id) || [];
        let { id: Id, name, price, desc, img } = searchingItem;

        return `<div class="cart-item">
                  <img width="100" src="${img}" alt="pic" />
                  <div class="details">
                    <div class="title-price-x">
                      <h4 class="title-price">
                        <p>${name}</p>
                        <p class="cart-item-price">$ ${price}</p>
                      </h4>
                      <i class="bi bi-x-lg" onclick="removeItem(${id})"></i>
                    </div>
                    <div class="buttons">
                      <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                      <div id=${id} class="quantity">${count}</div>
                      <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>

                    <h3>$ ${count * price} </h3>
                  </div>
                </div>`;
      })
      .join(""));
  } else {
    ShoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h1>Basket is empty</h1>
    <a href="index.html">
      <button style="padding:10px;cursor:pointer;font-weight:bold;margin-top:20px;background:black;color:white;">Return Home page</button>
    </a>
    `;
  }
};

generateCartItems();

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
  generateCartItems();
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
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

//renders product count part
let update = (id) => {
  let searchingItem = basket.find((item) => item.id === id);
  document.getElementById(id).innerHTML = searchingItem.count;
  calculation();
  TotalBill();
};

//remove item from cart
var removeItem = (item) => {
  const id = item.getAttribute("id");
  basket = basket.filter((item) => item.id !== id);
  generateCartItems();
  TotalBill();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

//clear cart
let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
};

//totall bill
let TotalBill = () => {
  if (basket.length !== 0) {
    const amount = basket
      .map((item) => {
        let { id, count } = item;
        let searchingItem = shopItemsData.find((x) => x.id === id) || [];
        return count * searchingItem.price;
      })
      .reduce((x, y) => x + y, 0);
    label.innerHTML = `
      <h2>Total Bill: ${amount}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else {
    return;
  }
};

TotalBill();
