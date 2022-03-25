let cities=[];

const fetchCities = async () => {
    try {
    const response = await fetch("./test.csv");
    const data = await response.text();
    const table = data.split('\n').slice(1);
    table.forEach(row => {
        const cols = row.split(',');
        cities.push ( {
            cityName : cols[0].replace(/[^a-zA-Z]+/g,''),
            countryName : cols[4].replace(/[^a-zA-Z]+/g,'')
        })});
    } catch (err) {
        console.log(err);
    }

}
fetchCities();
console.log(cities.length);