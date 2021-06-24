import React from 'react';

export default class SortingAlgorithmsVisualizer extends React.Component {
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
		this.resetSortingArray();
	}

	render() {
		const {sortingArray} = this.state.sortingArray;

		return (
			{sortingArray.map((value, id) => (
				<div className="arrayElementBar" key={id}>
					{value}
				</div>
			))}
		);
	}
}


// Function retrieved from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function randomInteger(start, end) {
	return Math.floor(Math.random() * (end - start) + start);
}