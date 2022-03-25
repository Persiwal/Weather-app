const suggestions = document.querySelector('.suggestions');

export const cities = {
    
    fetchCities: async (value) => {
    try {
    const response = await fetch("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json");
    const data = await response.json();
    const matches = cities.findMatches(value,data);
    return cities.displayMatches(matches);
    } catch (err) {
        console.log(err);
    }
},
    findMatches: (matchThis, cities) => {
    return cities.filter(place => {
      const regex= new RegExp(matchThis, 'gi');
      return place.name.match(regex);
    })
    },
    displayMatches: (cities) => {
        suggestions.innerHTML='';
        for(let i=0;i<20 && i<cities.length;i++){
        suggestions.innerHTML+= `
            <li>
                <span class="city-name">${cities[i].name}</span>
                <span class="country-name">,${cities[i].country}</span>
            </li>
            `
        }
}
}
