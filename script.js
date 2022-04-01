import { unsplash } from "./config/unsplash-config.js";
import { weather } from "./config/weather-config.js";
import { cities } from "./config/cities-config.js";

const suggestionBox = document.querySelector("ul.suggestions");
let suggestions = document.querySelectorAll('.suggestions li')
const searchButton = document.querySelector(".search-button");
const input = document.querySelector(".city-input");
console.log(suggestionBox);
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
input.addEventListener('keyup', () => {
  console.log(suggestionBox);
  if(input.value.length > 2) {
    suggestionBox.classList.add('active');
    cities.fetchCities(input.value);
    console.log('xd');
    suggestions=document.querySelectorAll(".suggestions li")
    // search by suggestion
 } else {
   suggestions=document.querySelectorAll(".suggestions li");
   suggestionBox.classList.remove('active');
   console.log('xd');
   suggestions.innerHTML='';
 }

  suggestions.forEach(item => item.addEventListener('click', ()=> {
    // unsplash.fetchPhoto();
      weather.searchWeather(item.firstElementChild.textContent);
      input.value='';
  }))

});

// // search by suggestion
// suggestions.forEach(item => item.addEventListener('click', ()=> {
//  // unsplash.fetchPhoto();
//   weather.searchWeather(item.firstElementChild.textContent);
// }))

