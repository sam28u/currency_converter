fromCurrency = document.querySelector(".from select");
toCurrency = document.querySelector(".to select");
console.log(fromCurrency.value);
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
for (const select of dropdowns) {
  for (const currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    select.append(newOption);
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (ele) => {
  let currCode = ele.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = ele.previousElementSibling;
  img.src = newSrc;
};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  let amt = document.querySelector("form input");
  let amtV = amt.value;
  if (amtV === "" || amtV < 1) {
    amtV = 1;
    amtV = "1";
  }
  let url = `https://v6.exchangerate-api.com/v6/ee6d0604d8bf409f18eabecb/latest/${fromCurrency.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalexch = (amtV * exchangeRate).toFixed(2);
      let totalexchtext = document.querySelector(".msg");
      totalexchtext.innerText = `${amtV} ${fromCurrency.value} = ${totalexch} ${toCurrency.value}`;
      console.log(totalexchtext.innerText);
    });
});
