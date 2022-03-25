import { unsplash } from "./config/unsplash-config.js";
import { weather } from "./config/weather-config.js";
import { cities } from "./config/cities-config.js";

const searchButton = document.querySelector(".search-button");
const input = document.querySelector(".city-input");

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
  if(input.value.length > 2) {
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

//suggestions
input.addEventListener('keydown', () => {

  let suggestions=document.querySelectorAll(".suggestions li")
  suggestions.forEach(item => item.addEventListener('click', ()=> {
    // unsplash.fetchPhoto();
      weather.searchWeather(item.firstElementChild.textContent);
      input.value='';
  }))

  if(input.value.length > 2) {
    cities.fetchCities(input.value);
    // search by suggestion
 } else {
   let suggestions=document.querySelectorAll(".suggestions li")
   console.log(suggestions);
   suggestions.innerHTML='';
 }

});

// // search by suggestion
// suggestions.forEach(item => item.addEventListener('click', ()=> {
//  // unsplash.fetchPhoto();
//   weather.searchWeather(item.firstElementChild.textContent);
// }))

