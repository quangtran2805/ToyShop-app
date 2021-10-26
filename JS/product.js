fetch("https://json-api-demoapp.herokuapp.com/productToyShop")
  .then((response) => response.json())
  .then((data) => handleData(data));

const product = document.getElementsByClassName("product__list")[0];

let total = document.getElementsByClassName("total")[0];
let totalList = document.getElementsByClassName("total__list")[0];
let totalItem = document.getElementsByClassName("total__item");
var nodeList = JSON.parse(localStorage.getItem("list")) || [];
let totalSubtotal = document.getElementsByClassName("total__subtotal")[0];
let iconnumber = document.getElementsByClassName("header__icon-number")[0];

function handleData(data) {
  product.innerHTML = data
    .map((item) => {
      return `
        <li class="product__item">
            <div class="product__image">
                <img src=${item.imgUrl} >
                <span class="product__view">QUICK VIEW<span>
            </div>
            <div class="product__info">
                <div class="product__left">
                    <h5 class="product__name">${item.name}</h5>
                    <p class="product__price">$ ${item.price}</p>
                </div>
                <button class="product__btn" onclick="clickProduct(${item.id})">
                    <i class="fas fa-cart-plus"></i>
                </button>
            </div>

        </li>
    `;
    })
    .join(" ");

  clickProduct = (id) => {
    total.style.display = "block";
    const filterListID = nodeList.find((item) => item.id === id);

    if (!filterListID) {
      const addItem = data.find((item) => item.id === id);
      const newItem = [...nodeList, addItem];
      nodeList = newItem;
      // localStorage.setItem("list", JSON.stringify(nodeList));
    } else {
      const listItem = nodeList.map((item) => {
        if ((item.id === id) & (item.quantity < 5)) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
      nodeList = listItem;
    }

    menuToTalList();

    totalSubtotal.innerHTML = `SubTotal: $ ${getTotal()}`;
    iconnumber.innerHTML = `${iconNumber()}`;

    localStorage.setItem("list", JSON.stringify(nodeList));
  };

  removeItem = (id) => {
    const newItem = nodeList.filter((item) => item.id !== id);
    nodeList = newItem;
  
    menuToTalList();
  
    if (nodeList.length === 0) {
      total.style.display = "none";
    }
  
    totalSubtotal.innerHTML = `SubTotal: $ ${getTotal()}`;
    iconnumber.innerHTML = `${iconNumber()}`;
  
    localStorage.setItem("list", JSON.stringify(nodeList));
  };
  
  const getTotal = () => {
    var sum = 0;
    for (let i = 0; i < nodeList.length; i++) {
      sum += nodeList[i].price * nodeList[i].quantity;
    }
    return sum;
  };
  totalSubtotal.innerHTML = `SubTotal: $ ${getTotal()}`;
  
  const iconNumber = () => {
    let number = 0;
    nodeList.forEach((e) => {
      number += e.quantity;
    });
    console.log(number);
    return number;
  };
  iconnumber.innerHTML = `${iconNumber()}`;
  
  let totalClose = document.getElementsByClassName("total__close")[0];
  totalClose.addEventListener("click", () => {
    total.style.display = "none";
  });
  
  let iconCart = document.getElementById("icon-cart");
  
  iconCart.addEventListener("click", function () {
    total.style.display = "block";
  
    menuToTalList();
  });
  
  const menuToTalList = () => {
    totalList.innerHTML = nodeList
      .map((item) => {
        return `
      <li class="total__item">
        <img src=${item.imgUrl} alt="" class="total__image">
        <h3 class="total__name"><span>${item.quantity}x</span> ${item.name}</h3> 
        <div class="total__down" onclick="removeItem(${item.id})">x</div>
        <div class="total__numbertotal">$ ${item.price * item.quantity}</div>
      </li>
      `;
      })
      .join(" ");
  };
  
  let filter = document.getElementsByClassName("product__filter")[0];
  filter.addEventListener("submit", function (e) {
    e.preventDefault();
  });
  
  handleProduct = (e) => {
    let val = document.getElementById("product__input").value;
    let filProduct = data.filter((item) =>
      item.name.toLocaleLowerCase().includes(val.toLocaleLowerCase())
    );
  
    if (filProduct.length === 0) {
      product.innerHTML = "không có sp cần tìm";
    } else {
      product.innerHTML = filProduct
        .map((item) => {
          return `
          <li class="product__item">
              <div class="product__image">
                  <img src=${item.imgUrl} >
                  <span class="product__view">QUICK VIEW<span>
              </div>
              <div class="product__info">
                  <div class="product__left">
                      <h5 class="product__name">${item.name}</h5>
                      <p class="product__price">$ ${item.price}</p>
                  </div>  
                  <button class="product__btn" onclick="clickProduct(${item.id})">
                      <i class="fas fa-cart-plus"></i>
                  </button>   
              </div>
              
          </li>
      `;
        })
        .join(" ");
    }
  };
  
  handleChangeSort = () => {
    let x = document.getElementById("mySelect").value;
    let sortProduct = data.sort((a, b) => {
      if (x === "all") {
        return true;
      } else if (x === "1") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    product.innerHTML = sortProduct
      .map((item) => {
        return `
          <li class="product__item">
              <div class="product__image">
                  <img src=${item.imgUrl} >
                  <span class="product__view">QUICK VIEW<span>
              </div>
              <div class="product__info">
                  <div class="product__left">
                      <h5 class="product__name">${item.name}</h5>
                      <p class="product__price">$ ${item.price}</p>
                  </div>  
                  <button class="product__btn" onclick="clickProduct(${item.id})">
                      <i class="fas fa-cart-plus"></i>
                  </button>   
              </div>
              
          </li>
      `;
      })
      .join(" ");
  };
  
}



