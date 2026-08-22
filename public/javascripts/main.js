
$(function () {
    const searchInput = $("#searchBox")
    const searchBtn = $("#search-btn")

    const weatherInfo = {
        0: ["Clear sky", "☀️"],

        1: ["Mainly clear", "🌤️"],
        2: ["Partly cloudy", "⛅"],
        3: ["Overcast", "☁️"],

        45: ["Fog", "🌫️"],
        48: ["Depositing rime fog", "🌫️"],

        51: ["Light drizzle", "🌦️"],
        53: ["Moderate drizzle", "🌦️"],
        55: ["Dense drizzle", "🌦️"],

        56: ["Light freezing drizzle", "🌧️"],
        57: ["Dense freezing drizzle", "🌧️"],

        61: ["Slight rain", "🌧️"],
        63: ["Moderate rain", "🌧️"],
        65: ["Heavy rain", "🌧️"],

        66: ["Light freezing rain", "🌧️"],
        67: ["Heavy freezing rain", "🌧️"],

        71: ["Slight snow fall", "🌨️"],
        73: ["Moderate snow fall", "🌨️"],
        75: ["Heavy snow fall", "🌨️"],

        77: ["Snow grains", "🌨️"],

        80: ["Slight rain showers", "🌦️"],
        81: ["Moderate rain showers", "🌦️"],
        82: ["Violent rain showers", "🌧️"],

        85: ["Slight snow showers", "🌨️"],
        86: ["Heavy snow showers", "🌨️"],

        95: ["Thunderstorm", "⛈️"],
        96: ["Thunderstorm with slight hail", "⛈️"],
        99: ["Thunderstorm with heavy hail", "⛈️"]
    };

    function getWeather() {
        navigator.geolocation.getCurrentPosition(async function (position) {

            const lat = position.coords.latitude;
            const long = position.coords.longitude;

            const url =
                `https://api.open-meteo.com/v1/forecast` +
                `?latitude=${lat}` +
                `&longitude=${long}` +
                `&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m`;

            const response = await fetch(
                url
            );

            const data = await response.json();
            data.current["weather"] = weatherInfo[data.current.weather_code]

            console.log(data.current);
        });
    }

    getWeather()

    function search() {
        let text = searchInput.val()

        console.log(text)

        window.open("https://www.google.com/search?q=" + encodeURIComponent(text), '_blank')
    }

    searchInput.on('keydown', function (event) {
        if (event.key === "Enter") {
            search()
        }
    })

    searchBtn.on('click', function () {
        search()
    })
})