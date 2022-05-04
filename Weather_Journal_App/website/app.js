//setting the date and time of the day
var date = new Date();
date = date.toDateString();

//open weather api url and key
const zipUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const APIkey = '&appid=585712155af2bdceb6c1585c79aef802&units=imperial';


/*
*   @param {url, data} url - http route that the data gets posted to, data - the object that has the information posted in the route
*   @description posts a data object into the server endpoint
*   @returns none
*/
const postData = async (url='', data={})=> {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });
    
    try{
        const newData = await response.json();
    }
    catch(error){
        console.log('error',error);
    }

}

const getDataFromAPI = async (url, zip, key)=> {
    const response = await fetch(url+zip+key);
    
    try{
        const data = response.json();
        console.log(data);
        return data;
    }
    catch(error){
        console.log("THIS IS AN ERROR")
        console.log('error' + error);
    }
}


document.getElementById('generate').addEventListener('click', (e)=> {
    const zipCode = document.getElementById('zip').value;
    getDataFromAPI(zipUrl,zipCode,APIkey)
    .then(function(Data){
        const newEntry = {
            Temp: Math.round(Data.main.temp),
            Sky: Data.weather[0].main,
            Date: date,
            Feeling: document.querySelector('#feelings').value
        }
        postData('/data', newEntry)
    })
    .then(function(){
        updateUI();
    })
})

const updateUI = async ()=> {
    const request = await fetch('/all');

    try{
        const information = await request.json();
        document.getElementById('temp').innerHTML += " " + information.Temp + '&deg;';
        document.getElementById('sky').innerHTML += " " + information.Sky;
        document.getElementById('date').innerHTML += " " + information.Date;
        document.getElementById('content').innerHTML += " " + information.Feeling;
    }
    catch(error){
        console.log('error', error);
    }
}