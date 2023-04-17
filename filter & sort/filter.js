//data
const cars = [
  {
    name: "BMW E39",
    price: "60000",
    engine: 2,
  },
  {
    name: "Mercedes GL",
    price: "18000",
    engine: 1.6,
  },
  {
    name: "BMW F10",
    price: "55000",
    engine: 3,
  },
  {
    name: "Audi A8",
    price: "16500",
    engine: 3.5,
  },
];

//select elements
const carsContainer = document.querySelector(".cars");
const sortByDropdown = document.querySelector(".sort-by");
const sortOrderDropdown = document.querySelector(".sort-order");

//display cars
const displayCars = (cars) => {
  carsContainer.innerHTML = cars
    .map((car) => {
      let { name, price, engine } = car;
      return `<div class="car-item">
                <h3 class="name"><strong>Name</strong>: ${name}</h3>
                <p><strong>Price:</strong> <span class="price">$${price}</span></p>
                <p class="engine"><strong>Engine</strong>: ${engine}</p>
                <hr/>
                </div>
      `;
    })
    .join("");
};

displayCars(cars);

//ascending sort
const ascendingSort = (sortByValue) => {
  return cars.sort((a, b) => {
    if (a[sortByValue] < b[sortByValue]) return -1;
    if (a[sortByValue] > b[sortByValue]) return 1;
    return 0;
  });
};

//descending sort
const descendingSort = (sortByValue) => {
  return cars.sort((a, b) => {
    if (a[sortByValue] < b[sortByValue]) return 1;
    if (a[sortByValue] > b[sortByValue]) return -1;
    return 0;
  });
};

//sort by dropdown
sortByDropdown.addEventListener("change", () => {
  const sortByValue = sortByDropdown.value; // price or engine value
  const sortOrderValue = sortOrderDropdown.value; // asc or desc value

  const sortedCars =
    sortOrderValue === "desc"
      ? descendingSort(sortByValue)
      : ascendingSort(sortByValue);

  displayCars(sortedCars);
});

//sort order dropdown
sortOrderDropdown.addEventListener("change", () => {
  const event = new Event("change");
  const sortByValue = sortByDropdown.value;

  if (sortByValue) {
    sortByDropdown.dispatchEvent(event);
  }
});
