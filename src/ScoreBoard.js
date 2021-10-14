import { Component } from 'react';
import PropTypes from 'prop-types'
import './ScoreBoard.css'

class ScoreBoard extends Component {

	render() {
		return(
			<scoreboard>
				<h2>Score</h2>
				<nav>
					<li>Best Record: {this.props.bestRecord}</li>
					<li>Number of Turns: {this.props.numTurns}</li>
					<li>Matched Pairs: {this.props.matchedPairs}</li>
				</nav>
			</scoreboard>
		)
	}
}

ScoreBoard.propTypes = {
	bestRecord: PropTypes.number.isRequired,
	numTurns: PropTypes.number.isRequired,
	matchedPairs: PropTypes.number.isRequired
}

export default ScoreBoard;