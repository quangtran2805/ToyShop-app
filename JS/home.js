var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  // var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // for (i = 0; i < dots.length; i++) {
  //     dots[i].className = dots[i].className.replace(" active", "");
  // }
  slides[slideIndex - 1].style.display = "block";
  // dots[slideIndex-1].className += " active";
}

var nodeList = JSON.parse(localStorage.getItem("list")) || [];
let iconnumber = document.getElementsByClassName("header__icon-number")[0];

const iconNumber = () => {
  let number = 0;
  nodeList.forEach((e) => {
    number += e.quantity;
  });
  console.log(number);
  return number;
};
iconnumber.innerHTML = `${iconNumber()}`;


