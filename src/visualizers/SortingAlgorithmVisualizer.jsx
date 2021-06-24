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
			sortingArray.push(randomInteger(5, 1001));
		}

		this.setState({sortingArray});
	}

	componentDidMount() {
		this.resetSortingArray(5);
	}

	render() {
		const {sortingArray} = this.state;

		return (
			<div className="arrayElementContainer">
				{sortingArray.map((value, index) => (
					<div 
					className="arrayElementBar" 
					key={index}
					style={{height: value}}>
					</div>
				))}
			</div>
		);
	}
}


// Function retrieved from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInteger(start, end) {
	return Math.floor(Math.random() * (end - start) + start);
}