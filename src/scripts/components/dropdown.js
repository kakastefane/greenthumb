let isOpen = false;

window.toggleOptions = function toggleOptions(inputName) {
  isOpen = !isOpen;
  const selector = document.querySelector("#selectContainer" + inputName);
  const displayValue = document.querySelector("#displayValue" + inputName);
  const arrow = document.querySelector("#arrowControl" + inputName);
  if (isOpen) {
    selector.style.visibility = "visible";
    selector.focus();
    displayValue.classList.add("select-box__value--focus");
    arrow.classList.add("select-box__arrow--inverted");
  } else {
    selector.blur();
    selector.style.visibility = "hidden";
    displayValue.classList.remove("select-box__value--focus");
    arrow.classList.remove("select-box__arrow--inverted");
  }
};

window.selected = function selected(value, name, label) {
  const title = document.querySelector("#valueText" + name);
  const selectedValue = document.querySelector("#selectedValue" + name);

  title.innerHTML = label;
  selectedValue.value = value;

  toggleOptions(name);
  getPlants();
};
