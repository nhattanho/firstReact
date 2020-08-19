import React from 'react';
import './directory.styles.scss';
import MenuItem from '../menu-item/menu-item.component';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectDirectorySections} from '../../redux/directory/directory.selector';

const Directory = ({section}) => {
  return (
      <div className='directory-menu'>
      {
          //this.state.sections.map( (section) => {
          // this.state.sections.map( ({title, imageUrl, id, size, linkUrl}) => (
          //     <MenuItem key={id} title={title} imageUrl={imageUrl} size={size} linkUrl={linkUrl}></MenuItem>
          // ))
          section.map( ({id, ...sectionProps}) => ( // spread parameter gets all method of section object
              <MenuItem key={id} {...sectionProps}></MenuItem> //update all properties for props MenuItem components including match and history
          ))
      }      
      </div>
  );
}

const mapStateToProps = createStructuredSelector({
  section: selectDirectorySections
})

export default connect(mapStateToProps)(Directory);
