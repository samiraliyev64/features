"use strict";

const paginationNumbers = document.querySelector("#pagination-numbers");
const paginatedList = document.querySelector("#paginated-list");
const listItems = paginatedList.querySelectorAll("li");
const nextBtn = document.querySelector("#next-button");
const prevBtn = document.querySelector("#prev-button");

const paginationLimit = 5;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

//creates X pages
const appendPageNumber = (i) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = i;
  pageNumber.setAttribute("page-index", i);
  pageNumber.setAttribute("aria-label", "Page " + i);

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((btn) => {
    btn.classList.remove("active");

    const pageIndex = Number(btn.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      btn.classList.add("active");
    }
  });
};

const disableButton = (btn) => {
  btn.classList.add("disabled");
  btn.setAttribute("disabled", true);
};

const enableButton = (btn) => {
  btn.classList.remove("disabled");
  btn.removeAttribute("disabled");
};

const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevBtn);
  } else {
    enableButton(prevBtn);
  }
  if (currentPage === pageCount) {
    disableButton(nextBtn);
  } else {
    enableButton(nextBtn);
  }
};

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();

  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, i) => {
    item.classList.add("hidden");
    if (i >= prevRange && i < currRange) {
      item.classList.remove("hidden");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevBtn.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });
  nextBtn.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });
  document.querySelectorAll(".pagination-number").forEach((btn) => {
    const pageIndex = Number(btn.getAttribute("page-index"));

    if (pageIndex) {
      btn.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});
