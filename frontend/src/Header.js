import React, {Component} from 'react';
import {Toolbar, AppBar} from '@material-ui/core';
//import {Link} from 'react-router-dom';


class Header extends Component {
    render() {
        return (
            <AppBar position="static" color="transparent">
                <Toolbar variant="dense" >
            </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
