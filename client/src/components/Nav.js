import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import AppBarChild from './AppBarChild'

const Nav = () => (
  <AppBar style={{ position: 'fixed' }}
    title={<AppBarChild />}
    showMenuIconButton={false}
  />
   
);

export default Nav