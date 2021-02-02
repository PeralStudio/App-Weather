document.getElementById("icon").style= "display: none;";
document.querySelector(".container-temp").style = "background-color: transparent;";

const searchbox = document.querySelector(".inputCiudad");
searchbox.addEventListener('keypress', setQuery);

function setQuery(event) {
    if(event.which === 13) {
        /* console.log(searchbox.value); */
        Callweather();
    }
}

/* // Auto Detect City, Not work in mobile and Ublock
function autoDetectCity() {
    fetch(`http://ip-api.com/json`)
    .then( res => res.json())
    .then(response => {
        document.querySelector(".inputCiudad").value = response.city;
    })
    .catch(status => {
        console.log('Request failed.  Returned status of', status)
    })
  } */

//SPINNER
const spinner = document.getElementById("spinner");

function showSpinner() {
    spinner.className = "show";
    setTimeout(() => {
        spinner.className = spinner.className.replace("show", "");
    }, 1000);
}

//SPINNER STOP
function hideSpinner() {
    spinner.className = spinner.className.replace("show", "");
}


function Callweather() {

    var apiKey = "40efccd434eefd0344923485b60fbda7";
    var cityName = document.getElementById("inputCiudad").value;
    /* console.log(cityName); */

    //Show Spinner
    showSpinner();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        //Hide Spinner Cuando la Data esta lista
        hideSpinner();

        const kelvin = 273.15;
        //Comprobar si input es void y mostrar toast
        if(searchbox.value == "") {
            /* console.log("vacio"); */
            var x = document.getElementById("toast");
            x.className = "show";
            setTimeout(function(){
                x.className = x.className.replace("show", "");
                }, 3000);
            
            return;
        }
        
        if(data.name === undefined) {
            
            document.getElementById("h1Text").innerHTML = "Ciudad no encontrada";
            //Timeout Error Message
            setTimeout(() => {
            document.getElementById("h1Text").innerHTML = "";
            }, 1500);

            document.getElementById("temp").innerHTML = "";
            document.getElementById("icon").innerHTML = "";
            document.getElementById("inputCiudad").value = "";
            document.getElementById("icon").style= "display: none;";
            document.querySelector("body").style = ""
            document.querySelector(".container-temp").style = "";
            document.getElementById("h1Text").style = "background-color: rgba(0, 0, 0, 0.6); border-radius:20px;";
            document.getElementById("temp").innerHTML = "";
            document.getElementById("temp").style = "";
            document.getElementById("temp-max").innerHTML = "";
            document.getElementById("temp-min").innerHTML = "";

            

        }else {
            var icon = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            var temp = parseFloat(data.main.temp - kelvin, 10).toFixed(0);
            var maxTemp = parseFloat(data.main.temp_max - kelvin, 10).toFixed(0);
            var minTemp = parseFloat(data.main.temp_min - kelvin, 10).toFixed(0);
            /* console.log(temp); */
            
            document.getElementById("h1Text").innerHTML = data.name;
            document.getElementById("temp").innerHTML = `${temp} °C`;
            document.getElementById("temp").style = "border-radius: 10px; text-shadow:  3px 3px grey";
            document.getElementById("temp-max").innerHTML = `Máxima: ${maxTemp}°C`;
            document.getElementById("temp-min").innerHTML = `Mínima: ${minTemp}°C`;
            document.getElementById("icon").style= "display: flex;";
            document.getElementById("icon").src = icon;
            document.querySelector(".container-temp").style = "background-color: rgba(0, 0, 0, 0.6); border-radius:20px;";
            document.getElementById("h1Text").style = "background-color: rgba(0, 0, 0, 0.6); border-radius:20px; width:50%;";
            
            var backUrlCss = "background-size: cover; background-repeat: no-repeat;";
            switch (data.weather[0].icon) {
                case "01d": document.querySelector("body").style = `background-image: url(images/soleado2.jpg); ${backUrlCss}`;
                    break;
                case "01n": document.querySelector("body").style = `background-image: url(images/noche-despejada.jpg); ${backUrlCss}`;
                    break;
                case "04d": case "03d": case "02d": document.querySelector("body").style = `background-image: url(images/nublado.jpg); ${backUrlCss}`;
                    break;
                case "04n": case "03n": case "02n": case "04n": document.querySelector("body").style = `background-image: url(images/nublado-noche.jpg); ${backUrlCss}`;
                    break;
                case "50d": document.querySelector("body").style = `background-image: url(images/niebla.jpg); ${backUrlCss}`;
                    break;
                case "50n": document.querySelector("body").style = `background-image: url(images/niebla-noche.jpg); ${backUrlCss}`;
                    break;
                case "10d": document.querySelector("body").style = `background-image: url(images/lluvia.jpg); ${backUrlCss}`;
                    break;
                case "10n": case "09n": document.querySelector("body").style = `background-image: url(images/lluvia-noche.jpg); ${backUrlCss}`;
                    break;
                case "13d": document.querySelector("body").style = `background-image: url(images/nieve.jpg); ${backUrlCss}`;
                    break;
                case "13n": document.querySelector("body").style = `background-image: url(images/nieve-noche.jpg); ${backUrlCss}`;
                    break;
            }

            document.getElementById("inputCiudad").value = "";
        }
    });
}