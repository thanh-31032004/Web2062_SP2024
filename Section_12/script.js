"use strict";

const btnsOpenModel = document.querySelectorAll(".btn--open-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const nav = document.querySelector(".nav");

// 1 PROJECT: "Bankist" Website



const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function (e) {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};


// 2. IMPLEMENTING SMOOTH SCROLLING
btnsOpenModel.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
});


document.querySelector(".nav__logo").style.height = "45px";


const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
 
  const s1Coordinates = section1.getBoundingClientRect();
  console.log(s1Coordinates);
  console.log(e.target.getBoundingClientRect());

  console.log(
    "Current scroll position (X/Y):",
    window.pageXOffset,
    window.pageYOffset
  );
  console.log(
    "Height/width of viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(s1Coordinates.left + window.pageXOffset, s1Coordinates.top+pageYOffset);
  // window.scrollTo({
  //   top: s1Coordinates.top,
  //   left: s1Coordinates.left,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: "smooth" });
});


// 3 EVENT PROPAGATION IN PRACTICE
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;


document.querySelector('.nav__link').addEventListener('click', function(e) {

  this.style.backgroundColor = randomColor();
  console.log('LINK')
  // console.log('NAV LINK', e.target.className);
  console.log('LINK', e.target.className, e.currentTarget.className);
  console.log(e.currentTarget === this);
  // e.stopPropagation();
  
});

document.querySelector('.nav__links').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  // console.log('CONTAINER', e.target);
  console.table('CONTAINER', e.target.className, e.currentTarget.className);
  console.log(e.timeStamp);

  // e.stopPropagation();
});

document.querySelector('.nav').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();
  // console.log('NAVIGATION', e.target);
  console.log('NAVIGATION', e.target.className, e.currentTarget.className);
  console.log(e.timeStamp);
});

document.querySelector('.header').addEventListener(
  'click',
  function(e) {
    this.style.backgroundColor = randomColor();
    // console.log('HEADER', e.target);
    console.log('HEADER', e.target.className, e.currentTarget.className);
  },
//true
);

// 4  Event Delegation: Implementing Page Navigation

const allLinks = document.querySelectorAll(".nav__link");

// And then add one event listener to EACH link
 allLinks.forEach(el =>
  el.addEventListener('click', function(e) {
    e.preventDefault();
    const id = this.getAttribute('href');

    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }),
); 

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    if (id !== "#")
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});


// 5 Building a Tabbed Component

const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const tabsContainer = document.querySelector(".operations__tab-container");

tabsContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab"); 
  console.log(clicked);

  if (clicked) {
   
    tabs.forEach((t) => t.classList.remove("operations__tab--active"));
    tabsContent.forEach((c) =>
      c.classList.remove("operations__content--active")
    );
    clicked.classList.add("operations__tab--active");
    document
      .querySelector(`.operations__content--${clicked.dataset.tab}`)
      .classList.add("operations__content--active");
  }
});


// 6 Implementing a Sticky Navigation: The Scroll Event


const initialCoordinates = section1.getBoundingClientRect();
console.log(initialCoordinates);
window.addEventListener('scroll', function(e) {
 
  console.log(window.scrollY);

  
  if (window.scrollY > initialCoordinates.top) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
});


// 7 Building a Slider Component

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length;

const createDots = () => {
  slides.forEach((s, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = (dot) => {
  const dots = document.querySelectorAll(".dots__dot");
  dots.forEach((d) => d.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${dot}"]`)
    .classList.add("dots__dot--active");
};

const goToSlide = (slide) => {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

const nextSlide = () => {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

btnLeft.addEventListener("click", prevSlide);
btnRight.addEventListener("click", nextSlide);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") prevSlide();
  if (e.key === "ArrowRight") nextSlide();
});

dotContainer.addEventListener("click", (e) => {
  console.log(e.target);
 
  if (e.target.matches(".dots__dot")) {
    const { slide } = e.target.dataset; // Destructuring
    goToSlide(slide);
    activateDot(slide);
  }
});
const init = () => {
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();

document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built!", e);
});

window.addEventListener("load", function (e) {
  console.log("Page fully loaded, including images!", e);
});

window.addEventListener("beforeunload", function (e) {
  e.preventDefault();
 
  console.log(e);
});



