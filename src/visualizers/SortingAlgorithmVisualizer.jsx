import React from 'react';
import '../styles/SortingAlgorithmVisualizer.css';
import {_mergeSort} from '../sortingAlgorithms/sortingAlgorithms.js';

var currentButton = null;

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

	handleSortClick = () => {
		if(currentButton != null) {
			switch(currentButton.props.value) {
				case("Merge Sort"):
					const animationArray = mergeSort(this.state.sortingArray);
					for (let i = 0; i < animationArray.length; i++) {
						const arrayBars = document.getElementsByClassName("arrayElementBar");
						const doesColorChange = i % 3 !== 2;

						if (doesColorChange) {
							const [barOneIndex, barTwoIndex] = animationArray[i];
							const barOneStyle = arrayBars[barOneIndex].style;
							const barTwoStyle = arrayBars[barTwoIndex].style;
							const color = i % 3 === 0 ? 'red' : 'turquoise';
							setTimeout(() => {
								barOneStyle.backgroundColor = color;
								barTwoStyle.backgroundColor = color;
							}, i * 5);
						} else {
							setTimeout(() => {
								const [barOneIndex, newHeight] = animationArray[i];
								const barOneStyle = arrayBars[barOneIndex].style;
								barOneStyle.height = `${newHeight}px`;
							}, i * 5);
						}
					}
					break;
				case("Selection Sort"):
					alert("Selection Sort");
					break;
				default:
					alert("default");
					break;
			}
		}

		flash(document.getElementsByClassName("arrayElementBar"));
	}

	render() {
		const {sortingArray} = this.state;

		return (
			<body>
				<SortingAlgorithmHeader 
					sortingArray={this.state.sortingArray}
					handleSortClick={this.handleSortClick}
					/>
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

class SortingAlgorithmButton extends React.Component {
	state = {selected: false}

	handleClick = () => {
		if (currentButton != null) {
			currentButton.setState({selected: false})
		}

		currentButton = this;
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

class SortButton extends React.Component {
	render() {
		return (
			<button 
			className="sortButton"
			onClick={this.props.handleSortClick}>
			Click to sort 
			</button>
		);
	}
}

class SortingAlgorithmHeader extends React.Component {
	renderButton(text) {
		return (
			<SortingAlgorithmButton
				value={text}
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
					<SortButton
						handleSortClick={this.props.handleSortClick}
					/>
				</div>
			</div>
		);
	}
}


// Function retrieved from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInteger(start, end) {
	return Math.floor(Math.random() * (end - start) + start);
}

function mergeSort(array) {
	const tempArray = [];
	const animationArray = [];

	_mergeSort(array, tempArray, 0, array.length - 1, animationArray);

	return animationArray;
}

function flash(array) {
	setTimeout(() => {
		for (let i = 0; i < array.length; i++) {
			array[i].style.backgroundColor = 'red';
		}
	}, 100);

	setTimeout(() => {
		for (let i = 0; i < array.length; i++) {
			array[i].style.backgroundColor = 'turquoise';
		}
	}, 100);
}

/*
function arraysAreEqual(arrayOne, arrayTwo) {
	if (arrayOne.length !== arrayTwo.length) return false;

	for (let i = 0; i < arrayOne.length; i++) {
		if (arrayOne[i] !== arrayTwo[i]) return false;
	}

	return true;
}
*/