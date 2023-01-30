"use strict";
const billInput = document.getElementById("bill-amount");
const peopleInput = document.getElementById("people-count");
const customInput = document.getElementById("custom-percentage");
const btn5 = document.querySelector(".tip5");
const btn10 = document.querySelector(".tip10");
const btn15 = document.querySelector(".tip15");
const btn25 = document.querySelector(".tip25");
const btn50 = document.querySelector(".tip50");
const btnReset = document.querySelector(".reset");
const showTip = document.querySelector("#tip");
const showTotal = document.querySelector("#total");
const showWarning = document.querySelector("span");
let billAmount, numPeople, customPercent, tipTotal, tipPerson, totalPerson;

function resetBtn() {
  billInput.value = "";
  peopleInput.value = "";
  showWarning.classList.add("hide");
  peopleInput.classList.remove("error");
  customInput.value = "";
  percentBtns.forEach(function (btn) {
    btn.classList.remove("click");
  });
  showTip.textContent = "$0.00";
  showTotal.textContent = "$0.00";
}

billInput.addEventListener("change", function () {
  billAmount = Number(billInput.value);
  numPeople = Number(peopleInput.value);

  if (billAmount !== 0) {
    btnReset.removeAttribute("disabled");
  }
  if (numPeople === 0) {
    showWarning.classList.remove("hide");
    peopleInput.classList.add("error");
  }
});

peopleInput.addEventListener("change", function () {
  numPeople = Number(peopleInput.value);
  if (numPeople !== 0) {
    showWarning.classList.add("hide");
    peopleInput.classList.remove("error");
  } else if (numPeople === 0) {
    showWarning.classList.remove("hide");
    peopleInput.classList.add("error");
  }
});

const percentBtns = [btn5, btn10, btn15, btn25, btn50, customInput];
let percent = 0;

percentBtns.forEach(function (btn) {
  btn.addEventListener("pointerdown", function (e) {
    btn.classList.add("click");
    percentBtns.forEach(function (btnInner) {
      if (btnInner !== btn) btnInner.classList.remove("click");
    });
    if (btn.id !== "custom") percent = Number(btn.value);
  });
});

btnReset.addEventListener("click", resetBtn);

document.querySelectorAll("input").forEach(function (input) {
  input.addEventListener("change", function () {
    billAmount = Number(billInput.value);
    numPeople = Number(peopleInput.value);
    customPercent = Number(customInput.value);

    if (customPercent > 100) {
      alert("percentage cannot be grater than 100!");
      resetBtn();
    }

    if (percent === 0) percent = customPercent;

    if (billAmount !== 0 && numPeople !== 0 && percent !== 0) {
      tipTotal = (billAmount * percent) / 100;
      tipPerson = tipTotal / numPeople;
      totalPerson = (billAmount = tipTotal) / numPeople;

      showTip.textContent = "$" + tipPerson.toFixed(2);
      showTotal.textContent = "$" + totalPerson.toFixed(2);
    }
  });
});
