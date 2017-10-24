import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

/*
class Square extends React.Component {
	render(){
		return (
			<button
				className="square"
				onClick={ () => this.props.onClick() }>
				{this.props.value}
			</button>
		)
	}
}
*/
function Square(props){
	return (
		<button className="square" onClick={props.onClick}>
			{props.value}
		</button>
	)
}

class Board extends React.Component {
	renderSquare(i) {
		return (
			<Square
				key={i}
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		)
	}

	render(){
		let html = []
		let arr = [[0,1,2],[3,4,5],[6,7,8]]
		for(let i=0; i<3; i++){
			let squares = []
			for(let j=0; j<3; j++){
				squares.push(this.renderSquare(arr[i][j]))
			}
			html.push(<div key={i} className="board-row">{squares}</div>)
		}
		return html
	}
}

class Game extends React.Component {
	constructor(){
		super()
		this.state = {
			history: [
				{ squares: Array(9).fill(null) }
			],
			locations: [
				{ moves: [] }
			],
			stepNumber: 0,
			xIsNext: true
		}
	}

	handleClick(i){
		const history = this.state.history.slice(0, this.state.stepNumber + 1)
		const locations = this.state.locations.slice(0, this.state.stepNumber + 1)
		const current = history[history.length - 1]
		const squares = current.squares.slice()
		if(calculateWinner(squares) || squares[i]){
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O'
		const present = history.concat([{squares:squares}])
		let moves = makeLocations(present, 1)
		this.setState({
			history: present,
			locations: locations.concat({
				moves: moves
			}),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		})
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) === 0
		})
	}

	prettyDesc(desc, move){
		if(move === this.state.stepNumber) return <span className="super-bold">{desc}</span>
		else return desc
	}

	render() {
		const history = this.state.history
		const locations = this.state.locations
		const current = history[this.state.stepNumber]
		const winner = calculateWinner(current.squares)

		const moves = history.map((step, move) => {
			const desc = move ?
				'Go to move #' + move + '(' + locations[move].moves + ')':
				'Go to game start'
			return (
				<li key={move}>
					<button onClick={() => this.jumpTo(move)}>{this.prettyDesc(desc, move)}</button>
				</li>
			)
		})

		let status;
		if (winner) {
			status = 'Winner: ' + winner
		} else {
			status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
		}
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
		)
	}
}

ReactDOM.render(
	<Game />,
	document.getElementById('root')
)

function calculateWinner(squares) {
	const lines = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]
	]
	for(let i = 0; i < lines.length; i++){
		const [a, b, c] = lines[i]
		if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a]
		}
	}
	return null
}

function makeLocations(history, index, moves) {
	moves = moves || []
	if(history.length === index){
		return moves
	}
	moves.push(addMove(history[index].squares.slice(), moves))
	return makeLocations(history, index + 1, moves)
}

function addMove(squares, moves) {
	for(let i=0; i<squares.length; i++){
		if(squares[i] && !moves.includes(i)) return i
	}
	return
}
