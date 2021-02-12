let oldTittle = document.title;
const h1TextStyle = "background-color: rgba(0, 0, 0, 0.6); border-radius:20px;"
const searchbox = document.querySelector(".inputCiudad");
// Listener inputciudad
searchbox.addEventListener('keypress', setQuery);
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const tempMax = document.getElementById("temp-max");
const tempMin = document.getElementById("temp-min");
const docBody = document.querySelector("body");
const docH1Text = document.getElementById("h1Text");
const docFlag = document.getElementById("flag");
const docContainerTemp = document.querySelector(".container-temp");
let hora = moment().format('HH:mm:ss');

// Put Hour when load page
document.getElementById('hora').innerHTML = hora

//Interval for Hour refresh
setInterval(() => {
    hora = moment().format('HH:mm:ss');
    document.getElementById('hora').innerHTML = hora;
}, 1000);

// fucntion for call Callweather() when press Enter = 13 keycode
function setQuery(event) { if (event.which === 13) Callweather(); };

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

function changeFavicon(src) {
    var link = document.createElement('link'),
        oldLink = document.getElementById('dynamic-favicon');
    link.id = 'dynamic-favicon';
    link.rel = 'shortcut icon';
    link.href = src;
    if (oldLink) {
        document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
}

function clearWeather() {
    changeFavicon('/favicon.ico');
    document.title = oldTittle;
    icon.innerHTML = "";
    icon.style = "display: none;";
    searchbox.value = "";
    docBody.style = ""
    docContainerTemp.style = "";
    docH1Text.style = "";
    docH1Text.innerHTML = "";
    temp.innerHTML = "";
    temp.style = "";
    tempMax.innerHTML = "";
    tempMin.innerHTML = "";
    docFlag.style = 'display: none;';
}

function Callweather() {

    const apiKey = "40efccd434eefd0344923485b60fbda7";
    const cityName = searchbox.value;
    const backUrlCss = "background-size: cover; background-repeat: no-repeat;";
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
                // Clear Error 404 & 400 by Api in console log
                console.clear();

            } else {
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
                temp.innerHTML = `${tempCelsius} °C`;
                temp.style = "border-radius: 10px; text-shadow:  3px 3px grey";
                tempMax.innerHTML = `Máxima: ${maxTempCelsius}°C`;
                tempMin.innerHTML = `Mínima: ${minTempCelsius}°C`;
                icon.style = "display: flex;";
                icon.src = iconImg;
                docContainerTemp.style = h1TextStyle;
                docH1Text.style = `${h1TextStyle} width:50%;`;

                switch (data.weather[0].icon) {

                    case "01d":
                        docBody.style = `background-image: url(images/soleado2.jpg); ${backUrlCss}`;
                        break;
                    case "01n":
                        docBody.style = `background-image: url(images/noche-despejada.jpg); ${backUrlCss}`;
                        break;
                    case "04d":
                    case "03d":
                    case "02d":
                        docBody.style = `background-image: url(images/nublado.jpg); ${backUrlCss}`;
                        break;
                    case "04n":
                    case "03n":
                    case "02n":
                    case "04n":
                        docBody.style = `background-image: url(images/nublado-noche.jpg); ${backUrlCss}`;
                        break;
                    case "50d":
                        docBody.style = `background-image: url(images/niebla.jpg); ${backUrlCss}`;
                        break;
                    case "50n":
                        docBody.style = `background-image: url(images/niebla-noche.jpg); ${backUrlCss}`;
                        break;
                    case "10d":
                        docBody.style = `background-image: url(images/lluvia.jpg); ${backUrlCss}`;
                        break;
                    case "10n":
                    case "09n":
                        docBody.style = `background-image: url(images/lluvia-noche.jpg); ${backUrlCss}`;
                        break;
                    case "13d":
                        docBody.style = `background-image: url(images/nieve.jpg); ${backUrlCss}`;
                        break;
                    case "13n":
                        docBody.style = `background-image: url(images/nieve-noche.jpg); ${backUrlCss}`;
                        break;
                }

                searchbox.value = "";

            }
        });
}







