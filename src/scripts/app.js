// scroll effects
window.scrollToElement = function scrollToElement(element) {
  const el = document.querySelector(element);
  el.scrollIntoView({ behavior: "smooth" });
};

// loading
const loading = document.querySelector("#loading");
const setLoading = (value) => {
  value === true
    ? loading.classList.remove("hidden")
    : loading.classList.add("hidden");
};

// get items on api
const inputSun = document.querySelector("#selectedValueSun");
const inputWater = document.querySelector("#selectedValueWater");
const inputPets = document.querySelector("#selectedValuePets");

window.getPlants = function getPlants() {
  const selectedSun = inputSun.getAttribute("value");
  const selectedWater = inputWater.getAttribute("value");
  const selectedPets = inputPets.getAttribute("value");

  const selectedValues = [selectedSun, selectedWater, selectedPets];

  const hasAnEmptyField = selectedValues.some(
    (value) => value === "null" || value === ""
  );

  const resultSection = document.querySelector(".results");
  const noResultSection = document.querySelector(".no-results");

  if (!hasAnEmptyField) {
    setLoading(true);
    const apiUrl = `https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${selectedSun}&water=${selectedWater}&pets=${selectedPets}`;
    const plantsWrapper = document.querySelector("#plants");
    let list = document.createDocumentFragment();

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const plants = data;

        if (plants.length) {
          resultSection.classList.remove("hidden");
          noResultSection.classList.add("hidden");

          plants.map((plant) => {
            let li = document.createElement("li");
            li.innerHTML = `
              <h3>${plant.name}</h3>
              <img src="${plant.url}" alt="${plant.name}" />
            `;
            list.appendChild(li);
          });
          plantsWrapper.innerHTML = "";
          plantsWrapper.appendChild(list);
        }
      })
      .catch((error) => {
        console.log("An error has occurred!", error);
      })
      .finally(() => {
        setLoading(false);
        scrollToElement(".results");
      });
  } else {
    console.log("Please, select all options!");
    noResultSection.classList.remove("hidden");
    resultSection.classList.add("hidden");
  }
};
