import React, { Component } from 'react';
import './Navigation.css';
/*
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
  */
//React.Component
class Navigation extends Component { 
  render() {
    const sections = ['Home', 'About', 'Courses', 'Youtube', 'Linkedin', 'Github'];
    const navLinks = sections.map(section=>{
        return (
            <li><a href={'#' + section }>{section}</a></li>
        )
    });
    return (
        <nav>
          <div>
            <h2 className="logo"><a href="https://www.sac.edu/Pages/default.aspx" target="_blank">SAC</a></h2>
            <h2>{this.props.logoTitle}</h2>
          </div>

            <ul>
              <li><a href="#" target="_blank">Home</a></li>
              <li><a href="#" target="_blank">About</a></li>
              <li><a href="#" target="_blank">Courses</a></li>
              <li><a href="https://www.youtube.com/channel/UC6SmN_XPGFO5Sum5n1EVZjQ?view_as=subscriber" target="_blank">Youtube</a></li>
              <li><a href="https://www.linkedin.com/in/tan-ho-7518a1a2/" target="_blank">Linkedin</a></li>
              <li><a href="https://github.com/nhattanho" target="_blank">Github</a></li>
            </ul>
        </nav>
    )
  }
}

export default Navigation;
