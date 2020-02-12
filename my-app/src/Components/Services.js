import React, { Component } from 'react';
import '../CSS/Services.css';

class Services extends Component { 
    render() {
      return (
        
        <div className="background">
          <div className="services">
              <h3>services</h3>
              <h2>We are offering</h2>
              <div className="row">
                  <div>
                    <span>
                      <i class="fas fa-users"></i>
                    </span>
                    <h4>Community</h4>
                    <p>Let's join with us</p>
                  </div>

                  <div>
                    <span>
                      <i class="fas fa-edit"></i>
                    </span>
                    <h4>Response</h4>
                    <p>Give your opinion</p>
                  </div>

                  <div>
                    <span>
                      <i class="fas fa-thumbs-up"></i>
                    </span>
                    <h4>Favorited</h4>
                    <p>Do you like it?</p>
                  </div>

                  <div>
                    <span>
                      <i class="fas fa-question"></i>
                    </span>
                    <h4>Question</h4>
                    <p>Post your question</p>
                  </div>
              </div>
          </div>
        </div>
      )
    }
  }
  
  export default Services;