import React, { Component } from 'react';
import './Navigation.css';

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
