import { Component } from "react";
import shuffle from "shuffle-array";
import Card from './Card';
import NavBar from "./NavBar";
import ScoreBoard from "./ScoreBoard";
import './MemoryGame.css';

const NUM_CARD = 16;

const CardState = {
	HIDING: 0,
	SHOWING: 1,
	MATCHING: 2
}

class MemoryGame extends Component {
	constructor(props) {
		super(props);
		let cards = [
			{id: 0, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 1, cardState: CardState.HIDING, backgroundColor: 'red'},
      {id: 2, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 3, cardState: CardState.HIDING, backgroundColor: 'navy'},
      {id: 4, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 5, cardState: CardState.HIDING, backgroundColor: 'green'},
      {id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow'},
      {id: 8, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 9, cardState: CardState.HIDING, backgroundColor: 'black'},
      {id: 10, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 11, cardState: CardState.HIDING, backgroundColor: 'purple'},
      {id: 12, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 13, cardState: CardState.HIDING, backgroundColor: 'pink'},
      {id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
      {id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'}
		];
		cards = shuffle(cards);
		this.state = {cards, noClick: false, numTurn: 0, numMatched: 0, record: NaN};
		this.handleNewGame = this.handleNewGame.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	incrementTurn () {
    this.setState(prevState => {
      return {numTurn: prevState.numTurn + 1}
    })
  }
	incrementMatched () {
    this.setState(prevState => {
      return {numMatched: prevState.numMatched + 1}
    })
  }


	handleNewGame() {
		let record = JSON.parse(localStorage.getItem('record')) || NaN;
		let noClick = false;
		let cards = this.state.cards.map(c => ({
			...c,
			cardState: CardState.HIDING
		}));
		cards = shuffle(cards);
		this.setState({cards, noClick, numTurn: 0, numMatched: 0, record});
	}

	handleClick(id) {
		const mapCardState = (cards, idsToChange, newCardState) => {
			return cards.map(c => {
				if (idsToChange.includes(c.id)) {
					return {
						...c,
						cardState: newCardState
					};
				}
				return c;
			});
		}

		const foundCard = this.state.cards.find(c => c.id === id);

		if (this.state.noClick || foundCard.cardState !== CardState.HIDING) {
			return;
		}

		let noClick = false;

		let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

		const showingCards = cards.filter(c => c.cardState === CardState.SHOWING);

		const ids = showingCards.map(c => c.id);

		if (showingCards.length === 2 &&
				showingCards[0].backgroundColor === showingCards[1].backgroundColor) {
					cards = mapCardState(cards, ids, CardState.MATCHING);
					this.incrementTurn();
					this.incrementMatched();
				} else if (showingCards.length === 2) {
					this.incrementTurn();

					let hidingCards = mapCardState(cards, ids, CardState.HIDING);
					
					noClick = true;

					this.setState({cards, noClick}, () => {
						setTimeout(() => {
							this.setState({cards: hidingCards, noClick: false});
						}, 500);
					});
					return;
				}

				this.setState({cards, noClick});
	}

	componentDidUpdate() {
		if (this.state.numMatched === NUM_CARD / 2) {
			if (this.updateRecord()){
				setTimeout(() => {
					alert("WIN with NEW RECORD!");
					this.handleNewGame();
				}, 500);
			} else {
				setTimeout(() => {
					alert("WIN!");
					this.handleNewGame();
				}, 500);
			}
		}
	}

	updateRecord() {
		if (this.state.record > this.state.numTurn || isNaN(this.state.record)) {
			localStorage.setItem('record', this.state.numTurn);
			return true;
		}
		return false;
	}


	render() {
		const cards = this.state.cards.map((card) => (
			<Card 
			key={card.id} 
			showing={card.cardState !== CardState.HIDING} 
			backgroundColor={card.backgroundColor}
			onClick={() => this.handleClick(card.id)}
			/>
		));

		return (
			<div>
				<NavBar onNewGame={this.handleNewGame} />
				<ScoreBoard 
					bestRecord = {this.state.record}
					numTurns = {this.state.numTurn}
					matchedPairs = {this.state.numMatched}
				/>
				<div className="cards">{cards}</div>
			</div>
		)
	}
}

export default MemoryGame;