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

            //posibilidades iconos segun tiempo
            if(data.weather[0].icon === "01d")/* Dia Soleado */ {
                document.querySelector("body").style = "background-image: url(images/soleado2.jpg); background-size: cover; background-repeat: no-repeat;"
            }if(data.weather[0].icon === "01n")/* Noche Despejada */ {
                document.querySelector("body").style = "background-image: url(images/noche-despejada.jpg); background-size: cover; background-repeat: no-repeat;"
            }if(data.weather[0].icon === "04d" || data.weather[0].icon === "03d" || data.weather[0].icon === "02d")/* Nublado */ {
                document.querySelector("body").style = "background-image: url(images/nublado.jpg); background-size: cover; background-repeat: no-repeat;"
            }if(data.weather[0].icon === "04n" || data.weather[0].icon === "03n" || data.weather[0].icon === "02n" || data.weather[0].icon === "04n")/* Noche Nublado */ {
                document.querySelector("body").style = "background-image: url(images/nublado-noche.jpg); background-size: cover; background-repeat: no-repeat;"
            }if(data.weather[0].icon === "50d")/* Niebla */ {
                document.querySelector("body").style = "background-image: url(images/niebla.jpg); background-size: cover; background-repeat: no-repeat;"
            }if(data.weather[0].icon === "50n")/* Noche Niebla */ {
                document.querySelector("body").style = "background-image: url(images/niebla-noche.jpg); background-size: cover; background-repeat: no-repeat;"
            }if(data.weather[0].icon === "10d")/* Lluvia */ {
                document.querySelector("body").style = "background-image: url(images/lluvia.jpg); background-size: cover; background-repeat: no-repeat;"
            }if(data.weather[0].icon === "10n" || data.weather[0].icon === "09n")/* Noche Lluvia */ {
                document.querySelector("body").style = "background-image: url(images/lluvia-noche.jpg); background-size: cover; background-repeat: no-repeat;"
            }if(data.weather[0].icon === "13d")/* Nieve */ {
                document.querySelector("body").style = "background-image: url(images/nieve.jpg); background-size: cover; background-repeat: no-repeat;"
            }if(data.weather[0].icon === "13n")/* Noche Nieve */ {
                document.querySelector("body").style = "background-image: url(images/nieve-noche.jpg); background-size: cover; background-repeat: no-repeat;"
            }

            /*console.log(data.weather[0].icon);
            console.log(data.weather[0].main);
            console.log(data); */


            document.getElementById("inputCiudad").value = "";
        }
        
    });
}

//Switch Cambiar modo claro/oscuro...
/* var checkbox = document.querySelector('input[type="checkbox"]');
checkbox.addEventListener('change', function () {
    if (checkbox.checked) {
        document.querySelector('body').style = "background-color: white; color: black;"
      console.log('Checked');
    } else {
        document.querySelector('body').style = "background-color: black; color: white;"
      console.log('Not checked');
    }
  }); */
