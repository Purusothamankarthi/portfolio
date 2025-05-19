'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

window.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetPage = link.getAttribute("data-nav-link");

      // Remove active class from all links and pages
      navLinks.forEach(item => item.classList.remove("active"));
      pages.forEach(page => page.classList.remove("active"));

      // Activate clicked link and corresponding page
      link.classList.add("active");
      const targetElement = document.querySelector(`[data-page="${targetPage}"]`);
      if (targetElement) {
        targetElement.classList.add("active");
      }
    });
  });

  document.querySelector("[data-form]").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const message = formData.get("message");

    // Set custom subject line
    const subject = `${fullname} sent a message from the website`;
    formData.set("subject", subject);

    // Display overlay message
    const status = document.createElement("div");
    status.id = "form-status";
    status.textContent = "Sending...";
    status.style.position = "fixed";
    status.style.top = "10px";
    status.style.left = "50%";
    status.style.transform = "translateX(-50%)";
    status.style.backgroundColor = "#333";
    status.style.color = "#fff";
    status.style.padding = "10px 20px";
    status.style.borderRadius = "5px";
    status.style.zIndex = "1000";
    document.body.appendChild(status);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        status.textContent = "Thank you! Your message has been sent successfully.";
        form.reset();
      } else {
        status.textContent = `Error: ${result.message}`;
      }
    } catch (error) {
      status.textContent = "An unexpected error occurred. Please try again later.";
    }

    // Hide the overlay message after 5 seconds
    setTimeout(() => {
      status.remove();
    }, 5000);
  });

});

