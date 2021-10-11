let login = document.getElementById("login");
let popup = document.getElementById("popup");
let popup_opacity = document.getElementsByClassName("popup__opacity")[0];
let close = document.getElementsByClassName("popup__close");

login.addEventListener("click", function () {
  popup.style.display = "block";
});

popup_opacity.addEventListener("click", function () {
  popup.style.display = "none";
});

for (let i = 0; i < close.length; i++) {
  close[i].addEventListener("click", function () {
    popup.style.display = "none";
  });
}

let iconBar = document.getElementsByClassName("header__menu-iconBar")[0];
let menuList = document.getElementsByClassName("header__menu-list")[0];

iconBar.addEventListener("click", function(){
  menuList.classList.toggle("header__menu-listNew");
})