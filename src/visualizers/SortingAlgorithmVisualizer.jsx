import React from 'react';
import '../styles/SortingAlgorithmVisualizer.css';

export default class SortingAlgorithmVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sortingArray: [],
		};
	}

	resetSortingArray(arrayLength) {
		const sortingArray = [];
		for (let i = 0; i < arrayLength; i++) {
			sortingArray.push(randomInteger(5, 701));
		}

		this.setState({sortingArray});
	}

	componentDidMount() {
		this.resetSortingArray(150);
	}

	render() {
		const {sortingArray} = this.state;

		return (
			<body>
				<SortingAlgorithmHeader />
				<div className="arrayElementContainer">
					{sortingArray.map((value, index) => (
						<div 
						className="arrayElementBar" 
						key={index}
						style={{height: value}}>
						</div>
					))}
				</div>
			</body>
		);
	}
}

/*
function SortingAlgorithmButton(props) {
	return (
		<button className={"sortingAlgorithmButton"}>
			{props.value}
		</button>
	);
}
*/

class SortingAlgorithmButton extends React.Component {
	state = {selected: false}

	handleClick = () => {
		this.setState({
			selected: !this.state.selected
		})
	}

	render() {
		return (
			<button 
			className={this.state.selected ? "currentSortingAlgorithmButton" : "sortingAlgorithmButton"}
			onClick={() => this.handleClick()}>
			{this.props.value}
			</button>
		);
	}
}

function SortButton() {
	return (
		<button className="sortButton">
		Click to sort 
		</button>
	);
}

class SortingAlgorithmHeader extends React.Component {
	renderButton(text) {
		return (
			<SortingAlgorithmButton
			 	value={text}
			 	handleClick={this.handleClick}
			/>
		);
	}

	render() {
		return (
			<div className="sortingAlgorithmHeader">
				<div className="sortingButtonContainer">
					<span id="separator1"></span>
					{this.renderButton("Selection Sort")} 
					{this.renderButton("Insertion Sort")}
					{this.renderButton("Merge Sort")}
					{this.renderButton("Quicksort")}
					<span id="separator2"></span>
					<SortButton />
				</div>
			</div>
		);
	}
}


// Function retrieved from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInteger(start, end) {
	return Math.floor(Math.random() * (end - start) + start);
}