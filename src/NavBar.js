import PropTypes from 'prop-types'
import './NavBar.css'

const NavBar = ({onNewGame}) => (
	<header>
		<h2>Memory Game</h2>
		<nav>
			<li>{
				// eslint-disable-next-line
				}<a onClick={onNewGame}>New Game</a>
			</li>
		</nav>
	</header>
);

NavBar.propTypes = {
	onNewGame: PropTypes.func.isRequired
};

export default NavBar;