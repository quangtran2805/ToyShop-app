var nodeList = JSON.parse(localStorage.getItem("list")) || [];

var checkOut = document.getElementsByClassName("checkout__product")[0];
const listCheckout = () => {
  checkOut.innerHTML = nodeList
    .map((item, index) => {
      return `
        <tr>
            <td>${index + 1}</td>
            <td><img src=${item.imgUrl} alt=""></td>
            <td class="checkout__tdBtn">
              <button onclick="clickQuantityDes(${item.id})">-</button>
              <span>${item.quantity}</span>
              <button onclick="clickQuantityIn(${item.id})">+</button>
            </td>
            <td>${item.name} $${item.price}</td>
            <td>$ ${item.price * item.quantity}</td>
            <td onclick="clickClose(${item.id})" style="cursor:pointer">x</td>
        </tr> 
  `;
    })
    .join(" ");
};
listCheckout();

function clickClose(id) {
  let newItem = nodeList.filter((item) => item.id !== id);
  nodeList = newItem;

  listCheckout();
  totalprice.innerHTML = `SubTotal: $ ${getTotal()}`;

  iconnumber.innerHTML = `${iconNumber()}`;

  numberProduct.innerHTML = `Your shopping cart contains: ${iconNumber()} Products `;

  localStorage.setItem("list", JSON.stringify(nodeList));
}

clickQuantityIn = (id) => {
  const item = nodeList.map((item) => {
    if (item.id === id && item.quantity < 5) {
      return {
        ...item,
        quantity: item.quantity + 1,
      };
    }
    return item;
  });

  nodeList = item;

  listCheckout();
  totalprice.innerHTML = `SubTotal: $ ${getTotal()}`;
  iconnumber.innerHTML = `${iconNumber()}`;
  numberProduct.innerHTML = `Your shopping cart contains: ${iconNumber()} Products `;

  localStorage.setItem("list", JSON.stringify(nodeList));
};

clickQuantityDes = (id) => {
  const item = nodeList.map((item) => {
    if (item.id === id && item.quantity > 1) {
      return {
        ...item,
        quantity: item.quantity - 1,
      };
    }
    return item;
  });

  nodeList = item;

  listCheckout();
  totalprice.innerHTML = `SubTotal: $ ${getTotal()}`;
  iconnumber.innerHTML = `${iconNumber()}`;
  numberProduct.innerHTML = `Your shopping cart contains: ${iconNumber()} Products `;

  localStorage.setItem("list", JSON.stringify(nodeList));
};

let numberProduct = document.getElementsByClassName("checkout__number")[0];
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
numberProduct.innerHTML = `Your shopping cart contains: ${iconNumber()} Products `;

let totalprice = document.getElementsByClassName("checkout__totalprice")[0];
const getTotal = () => {
  var sum = 0;
  for (let i = 0; i < nodeList.length; i++) {
    sum += nodeList[i].price * nodeList[i].quantity;
  }
  return sum;
};
totalprice.innerHTML = `SubTotal: $ ${getTotal()}`;
