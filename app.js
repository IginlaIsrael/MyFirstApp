document.addEventListener('DOMContentLoaded', function(e){
    //Selecting Dom Elements for manipulation
    const searchBar = document.querySelector('#searchBar');
    const city = document.querySelector('#cityName');
    const temp = document.querySelector('#temp');
    const  description = document.querySelector('.description');
    const cloud = document.querySelector('#clouds');
    const humid = document.querySelector('#humidity');
    const speed = document.querySelector('#speed');
    const guage = document.querySelector('#guage');
    const main = document.querySelector('#main');
    const myForm = document.querySelector('#myForm');
    const id = 'ff1e36b6d1fa8a9c81b12e34a28354fc';//my api id
    const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+id;
    const list = document.querySelector('main > section > ul');
    

    myForm.addEventListener('submit', function(e){
        // alert('hello')
        console.log(searchBar.value)//For me to see and know that it selecting what the user inputed
        e.preventDefault(); //Prevents the default action of reloading the page
        if(searchBar.value != ''){
            searchWeather();
        }
        //Automatic updates every 2 mins
        setInterval(searchWeather(searchWeather.value),60000);
    })
    //Toggle section
    const flip = document.getElementById('toggle');//selection the switch_mode button for manipulation

    flip.addEventListener('click', function(e){
        main.classList.toggle('dark');
        myForm.classList.toggle('dark');
        list.classList.toggle('dark');

    })

    const searchWeather = () => {
        //makes a request to the weather api with the value entered by the user
        fetch(url+'&q='+searchBar.value)//Modifies  the url to search for the location entered by the user using the &q=
        .then(responsive => responsive.json())//Converts the api response to JSON format
        .then(data => {
            console.log(data);//logging the JSON string for manipulation and debugging
            if(data.cod == 200){//CHecking for successful code, if so it updates the following items
                city.querySelector('figcaption').textContent = data.name;//For changing the location to the location entered by the user
                temp.querySelector('figcaption span').textContent = data.main.temp //changes the temp to the temp of new location
                city.querySelector('img').src = 'https://flagsapi.com/'+data.sys.country+'/shiny/32.png' //This modifies the flag by changing it`s status code to that of the location entered by the user

                temp.querySelector('img').src = 'https://openweathermap.org/img/wn/'+ data.weather[0].icon+'@4x.png' //edits the image of the cloud to suit the environment of the location

                description.textContent = data.weather[0].description; //modifies the description section

                cloud.innerText = data.main.feels_like;
                humid.innerText = data.main.humidity;
                speed.innerText = data.wind.speed;
                guage.innerText = data.main.pressure;
            }else{
                //Error Handling
                main.classList.add('error');
                
                setTimeout(() => {//Gives a time for the error to run while delaying the execution of the callback function
                    main.classList.remove('error');
                    alert('Location Not Found');//what I really understand
                }, 1000); //1000milliseconds is 1 second
            }
            searchBar.value = '';//Resets the input field to empty whether the code runs successfuly or not
        })
    }
    //              Initial Apps, Default Location
    // const userDefault = () => {
    //     if(navigator.geolocation){
    //         navigator.geolocation.getCurrentPosition(position => {
    //             const {lat, long} = position.coords;//Gets the lang and long of the user

    //             //Fetching weather using their coordinates
    //             fetch('')
    //         })
    //     }
    // }
    const initApp = () => {
        searchBar.value = 'lagos';
        searchWeather();
    }
    initApp();

});

