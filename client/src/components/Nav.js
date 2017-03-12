import React from 'react';
import AppBar from 'material-ui/AppBar';
import AppBarChild from './AppBarChild'

const Nav = (props) => (
 
  <AppBar style={{ position: 'fixed' }}
    title={ <div className={"container"}><AppBarChild path={props.path} user={props.user}/></div>}
    showMenuIconButton={false}
  />
);

export default Nav