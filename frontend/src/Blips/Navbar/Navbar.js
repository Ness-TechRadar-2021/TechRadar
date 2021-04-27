import React, {Component} from 'react';
import AddIcon from '@material-ui/icons/Add';

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