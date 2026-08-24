
$(function () {
    const searchInput = $("#searchBox")
    const searchBtn = $("#search-btn")
    const weatherEmoji = $("#weather-emoji")
    const temparature = $("#temparature")
    const weather = $("#weather")
    const humidity = $("#humidity")
    const wind = $("#wind")
    const weatherTime = $("#weather-time")

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

            const date = new Date(data.current.time);

            const formatted = date.toLocaleString("en-IN", {
                month: "short",
                day: "2-digit",
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            });

            weatherEmoji.text(data.current.weather[1])
            temparature.text(data.current.temperature_2m + '°')
            weather.text(data.current.weather[0])
            humidity.text(data.current.relative_humidity_2m + '%')
            wind.text(data.current.wind_speed_10m + ' km/h')
            weatherTime.text('Updated time: ' + formatted)
        });
    }

    function updateClock() {
        const now = new Date()

        const time = now.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit'
        })

        $("#clock").text(time);
    }

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
    
    LiquidGlassReady.then(async function (LiquidGlass) {
        const glassEl = document.querySelector('#weather-card');
        glassEl.dataset.config = JSON.stringify({
            floating: true,
            blurAmount: 0.25,
            cornerRadius: 30,
        });

        const STORAGE_WEATHER_CARD = 'weatherCardPosition'

        const savedData = localStorage.getItem(STORAGE_WEATHER_CARD)

        if (savedData) {
            glassEl.style.transform = savedData
        } else {
            glassEl.style.transform = 'translate(10px,10px)'
        }

        const rootEl = document.querySelector('#background');

        const instance = await LiquidGlass.init({
            root: rootEl,
            glassElements: [glassEl],
        });

        glassEl.addEventListener("pointerup", () => {
            const translate = glassEl.style.transform;
            if (translate) {
                localStorage.setItem(STORAGE_WEATHER_CARD, translate)
            }
            console.log(translate);
        }, true);
    })

    getWeather()
    updateClock()
    setInterval(updateClock, 1000)
})