import React, {Component} from 'react';
import './Cell.css'

class Cell extends Component {
     constructor (props) {
          super(props);
          this.handleClick = this.handleClick.bind(this);
     }
     handleClick(e) {
          this.props.flipCellsAroundMe();
     }
     render() {
          let addClass = this.props.isLit ?  " Cell-lit": "";
          let classes = "Cell" + addClass;
          return (
               <td className={classes} onClick={this.handleClick} />
          )
     }
}

export default Cell;
