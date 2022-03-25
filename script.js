import { unsplash } from "./config/unsplash-config.js";
import { weather } from "./config/weather-config.js";
//import {fetchCities} from "./config/cities-config.js";

const searchButton = document.querySelector(".search-button");
const input = document.querySelector(".city-input");
const suggestions = document.querySelectorAll(".suggestions li");
let cities=[];
//display this weather on first page load
//unsplash.fetchPhoto();
weather.fetchWeather("Warsaw");

// search by clicking button
searchButton.addEventListener("click", () => {
  if (input.value) {
    //unsplash.fetchPhoto();
    weather.searchWeather(input.value);
    input.value = "";
  }
});

// search by enter key
input.addEventListener("keyup", (event) => {
  if(input.value != '') {
    input.style.borderRadius = `0rem`;
  } else {
    input.style.borderRadius = `1.25rem`;
  }
  if (event.key === "Enter" && input.value) {
   // unsplash.fetchPhoto();
    weather.searchWeather(input.value);
    input.value = "";
  }
})
console.log(cities['cityName']);
let arrayY = [1,2,3,4];
console.log(arrayY);
for(let i=0;i<cities.length;i++) {
  console.log(cities[i]);
}
//cities.forEach(city => console.log(city));
// // search by suggestion
// suggestions.forEach(item => item.addEventListener('click', ()=> {
//  // unsplash.fetchPhoto();
//   weather.searchWeather(item.firstElementChild.textContent);
// }))
// function findMatches(matchThis, cities) {
//   return cities.filter(place => {
//     const regex= new RegExp(matchThis, 'gi');
//     return place.cityName.match(regex);
//   })
// }
// console.log(findMatches('Bos',cities));

// function displayMatches(value) {
//   console.log(findMatches(value,cities));
// }