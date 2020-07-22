import React, { Component} from 'react';
import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';

class Directory extends Component {
    state = {
        sections: [
            {
              title: 'hats',
              imageUrl: 'https://i.ibb.co/cvpntL1/hats.png',
              id: 1,
              linkUrl: 'hats'
            },
            {
              title: 'jackets',
              imageUrl: 'https://i.ibb.co/px2tCc3/jackets.png',
              id: 2,
              linkUrl: 'jackets'
            },
            {
              title: 'sneakers',
              imageUrl: 'https://i.ibb.co/0jqHpnp/sneakers.png',
              id: 3,
              linkUrl: 'sneakers'
            },
            {
              title: 'womens',
              imageUrl: 'https://i.ibb.co/GCCdy8t/womens.png',
              id: 4,
              size: 'large',
              linkUrl: 'womens'
            },
            {
              title: 'mens',
              imageUrl: 'https://i.ibb.co/R70vBrQ/men.png',
              id: 5,
              size: 'large',
              linkUrl: 'mens'
            }
          ] 
    };

    render() {
        return (
            <div className='directory-menu'>
            {
                //this.state.sections.map( (section) => {
                // this.state.sections.map( ({title, imageUrl, id, size, linkUrl}) => (
                //     <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}></MenuItem>
                // ))
                this.state.sections.map( ({id, ...sectionProps}) => ( // spread parameter gets all method of section object
                    <MenuItem key={id} {...sectionProps}></MenuItem> //update all properties for props MenuItem components including match and history
                ))
            }      
            </div>
        );
    }
}
   

export default Directory;
