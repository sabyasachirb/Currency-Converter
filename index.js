const currencyfirst = document.getElementById("select-first");
const currencysecond = document.getElementById("select-second");
const inputamount = document.getElementById("input-amount");
const resultbox = document.querySelector(".msg");
const btn = document.querySelector(".convert-button");




const dropdowns = document.querySelectorAll("select");

for (select of dropdowns) {
    for (code in countryList) {
      let newOption = document.createElement("option");
      newOption.value = code;
      newOption.innerText = code;
      if(select.name == "from" && code == "USD") {
        newOption.selected = true;
      }
      if(select.name == "to" && code == "BDT") {
        newOption.selected = true;
      }
      select.appendChild(newOption);
      
      select.addEventListener("change", (evt) => { 
        UpdateFlag(evt.target);
    });
  }
}



const UpdateFlag = (element) => {
  let currencycode = element.value;
  let countrycode = countryList[currencycode];
  let imgTag = element.parentElement.querySelector("img");
  imgTag.src = `https://flagsapi.com/${countrycode}/flat/64.png`;
};


btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  let amount = inputamount.value;
  if (amount === "" || amount <= 0) {
    amount = 1;
    inputamount.value = 1;
  }
  updateRate();
});


function updateRate() {
    fetch(`https://v6.exchangerate-api.com/v6/a31f3c3aec16820f60d6c390/latest/${currencyfirst.value}`).then((res) => res.json()).then((data) => {
      
        let rate = data.conversion_rates[currencysecond.value];
        let total = (inputamount.value * rate).toFixed(2);
        console.log(`${inputamount.value} ${currencyfirst.value} = ${total} ${currencysecond.value}`);
        resultbox.innerHTML = `Result : ${inputamount.value} ${currencyfirst.value} = ${total} ${currencysecond.value}`;
    });
}

window.addEventListener("load", () => {
    updateRate();
});


