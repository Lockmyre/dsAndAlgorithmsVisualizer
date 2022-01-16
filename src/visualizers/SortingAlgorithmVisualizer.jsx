import React from 'react';
import '../styles/SortingAlgorithmVisualizer.css';
import {_mergeSort} from '../sortingAlgorithms/sortingAlgorithms.js';
import {_selectionSort} from '../sortingAlgorithms/sortingAlgorithms.js';

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
			sortingArray.push(randomInteger(5, 501));
		}

		this.setState({sortingArray});
	}

	componentDidMount() {
		this.resetSortingArray(75);
	}

	handleSortClick = () => {
		if(currentButton != null) {
			switch(currentButton.props.value) {
				case("Merge Sort"):
					mergeSort(this.state.sortingArray);
					break;
				case("Selection Sort"):
					selectionSort(this.state.sortingArray);
					break;
				case("Generate New Array"):
					alert("Generate New Array");
					break;
				default:
					alert("Quicksort");
					break;
			}
		}
	}

	handleGenerateNewArrayClick = () => {
		this.resetSortingArray(100);
	}

	render() {
		const {sortingArray} = this.state;

		return (
			<body>
				<SortingAlgorithmHeader 
					sortingArray={this.state.sortingArray}
					handleSortClick={this.handleSortClick}
					handleGenerateNewArrayClick={this.handleGenerateNewArrayClick}
					/>
				<div id="arrayElementContainer">
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

class GenerateNewArrayButton extends React.Component {
	render() {
		return (
			<button
			id="generateNewArrayButton"
			onClick={this.props.handleGenerateNewArrayClick}>
			Generate New Array
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
			<div id="sortingAlgorithmHeader">
				<div className="sortingButtonContainer">
					<span id="generateNewArrayButtonContainer">
						<GenerateNewArrayButton
							handleGenerateNewArrayClick={this.props.handleGenerateNewArrayClick}
						/>
					</span>
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
	const arrayBars = document.getElementsByClassName("arrayElementBar");

	_mergeSort(array, tempArray, 0, array.length - 1, animationArray);

	for (let i = 0; i < animationArray.length; i++) {
	const doesColorChange = i % 3 !== 2;

		if (doesColorChange) {
			const [barOneIndex, barTwoIndex] = animationArray[i];
			const barOneStyle = arrayBars[barOneIndex].style;
			const barTwoStyle = arrayBars[barTwoIndex].style;
			const color = i % 3 === 0 ? 'red' : 'turquoise';
			setTimeout(() => {
				barOneStyle.backgroundColor = color;
				barTwoStyle.backgroundColor = color;
			}, i * 10);
		} else {
			setTimeout(() => {
				const [barOneIndex, newHeight] = animationArray[i];
				const barOneStyle = arrayBars[barOneIndex].style;
				barOneStyle.height = `${newHeight}px`;
			}, i * 10);
		}
	}
}

function selectionSort(array) {
	const animationArray = [];
	const arrayBars = document.getElementsByClassName("arrayElementBar");
	const compare = "compare";
	const newSmallest = "newSmallest";
	const swap = "swap";
	var firstCompared = arrayBars[0];
	firstCompared.style.backgroundColor = 'red';
	var secondCompared = arrayBars[1];
	secondCompared.style.backgroundColor = 'red';
	_selectionSort(array, array.length, animationArray);

	for (let i = 0; i < animationArray.length; i++) {
		setTimeout(() => {
			if (animationArray[i][0].valueOf() === compare) {
				firstCompared.style.backgroundColor = 'turquoise';
				secondCompared.style.backgroundColor = 'turquoise';
				firstCompared = arrayBars[animationArray[i][1]];
				secondCompared = arrayBars[animationArray[i][2]];
				firstCompared.style.backgroundColor = 'red';
				secondCompared.style.backgroundColor = 'red';
			}
			else if (animationArray[i][0].valueOf() === newSmallest) {
				firstCompared.style.backgroundColor = 'turquoise';
				firstCompared = arrayBars[animationArray[i][2]];
				firstCompared.style.backgroundColor = 'red';
			}
			else {
				let barOneStyle = arrayBars[animationArray[i][1]].style;
				let barTwoStyle = arrayBars[animationArray[i][2]].style;

				let temp = barOneStyle.height;
				barOneStyle.height = `${barTwoStyle.height}`;
				barTwoStyle.height = `${temp}`
			}
		}, i * 10);
	}
}

function flash(array) {
	setTimeout(() => {
		for (let i = 0; i < array.length; i++) {
			const barStyle = array[i].style;
			barStyle.backgroundColor = 'red';
		}
	}, 100);

	setTimeout(() => {
		for (let i = 0; i < array.length; i++) {
			const barStyle = array[i].style;
			barStyle.backgroundColor = 'turquoise';
		}
	}, 1000);
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