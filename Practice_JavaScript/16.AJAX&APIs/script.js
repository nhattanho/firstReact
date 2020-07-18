/* AJAX: Asynchronous JavaScript And XML                   API: Application Programming Interface
                ^              | 
HTTP request    |              | 
(GET, POST,     |              |  Response
DELETE....))    |              v 
        App running on client base - Browser
*/
function getTemperature(id) {
        fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`)
        .then( result => {
                console.log(result);
                return result.json(); // return a promise, and in promise, it contains a json data
        })
        .then(data =>{
                console.log(data); // data is json data <=> an array object
                let today = data.consolidated_weather;
                let max = 0, min = 0;
                console.log(today.length);
                today.forEach( (el, index) => {
                        console.log(`Temp_min[${index}] is ${el.min_temp}`);
                        console.log(`Temp_max[${index}] is ${el.max_temp}`);
                        max += el.max_temp;
                        min += el.min_temp;
                });
                console.log(`min: ${min}`);
                console.log(`max: ${max}`);
                max = (max/today.length).toFixed(2);
                min = (min/today.length).toFixed(2);
                let info = `Temperature today in ${data.title} at time ${data.time} is between 
                ${min} and ${max}`;
                console.log(info);
        })
        .catch(er => {
                console.log(er);
        })
}
getTemperature(2487956);

/* await is only valid in async functions and async generators
const res1 = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`);
let data = await res1.json();
*/
/****************************Using Async/Await**************************/
async function getTemperature(id) {
        const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`);
        let data = await result.json();
        console.log(data); // data is json data <=> an array object
        let today = data.consolidated_weather;
        let max = 0, min = 0;
        console.log(today.length);
        today.forEach( (el, index) => {
                console.log(`Temp_min[${index}] is ${el.min_temp}`);
                console.log(`Temp_max[${index}] is ${el.max_temp}`);
                max += el.max_temp;
                min += el.min_temp;
        });
        console.log(`min: ${min}`);
        console.log(`max: ${max}`);
        max = (max/today.length).toFixed(2);
        min = (min/today.length).toFixed(2);
        let info = `Temperature today in ${data.title} at time ${data.time} is between 
        ${min} and ${max}`;
        console.log(info);

        return [min, max];
}

getTemperature(2487956).then(res=>{
        console.log(res);
});