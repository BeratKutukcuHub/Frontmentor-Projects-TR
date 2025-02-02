const container = document.getElementById("container-grid");
const template_item = document.getElementById("template-products");
const img = template_item.content.getElementById("grid-img");
const template_cart = document.getElementById("template-cart").content;
const cart_calc = document.getElementById("cart-calc");
const right_container = document.getElementById("right-container");
const totalPrice = document.getElementById("totalPrice");

let cart = [];

function modules(inputList) {
  const processedList = [];
  let totalPrice = 0;
  inputList.forEach((item) => {
    const existingItem = processedList.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      processedList.push({
        name: item.name,
        price: item.price,
        quantity: 1,
      });
    }
    totalPrice += item.price;
  });

  return {
    processedList,
    totalPrice,
  };
}
let renderCart = () => {
  const renders = modules(cart);
  right_container.innerHTML = "";
  renders.processedList.forEach((value) => {
    const clone = template_cart.cloneNode(true);
    clone.getElementById("right-item-details").innerHTML = `<div
                      style="
                        display: flex;
                        flex-direction: column;
                        padding: 5% 0%;
                      "
                    >
                      <h5>${value.name}</h5>
                      <span style="display: flex">
                        <h5>${value.quantity}x -</h5>
                        <h5>@ $${value.price} $${
      value.quantity * value.price
    }</h5>
                      </span>
                    </div>`;
    right_container.appendChild(clone);
  });
  totalPrice.textContent = `$${renders.totalPrice}`;
};
const fetchRequest = async () => {
  return await fetch("../productlist/data.json").then((response) =>
    response.json()
  );
};

(async () => {
  const values = await fetchRequest();
  for (let value of values) {
    ((product) => {
      const clone = template_item.content.cloneNode(true);

      clone.getElementById("grid-img").src = `../productlist/${
        product.image.desktop.split("./")[1]
      }`;

      clone.getElementById("grid-description").innerHTML = `
        <h3>${product.category}</h3>
        <h4>${product.name}</h4>
        <h4>$${product.price}</h4>`;

      const calc = clone.getElementById("grid-calc");
      const addcart = clone.getElementById("grid-addtocart");
      const decrement = clone.getElementById("decrement");
      const increment = clone.getElementById("increment");

      addcart.addEventListener("click", () => {
        const addtoinfos = {
          category: product.category,
          name: product.name,
          price: product.price,
        };

        cart.push(addtoinfos);
        addcart.style.display = "none";
        calc.style.display = "flex";

        cart_calc.textContent = `Your Cart(${cart.length})`;
        renderCart();
      });

      decrement.addEventListener("click", () => {
        const lastIndex = cart.findIndex((val) => val.name === product.name);

        if (lastIndex !== -1) {
          cart.splice(lastIndex, 1);
        }

        if (cart.filter((val) => val.name === product.name).length === 0) {
          addcart.style.display = "flex";
          calc.style.display = "none";
        }

        cart_calc.textContent = `Your Cart(${cart.length})`;
        cart.splice(cart.length, 1);
        renderCart();
      });

      increment.addEventListener("click", () => {
        cart.push({
          category: product.category,
          name: product.name,
          price: product.price,
        });

        cart_calc.textContent = `Your Cart(${cart.length})`;
        renderCart();
      });

      container.appendChild(clone);
    })(value);
  }
})();
renderCart();
