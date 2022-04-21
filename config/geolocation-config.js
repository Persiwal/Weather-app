export const geoLocation = {
    apiKey: "4741d22028b090101d3735b88548e200",

    fetchCoords: async (city) => {
        try {
            const response = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${geoLocation.apiKey}`
            );
            const data = await response.json();
            return data[0];
        } catch (err) {
            console.error(err);
        }
    },
};
