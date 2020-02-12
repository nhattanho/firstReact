import React, { Component } from 'react';
import '../CSS/Clock.css';

function date_time(id)
{
    var date = new Date;
    var h = date.getHours();
    if(h<10)
    {
            h = "0"+h;
    }
    var m = date.getMinutes();
    if(m<10)
    {
            m = "0"+m;
    }
    var s = date.getSeconds();
    if(s<10)
    {
            s = "0"+s;
    }
    document.getElementById("s").innerHTML = ''+s;
    document.getElementById("m").innerHTML = ''+m;
    document.getElementById("h").innerHTML = ''+h;
    setTimeout(function(){ date_time() }, 1000);
    return true;
}
window.onload = date_time('s');

class Clock extends Component { 
    render() {
        return (
        <div></div>
        )
    }
}
    
export default Clock;