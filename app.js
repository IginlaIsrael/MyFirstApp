const searchBar = document.querySelector('#searchBar');
const city = document.querySelector('#cityName');
const temp = document.querySelector('#temp');
const  description = document.querySelector('.description');
const cloud = document.querySelector('#clouds');
const humid = document.querySelector('#humidity');
const speed = document.querySelector('#speed');
const guage = document.querySelector('#guage');
const main = document.querySelector('#main');
console.log(guage);
const myForm = document.querySelector('#myForm');
const id = 'ff1e36b6d1fa8a9c81b12e34a28354fc';
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+id;
const list = document.querySelector('main > section > ul');
  

myForm.addEventListener('submit', function(e){
    // alert('hello')
    console.log(searchBar.value)
    e.preventDefault(); //Prevents the default action of reloading the page
    if(searchBar.value != ''){
        searchWeather();
    }
})

const flip = document.getElementById('toggle');

flip.addEventListener('click', function(e){
    main.classList.toggle('dark');
    myForm.classList.toggle('dark');
    list.classList.toggle('dark');

})

const searchWeather = () => {
    fetch(url+'&q='+searchBar.value)//Modifies  the url to search for the location entered by the user using the &q=
    .then(responsive => responsive.json())
    .then(data => {
        console.log(data);
        if(data.cod == 200){
            city.querySelector('figcaption').textContent = data.name;//For changing the location to the location entered by the user
            temp.querySelector('figcaption span').textContent = data.main.temp //changes the temp to the temp of new location
            city.querySelector('img').src = 'https://flagsapi.com/'+data.sys.country+'/shiny/32.png' //This modifies the flag by changing it`s status code to that of the location entered by the user

            temp.querySelector('img').src = 'https://openweathermap.org/img/wn/'+ data.weather[0].icon+'@4x.png' //edits the image of the cloud to suit the environment of the location

            description.textContent = data.weather[0].description; 

            cloud.innerText = data.clouds.all;
            humid.innerText = data.main.humidity;
            speed.innerText = data.wind.speed;
            guage.innerText = data.main.pressure;
        }else{
            //Error Handling
            main.classList.add('error');
            
            setTimeout(() => {
                main.classList.remove('error');
                alert('Location Not Found');//what I really understand
            }, 1000);
        }
        searchBar.value = '';
    })
}
//              Initial Apps, Default Location
const initApp = () => {
    searchBar.value = 'lagos';
    searchWeather();
}
initApp();
