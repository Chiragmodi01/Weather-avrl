const city1 = document.querySelector(".city1");
const city2 = document.querySelector(".city2");
const city3 = document.querySelector(".city3");
const city4 = document.querySelector(".city4");
const btnGetWeather = document.querySelector(".btn-getweather");
const inputCityName = document.querySelector(".input-search");
const btnSearchCity = document.querySelector(".btn-search");
const noData = document.querySelector(".noData-container");
const dataTable = document.querySelector(".table");


const citiesLabel = [city1, city2, city3, city4];

const cities = ["London", "New York", "Los Angeles", "Las Vegas"];

let index = 0;
let tableEntries = []; //initializing output array


// Btn Get Weather
btnGetWeather.addEventListener("click", function () {

  noData.style.display = "none";
  citiesLabel[index].style.border = "3px solid green";

// Fetching Weather Data from api
  const request = new XMLHttpRequest();
  request.open(
    "GET",
    `https://python3-dot-parul-arena-2.appspot.com/test?cityname=${cities[index]}`
  );
  request.send();
  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);
    pushData(data);
  });
});


// Function to push the data into array
const pushData = function (data) {
  const { date_and_time, description, pressure_in_hPa, temp_in_celsius } = data;
  const givenDate = new Date(date_and_time);
  const currentDate = new Date();
  const date = (Number(currentDate) - Number(givenDate)) / (1000 * 60 * 60);

  const elements = {
    city: cities[index],
    description: description,
    temp_in_celsius: temp_in_celsius,
    pressure_in_hPa: pressure_in_hPa,
    date_and_time: date.toFixed(),
  };
  tableEntries.push(elements);

  if (index < cities.length - 1) {
    index++;
  } else {
    index = 0;
    btnGetWeather.disabled = true;
    btnGetWeather.style.cursor= "no-drop";
    btnGetWeather.style.opacity= "60%";
  }

  displayData(elements);
};


// Function to Display Data
const displayData = function (data) {
  const {city, description, temp_in_celsius, pressure_in_hPa, date_and_time} = data;
  const html = `
        <tr class="new-table-row">
            <td class="table-data">${city}</td>
            <td class="table-data"><input type="text" style="padding: 5px ; font-size: 16px; border-radius: 5px" value=${description} /></td>
            <td class="table-data">${temp_in_celsius}</td>
            <td class="table-data">${pressure_in_hPa}</td>
            <td class="table-data">${date_and_time}</td>
            <td class="table-data"><button class="btnDel" onclick="removeRow(this)">delete</button></td>
        </tr>
        `;
  dataTable.insertAdjacentHTML("beforeend", html);
};

// Function to delete entry from table
function removeRow(currentRow) {
  while ((currentRow = currentRow.parentElement) && currentRow.tagName != "TR");
  currentRow.parentElement.removeChild(currentRow);
}


// Button Search to search city
btnSearchCity.addEventListener("click", function (e) {
  e.preventDefault();
  searchCity();
});


// Function search city
const searchCity = function () {
  const cityName = inputCityName.value;

  tableEntries.forEach(function (item) {
    if (item.city === cityName) {
      const id = tableEntries.findIndex((curRow) => cityName === curRow.city);
      
      const selectedRow = document.querySelectorAll(".new-table-row");
      selectedRow[id].style.backgroundColor = "yellow";
      setTimeout(function () {
        selectedRow[id].style.backgroundColor = "";
      }, 3000);
    }
    inputCityName.value = "";
  });
};