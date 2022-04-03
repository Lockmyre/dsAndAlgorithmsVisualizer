import React from 'react';
import '../styles/Main.css';
import '../styles/Toolbar.css';
import * as sortingVisualizers from '../sortingAlgorithms/sortingAlgorithmVisualizers.jsx';

var currentButton = null;

export default class SortingAlgorithmVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			sortingArray: [],
			sortingSpeed: 50,
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
		document.getElementById("changeSize").value = 50;
		document.getElementById("changeSpeed").value = 50;
		this.resetSortingArray(100);
	}

	handleSortClick = () => {
		if(currentButton != null) {
			switch(currentButton.props.value) {
				case("Selection Sort"):
					sortingVisualizers.selectionSort(this.state.sortingArray, this.state.sortingSpeed);
					break;
				case("Insertion Sort"):
					sortingVisualizers.insertionSort(this.state.sortingArray, this.state.sortingSpeed);
					break;
				case("Merge Sort"):
					alert(this.state.sortingSpeed);
					sortingVisualizers.mergeSort(this.state.sortingArray, this.state.sortingSpeed);
					break;
				case("Quicksort"):
					sortingVisualizers.quickSort(this.state.sortingArray, this.state.sortingSpeed);
					break;
				default:
					break;
			}
		}
	}

	handleSizeChange = (evt) => {
		this.resetSortingArray(Math.floor((parseInt(evt.target.value) + 3) * 1.65));
	}
	handleSpeedChange = (evt) => {
		this.state.sortingSpeed = evt.target.value;
		console.log(this.state.sortingSpeed);
	}
	handleGenerateNewArrayClick = () => {
		this.resetSortingArray(100);
	}

	render() {
		const {sortingArray} = this.state;

		return (
			<body>
				<SortingAlgorithmHeader 
					handleSizeChange={this.handleSizeChange}
					handleSpeedChange={this.handleSpeedChange}
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
					<span id="arraySize">Change Array Size</span>
					<input
					 id="changeSize"
					 type="range"
					 min="0"
					 max="100"
					 onChange={this.props.handleSizeChange}
					/>
					<span id="sortingSpeed">Change Sorting Speed</span>
					<input
					 id="changeSpeed"
					 type="range"
					 min="0"
					 max="100"
					 onChange={this.props.handleSpeedChange}
					/>
					<span class="separator"></span>
					<span id="generateNewArrayButtonContainer">
						<GenerateNewArrayButton
							handleGenerateNewArrayClick={this.props.handleGenerateNewArrayClick}
						/>
					</span>
					<span class="separator"></span>
					{this.renderButton("Selection Sort")} 
					{this.renderButton("Insertion Sort")}
					{this.renderButton("Merge Sort")}
					{this.renderButton("Quicksort")}
					<span class="separator"></span>
					<SortButton
						handleSortClick={this.props.handleSortClick}
					/>
				</div>
			</div>
		);
	}
}




// randomInteger function retrieved from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInteger(start, end) {
	return Math.floor(Math.random() * (end - start) + start);
}