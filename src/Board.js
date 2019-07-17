import React, {Component} from 'react';
import Cell from './Cell';
import './Board.css'

class Board extends Component {
     static defaultProps = {
          nrows: 5,
          ncols: 5,
          chanceLightStartsOn: 0.25
     }
     constructor(props) {
          super(props);
          this.state = {
               hasWon: false,
               board: this.createBoard()
          }
     }
     createBoard() {
          let board = [];
          for (var i = 0; i < this.props.nrows; i++) {
               let row = [];
               for (var j = 0; j < this.props.ncols; j++) {
                    row.push(Math.random() < this.props.chanceLightStartsOn);
               }
               board.push(row);
          }
          return board;
     }
     flipCellsAroundMe(coord) {
          console.log(coord);
          let {ncols, nrows} = this.props;
          let board = this.state.board;
          let [y, x] = coord.split("-").map(Number);


          function flipCell(y, x) {
            if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
              board[y][x] = !board[y][x];
            }
          }
          flipCell(y, x);
          flipCell(y, x-1);
          flipCell(y, x+1);
          flipCell(y-1, x);
          flipCell(y+1, x);

          let hasWon = board.every(row => row.every(cell => !cell));
          this.setState({board: board, hasWon: hasWon});
     }
     makeTable() {
          let cellGrid = [];
          for (var i = 0; i < this.props.nrows; i++) {
               let row = [];
               for (var j = 0; j < this.props.ncols; j++) {
                    let coord = `${i}-${j}`;
                    row.push(<Cell key={coord}
                                   isLit={this.state.board[i][j]}
                                   flipCellsAroundMe={() => (
                                        this.flipCellsAroundMe(coord)
                                   )} />)
               }
               cellGrid.push(<tr key={`${i}`}>{row}</tr>);
          }
          return cellGrid;
     }
     render() {
          if (this.state.hasWon) {
               return (
                    <div className="Board">
                         <div className="Board-win-text">
                              <div className="neon-orange">Congratulations!</div>
                              <div className="neon-blue">You won</div>
                         </div>
                    </div>
               );
          }
          return (
               <div className="Board">
               {
                    this.state.hasWon ?
                    <div className="Board-win-text">
                         <div className="neon-orange">Congratulations!</div>
                         <div className="neon-blue">You won</div>
                    </div> :
                    <div className="Board-title">
                         <div className="neon-orange">Lights</div>
                         <div className="neon-blue">Out!</div>
                    </div>
               }
               <table className="Board-table">
                    <tbody>
                         {this.makeTable()}
                    </tbody>
               </table>
               </div>
          )
     }
}

export default Board;
