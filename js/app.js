let oldTittle = document.title;

const docIcon = document.getElementById("icon");
const docTemp = document.getElementById("temp");
const tempMax = document.getElementById("temp-max");
const tempMin = document.getElementById("temp-min");
const docBody = document.querySelector("body");
const docH1Text = document.getElementById("h1Text");
const docFlag = document.getElementById("flag");
const docContainerTemp = document.querySelector(".container-temp");
const searchbox = document.querySelector(".inputCiudad");

// Listener inputciudad
searchbox.addEventListener('keypress', setQuery);
// function for call Callweather() when press Enter = 13 keycode
function setQuery(event) { if (event.which === 13) Callweather(); };


// Put Hour when load page
let hora = moment().format('HH:mm:ss');
document.getElementById('hora').innerHTML = hora

//Interval for Hour refresh
setInterval(() => {
    hora = moment().format('HH:mm:ss');
    document.getElementById('hora').innerHTML = hora;
}, 1000);

//SPINNER
const spinner = document.getElementById("spinner");

function showSpinner() {
    spinner.className = "show";
    setTimeout(() => {
        hideSpinner();
    }, 1000);
}

//SPINNER STOP
const hideSpinner = () => spinner.className = spinner.className.replace("show", "");

//Change Favicon
document.head = document.head || document.getElementsByTagName('head')[0];


function Callweather() {

    const apiKey = "40efccd434eefd0344923485b60fbda7";
    const cityName = searchbox.value;
    const h1TextStyle = "background-color: rgba(0, 0, 0, 0.6); border-radius:20px;";
    const kelvin = 273.15;

    //Show Spinner
    showSpinner();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            //Hide Spinner when Data ready
            hideSpinner();

            //Comprobar si input es void y mostrar toast
            if (searchbox.value == "" || data.code === 400) {
                clearWeather();
                // Clear Error 404 & 400 by Api in console log
                console.clear();
                let x = document.getElementById("toast");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);

                return;
            }

            if (data.name === undefined) {
                let x = document.getElementById("toast2");
                x.className = "show";
                setTimeout(function () {
                    x.className = x.className.replace("show", "");
                }, 3000);
                clearWeather();

            } else {
                docFlag.style.display = 'none';

                // Fetch Api flags, take and put
                fetch(`https://restcountries.eu/rest/v2/alpha/${data.sys.country}`)
                    .then(res => res.json())
                    .then(data => {
                        docFlag.style = 'display: block;';
                        docFlag.src = data.flag;

                    });

                const iconImg = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                const tempCelsius = parseFloat(data.main.temp - kelvin, 10).toFixed(0);
                const maxTempCelsius = parseFloat(data.main.temp_max - kelvin, 10).toFixed(0);
                const minTempCelsius = parseFloat(data.main.temp_min - kelvin, 10).toFixed(0);

                document.title = `El Clima de ${data.name} es de: ${tempCelsius}°C, maxima: ${maxTempCelsius}°C y minima: ${minTempCelsius}°C`;
                (data.weather[0].icon !== "" && data.weather[0].icon !== null) ? changeFavicon(iconImg) : changeFavicon('/favicon.ico');
                docH1Text.innerHTML = data.name;
                docTemp.innerHTML = `${tempCelsius} °C`;
                docTemp.style = "border-radius: 10px; text-shadow:  3px 3px grey";
                tempMax.innerHTML = `Máxima: ${maxTempCelsius}°C`;
                tempMin.innerHTML = `Mínima: ${minTempCelsius}°C`;
                docIcon.style = "display: flex;";
                docIcon.src = iconImg;
                docContainerTemp.style = h1TextStyle;
                docH1Text.style = `${h1TextStyle} width:50%;`;

                let images = [
                    { id: "01d", image: 'soleado2.jpg' },
                    { id: "01n", image: 'noche-despejada.jpg' },
                    { id: "02n", image: 'nublado-noche.jpg' },
                    { id: "03n", image: 'nublado-noche.jpg' },
                    { id: "04n", image: 'nublado-noche.jpg' },
                    { id: "50d", image: 'niebla.jpg' },
                    { id: "50n", image: 'niebla-noche.jpg' },
                    { id: "02d", image: 'nublado.jpg' },
                    { id: "03d", image: 'nublado.jpg' },
                    { id: "04d", image: 'nublado.jpg' },
                    { id: "10d", image: 'lluvia.jpg' },
                    { id: "10n", image: 'lluvia-noche.jpg' },
                    { id: "09n", image: 'lluvia-noche.jpg' },
                    { id: "13d", image: 'nieve.jpg' },
                    { id: "13n", image: 'nieve-noche.jpg' }
                ];

                const iconId = images.find(element => element.id === data.weather[0].icon);
                docBody.style = `background-image: url(images/${iconId.image});background-size: cover;`;

                searchbox.value = "";
            }
        });
}


function changeFavicon(src) {
    let link = document.createElement('link');
    let oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = src;
    if (oldLink) document.head.removeChild(oldLink);
    document.head.appendChild(link);
}


function clearWeather() {
    changeFavicon('/favicon.ico');
    document.title = oldTittle;
    docIcon.innerHTML = "";
    docIcon.style = "display: none;";
    searchbox.value = "";
    docBody.style = ""
    docContainerTemp.style = "";
    docH1Text.style = "";
    docH1Text.innerHTML = "";
    docTemp.innerHTML = "";
    docTemp.style = "";
    tempMax.innerHTML = "";
    tempMin.innerHTML = "";
    docFlag.style = 'display: none;';
}