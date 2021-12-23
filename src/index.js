import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Квадрат классовый компонет
// class Square extends React.Component {
//    render() {
//       return (
//          <button className="square" 
//          onClick={() => {this.props.onClick()}}>
//             {this.props.value}
//          </button>
//       );
//    }
// }

//Вызывается при проверке победы
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
   for (let i = 0; i < lines.length; i++) {
     const [a, b, c] = lines[i];
     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
       return squares[a];
     }
   }
   return null;
 }

//функциональный компонет
function Square(props){
   return(
      //props.onClick - переданая функция
      //props.value - Изачение из масива
      <button className="square" onClick = {props.onClick}>
         {props.value}
      </button>
   )
}

//Доска. 3 шаг
class Board extends React.Component {
   //4 шаг. Вызываем функцианальный компонент и передает данные из памяти
   renderSquare(i) {
      return (
         <Square
           value={this.props.squares[i]}
           onClick={() => this.props.onClick(i)}
         />
      );
   }

   //3 шаг
   render() {
      return (
         <div>
            <div className="board-row">
               {this.renderSquare(0)}
               {this.renderSquare(1)}
               {this.renderSquare(2)}
            </div>
            <div className="board-row">
               {this.renderSquare(3)}
               {this.renderSquare(4)}
               {this.renderSquare(5)}
            </div>
            <div className="board-row">
               {this.renderSquare(6)}
               {this.renderSquare(7)}
               {this.renderSquare(8)}
            </div>
         </div>
      );
   }
}

//Игра 1 шаг
class Game extends React.Component {
   constructor(props) {
      super(props);
      //Создаем массив с обектом массива из 9 элементов null
      //xIsNext - очередь
      this.state = {
         history: [{
            squares: Array(9).fill(null),
         }],
         xIsNext: true,
         stepNumber: 0,
      };
   }

   //Вызывается при клике на блок
   handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();


      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
   }

   //Функция номера хода
   //xIsNext - меняется если номер хода четный или не четный
   jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
   }

   //2 шаг
   render() {
      const history = this.state.history; // Массив массивов
      const current = history[this.state.stepNumber];

      const moves = history.map((step, move) => {
         const desc = move ?
           'Перейти к ходу #' + move :
           'К началу игры';
         return (
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
         );
       });

      //Провекка на победителя
      const winner = calculateWinner(current.squares);
      let status;
      if (winner) {
        status = 'Выиграл ' + winner;
        alert(status);
      } else {
        status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      //current.squares - squares в оъбекте current из общего массива
      //this.handleClick(i) - функция для проверки и хода
      return (
         <div className="game">
            <div className="game-board">
               <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
               />
            </div>
            <div className="game-info">
               <div>{status}</div>
               <ol>{moves}</ol>
            </div>
         </div>
      );
   }
}

// ========================================

ReactDOM.render(
   <Game />,
   document.getElementById('root')
);


