//Da se pojavi kosarica klikom na ikonu
document.getElementById("shopping").addEventListener("click", () => {
    document.getElementById("shopping-side-menu").classList.toggle("active");
  });

  let count = 0; 
document.getElementById("shopping-count").innerText = count;

// Funkcija za brojac stvari u kosarici
function setCount() {
  let totalCount = 0; 
  const allItems = document.querySelectorAll(".shopping-item");
  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];
    
    const itemAmount = item.querySelector(".amount").textContent;
    totalCount += parseInt(itemAmount);
  }
  document.getElementById("shopping-count").innerText = totalCount;
}

// Pronađi sva 3 plava Order button-a i spremi ih u listu carButtons
const carButtons = document.querySelectorAll(".car-list button");
for (let i = 0; i < carButtons.length; i++) {
  const button = carButtons[i];
  // Da svaki na klik poziva funkciju hOB
  button.addEventListener("click", handleOrderButton);
}

  function handleOrderButton(event) {
    const clickedButton = event.currentTarget; 
    const carList = clickedButton.parentElement; 

      // Dohvati naziv i cijenu auta
  const carName = carList.querySelector("h3").innerText;
  const carPrice = carList.querySelector("small > em").innerText;

   // Provjeri da li postoji vec taj auto u kosarici
   const clickedCar = document.querySelector(`.shopping-item#${carName.toLowerCase()}`);

  if (!clickedCar) {
    // Ako nema
    createShopItem(carName, carPrice);
  } else {
    // Ako ima
    const carAmount = clickedCar.querySelector(".amount");
    let amountNumber = parseInt(carAmount.textContent); 
    carAmount.innerText = ++amountNumber; 

    // Enable minus jer se povecala kolicina
    clickedCar.querySelector(".minus").disabled = false;
  }

  calculateTotalPrice(); // Poziv funkcije koja će izračunati ukupnu cijenu
  setCount(); // Poziv funkcije koja će ponovno postaviti brojač
}

// Funkcija koja kreira novi 'shopping-item' u 'shopping-side-menu'
function createShopItem(name, price) {
  const shopItem = document.createElement("article"); 
  shopItem.classList.add("shopping-item"); 
  shopItem.id = name.toLowerCase(); 

  shopItem.innerHTML = `
    <i class="fas fa-times close"></i>
    <h3>${name}</h3>
    <div class="item-info">
      <small>Price:</small>
      <strong class="price">${price}</strong>
    </div>
    <div class="item-info">
      <small>Amount:</small>
      <div class="amount-box">
        <button class="minus" disabled><i class="fas fa-minus"></i></button>
        <strong class="amount">1</strong>
        <button class="plus"><i class="fas fa-plus"></i></button>
      </div>
    </div>`;

  document.getElementById("shopping-items").appendChild(shopItem);

  // Klikom na 'x' ikonu za uklanjanje auta iz košarice
  shopItem.querySelector(".close").addEventListener("click", handleRemoveClick);

  // Klikom na '+' ikonu za povecat kolicinu
  shopItem.querySelector(".plus").addEventListener("click", handlePlusClick);

  // Klikom na '-' ikonu za smanjit kolicinu
  shopItem.querySelector(".minus").addEventListener("click", handleMinusClick);
}

// Funkcija koja računa ukupnu cijenu 
function calculateTotalPrice() {
  let totalPrice = 0;

  const shopItems = document.querySelectorAll(".shopping-item");
  for (let i = 0; i < shopItems.length; i++) {
    const item = shopItems[i];

    const itemPrice = item.querySelector(".price").textContent; 
    const itemCount = item.querySelector(".amount").textContent;
    const onlyPrice = itemPrice.split(" ")[0];

    const itemTotalPrice = parseFloat(onlyPrice) * parseInt(itemCount);

    totalPrice += itemTotalPrice;
  }

  document.querySelector("#total-price > strong").innerText =
    totalPrice.toFixed(2)+ " $";
}

// Funkcija koja uklanja auto klikom na x
function handleRemoveClick(event) {
  const clickedX = event.currentTarget;
  const item = clickedX.parentElement;
  item.remove(); 

  calculateTotalPrice(); // Ponovo nakon svakog x-a
  setCount(); //Isto ka i gori
}

// Funkcija koja poveca kolicinu
function handlePlusClick(event) {
  const clickedPlus = event.currentTarget;
  const amountBox = clickedPlus.parentElement;

  const amount = amountBox.querySelector(".amount");
  amount.textContent = ++amount.textContent;

  calculateTotalPrice(); 
  setCount(); 

  amountBox.querySelector(".minus").disabled = false;
}

// Funkcija koja smanji kolicinu
function handleMinusClick(event) {
  const clickedMinus = event.currentTarget;
  const amountBox = clickedMinus.parentElement;

  const amount = amountBox.querySelector(".amount");
  if (+amount.textContent > 1) {
    amount.textContent = --amount.textContent;

    calculateTotalPrice(); 
    setCount(); 
  }

  // Enable-aj minus button samo ako je količina veća od 1
  clickedMinus.disabled = parseInt(amount.textContent) === 1 ? true : false;
}
