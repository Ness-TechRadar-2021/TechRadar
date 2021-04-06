import React, {Component} from 'react';
import Search from "@material-ui/icons/Search";
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';

class Navbar extends Component {
    render() {
        return (
            <div>
                <div>
                <button color="black" aria-label="edit" onClick={this.props.clicked}>
                  <AddIcon />
                </button>
              </div>
            </div>
              
              );
    }
}

export default Navbar;