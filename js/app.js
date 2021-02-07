let oldTittle = document.title;
const h1TextStyle = "background-color: rgba(0, 0, 0, 0.6); border-radius:20px;"
const searchbox = document.querySelector(".inputCiudad");
searchbox.addEventListener('keypress', setQuery);
let hora = moment().format('HH:mm:ss');

// Put Hour when load page
document.getElementById('hora').innerHTML = hora

//Interval for Hour refresh
setInterval(() => {
    hora = moment().format('HH:mm:ss');
    document.getElementById('hora').innerHTML = hora;
}, 1000);

// fucntion for call Callweather() when press Enter = 13 keycode
function setQuery(event) { event.which === 13 ? Callweather() : null };

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
    document.getElementById("icon").innerHTML = "";
    document.getElementById("inputCiudad").value = "";
    document.getElementById("icon").style = "display: none;";
    document.querySelector("body").style = ""
    document.querySelector(".container-temp").style = "";
    document.getElementById("h1Text").style = "";
    document.getElementById("h1Text").innerHTML = "";
    document.getElementById("temp").innerHTML = "";
    document.getElementById("temp").style = "";
    document.getElementById("temp-max").innerHTML = "";
    document.getElementById("temp-min").innerHTML = "";
}

function Callweather() {

    const apiKey = "40efccd434eefd0344923485b60fbda7";
    const cityName = document.getElementById("inputCiudad").value;
    const backUrlCss = "background-size: cover; background-repeat: no-repeat;";
    const kelvin = 273.15;
    /* console.log(cityName); */

    //Show Spinner
    showSpinner();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(res => res.json())
        .then(data => {
            //Hide Spinner when Data ready
            hideSpinner();

            //Comprobar si input es void y mostrar toast
            if (searchbox.value == "" || data.code === 400) {
                /* console.log("vacio"); */
                clearWeather();
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
                console.clear();

            } else {
                const icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                const temp = parseFloat(data.main.temp - kelvin, 10).toFixed(0);
                const maxTemp = parseFloat(data.main.temp_max - kelvin, 10).toFixed(0);
                const minTemp = parseFloat(data.main.temp_min - kelvin, 10).toFixed(0);
                /* console.log(temp); */
                document.title = `El Clima de ${data.name} es de: ${temp}°C, maxima: ${maxTemp}°C y minima: ${minTemp}°C`;
                (data.weather[0].icon !== "" && data.weather[0].icon !== null) ? changeFavicon(icon) : changeFavicon('/favicon.ico');
                document.getElementById("h1Text").innerHTML = data.name;
                document.getElementById("temp").innerHTML = `${temp} °C`;
                document.getElementById("temp").style = "border-radius: 10px; text-shadow:  3px 3px grey";
                document.getElementById("temp-max").innerHTML = `Máxima: ${maxTemp}°C`;
                document.getElementById("temp-min").innerHTML = `Mínima: ${minTemp}°C`;
                document.getElementById("icon").style = "display: flex;";
                document.getElementById("icon").src = icon;
                document.querySelector(".container-temp").style = h1TextStyle;
                document.getElementById("h1Text").style = `${h1TextStyle} width:50%;`;

                switch (data.weather[0].icon) {

                    case "01d":
                        document.querySelector("body").style = `background-image: url(images/soleado2.jpg); ${backUrlCss}`;
                        break;
                    case "01n":
                        document.querySelector("body").style = `background-image: url(images/noche-despejada.jpg); ${backUrlCss}`;
                        break;
                    case "04d":
                    case "03d":
                    case "02d":
                        document.querySelector("body").style = `background-image: url(images/nublado.jpg); ${backUrlCss}`;
                        break;
                    case "04n":
                    case "03n":
                    case "02n":
                    case "04n":
                        document.querySelector("body").style = `background-image: url(images/nublado-noche.jpg); ${backUrlCss}`;
                        break;
                    case "50d":
                        document.querySelector("body").style = `background-image: url(images/niebla.jpg); ${backUrlCss}`;
                        break;
                    case "50n":
                        document.querySelector("body").style = `background-image: url(images/niebla-noche.jpg); ${backUrlCss}`;
                        break;
                    case "10d":
                        document.querySelector("body").style = `background-image: url(images/lluvia.jpg); ${backUrlCss}`;
                        break;
                    case "10n":
                    case "09n":
                        document.querySelector("body").style = `background-image: url(images/lluvia-noche.jpg); ${backUrlCss}`;
                        break;
                    case "13d":
                        document.querySelector("body").style = `background-image: url(images/nieve.jpg); ${backUrlCss}`;
                        break;
                    case "13n":
                        document.querySelector("body").style = `background-image: url(images/nieve-noche.jpg); ${backUrlCss}`;
                        break;
                }

                document.getElementById("inputCiudad").value = "";
            }
        });
}