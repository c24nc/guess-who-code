import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"

function Square(props) {

  // if props.value is '⬜' then it needs to have the blur CSS class added
  const blurClass = props.value == '⬜' ? " blur" : "";

  return (
    <button id={props.id} className={"square " + props.id + blurClass} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        id={"squares" + i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {


    return (


      <div>

        <div id="logo"></div>
        <table>
          <tr>
            <td> <button id="play" onClick={() => {
              this.props.handleCharacter()
            }
            }>PLAY</button></td>
            <td>
              <button id="undo" onClick={() => { this.props.handleUndo() }}>
                UNDO
              </button>
            </td>
          </tr>
        </table>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}

        </div>
        <div className="board-row">
          {this.renderSquare(8)}
          {this.renderSquare(9)}
          {this.renderSquare(10)}
          {this.renderSquare(11)}
          {this.renderSquare(12)}
          {this.renderSquare(13)}
          {this.renderSquare(14)}
          {this.renderSquare(15)}

        </div>
        <div className="board-row">
          {this.renderSquare(16)}
          {this.renderSquare(17)}
          {this.renderSquare(18)}
          {this.renderSquare(19)}
          {this.renderSquare(20)}
          {this.renderSquare(21)}
          {this.renderSquare(22)}
          {this.renderSquare(23)}

        </div>
        <div className="board-row">
          {this.renderSquare(24)}
          {this.renderSquare(25)}
          {this.renderSquare(26)}
          {this.renderSquare(27)}
          {this.renderSquare(28)}
          {this.renderSquare(29)}
          {this.renderSquare(30)}
          {this.renderSquare(31)}

        </div>
        <MainCharacter choice={this.props.mainCharacter} show={this.props.showCharacter} />


      </div>
    );
  }
}

class MainCharacter extends React.Component {
  render() {
    return (
      <div id="character">YOUR CHARACTER:<center><div id="person" className={this.props.show ? ("squares" + this.props.choice) : ""}></div></center></div>
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [Array(9).fill(null)],
      stepNumber: 0,
      xIsNext: true,
      mainCharacter: Math.round(Math.random() * 31), //pick random
      showCharacter: false,
    };
  }

  // define a function handleUndo that gets called when Undo button is clicked
  handleUndo() {

    // to undo, or go "back" by one, remove last item (move) in history list
    // reminder, history is a list of squares
    // slice(0,-1) removes the last item
    let newHistory = [...this.state.history.slice(0, -1)]

    // update state with new history and new stepNumber
    // subtract 1 from stepNumber
    this.setState(
      {
        history: newHistory,
        stepNumber: this.state.stepNumber - 1
      }
    )
  }

  // change showCharacter from true to false and vice versa every time "play is clicked"
  handleCharacter() {
    this.setState({ showCharacter: !this.state.showCharacter })
  }

  // startGame(i) {
  //   const people = [squares]
  //   const random = Math.round(Math.random()*31)
  //   const player = people[random]
  // }

  // handle square click
  handleClick(i) {
    // currentSquares is the last item in history list
    // the index of the last item is the same as the stepNumber
    const currentSquares = [...this.state.history[this.state.stepNumber]];

    if (calculateWinner(currentSquares) || currentSquares[i]) {
      return;
    }

    // update currentSquares to have '⬜' for square that was clicked (index i)
    currentSquares[i] = this.state.xIsNext ? '⬜' : '⬜';

    // update state
    this.setState({
      history: history.concat([currentSquares]), // add updated currentSquares
      stepNumber: this.state.stepNumber + 1, // increment stepNumber by 1
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const currentSquares = history[this.state.stepNumber];
    const winner = calculateWinner(currentSquares);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      // status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={currentSquares}
            onClick={(i) => this.handleClick(i)}
            mainCharacter={this.state.mainCharacter}
            showCharacter={this.state.showCharacter}
            handleCharacter={() => this.handleCharacter()}
            handleUndo={() => this.handleUndo()}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // for (let i = 0; i < lines.length; i++) {
  //   const [a, b, c] = lines[i];
  //   if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
  //     return squares[a];
  //   }
  // }
  return null;
}