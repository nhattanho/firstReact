/* AJAX: Asynchronous JavaScript And XML                   API: Application Programming Interface
                ^              | 
HTTP request    |              | 
(GET, POST,     |              |  Response
DELETE....))    |              v 
        App running on client base - Browser
*/
// function getTemperature(id) {
//         fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`)
//         .then( result => {
//                 console.log(result);
//                 return result.json(); // return a promise, and in promise, it contains a json data
//         })
//         .then(data =>{
//                 console.log(data); // data is json data <=> an object
//                 let today = data.consolidated_weather; // today is an array
//                 let max = 0, min = 0;
//                 console.log(today.length);
//                 today.forEach( (el, index) => {
//                         console.log(`Temp_min[${index}] is ${el.min_temp}`);
//                         console.log(`Temp_max[${index}] is ${el.max_temp}`);
//                         max += el.max_temp;
//                         min += el.min_temp;
//                 });
//                 console.log(`min: ${min}`);
//                 console.log(`max: ${max}`);
//                 max = (max/today.length).toFixed(2);
//                 min = (min/today.length).toFixed(2);
//                 let info = `Temperature today in ${data.title} at time ${data.time} is between 
//                 ${min} and ${max}`;
//                 console.log(info);
//         })
//         .catch(er => {
//                 console.log(er);
//         })
// }
// getTemperature(2487956);

/* await is only valid in async functions and async generators
const res1 = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`);
let data = await res1.json();
*/
/****************************Using Async/Await**************************/
async function getTemperature(id) {
        try {
                const result = await fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${id}/`);
                let data = await result.json();
                console.log(data); // data is json data <=> an object
                let today = data.consolidated_weather; // today is an array
                //let max = 0, min = 0; //=> just comment this line to create and testing for the error
                //console.log(today.length);
                today.forEach( (el, index) => {
                        // console.log(`Temp_min[${index}] is ${el.min_temp}`);
                        // console.log(`Temp_max[${index}] is ${el.max_temp}`);
                        max += el.max_temp;
                        min += el.min_temp;
                });
                // console.log(`min: ${min}`);
                // console.log(`max: ${max}`);
                max = (max/today.length).toFixed(2);
                min = (min/today.length).toFixed(2);
                let info = `Temperature today in ${data.title} at time ${data.time} is between 
                ${min} and ${max}`;
                console.log(info);

                return [min, max]; // this is an result of the promise returned by async function

        /*Assume this async function has an error, and we have try catch in itself, this error
        will be catched in this function itself, after that it will return nothing, because the
        the error makes this function cannot return [min, max] in try{}. It just likes the error has been
        already processed in its function. However, return nothing is different the error after all,
        that's why the catch of then method, outside of this function cann't get this original error,
        and console.log(res) => will print undefined. So, if we want to test the error happening like
        that, we can make a return like return [1.0, 5.0];, so we can see that even the error happens, 
        (actually, it wil be catched in catch(err >{}) ), in the function getTemperature(..), console.log(res)
        still print the result [1.0, 5.0]*/
        } catch(err) { 
                console.log(err); 
                //return [1.0, 5.0];               
        } 
}

getTemperature(2487956).then(res=>{
        console.log(res);
}).catch(err => {
        alert(err); // if we don't make a try catch directly in async function, the orginal error will be catched in
}); // this alert(err)