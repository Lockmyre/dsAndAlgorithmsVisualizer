import * as algorithms from './sortingAlgorithms.js';

export function mergeSort(array) {
	const tempArray = [];
	const animationArray = [];
	const arrayBars = document.getElementsByClassName("arrayElementBar");

	algorithms._mergeSort(array, tempArray, 0, array.length - 1, animationArray);
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

export function selectionSort(array) {
	const animationArray = [];
	const arrayBars = document.getElementsByClassName("arrayElementBar");
	const compare = "compare";
	const newSmallest = "newSmallest";
	var firstCompared = arrayBars[0];
	var secondCompared = arrayBars[1];
	firstCompared.style.backgroundColor = 'red';
	secondCompared.style.backgroundColor = 'red';
	algorithms._selectionSort(array, array.length, animationArray);

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

export function insertionSort(array) {
	var animationArray = [];
	const arrayBars = document.getElementsByClassName("arrayElementBar");
	const compare = "compare";
	var firstCompared = arrayBars[0];
	var secondCompared = arrayBars[1];
	firstCompared.style.backgroundColor = 'red';
	secondCompared.style.backgroundColor = 'red';
	animationArray = algorithms._insertionSort(array);

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
			else {
				let barOneStyle = arrayBars[animationArray[i][1]].style;
				let barTwoStyle = arrayBars[animationArray[i][2]].style;

				let temp = barOneStyle.height;
				barOneStyle.height = `${barTwoStyle.height}`;
				barTwoStyle.height = `${temp}`
			}
		}, i * 50);
	}
}

export function quickSort(array) {
	var animationArray = [];
	const arrayBars = document.getElementsByClassName("arrayElementBar");
	const setPivot = "setPivot", found = "found", compare = "compare", swap = "swap";
	var leftSideCompare, rightSideCompare;
	var pivotBar;
	var currentCompare = arrayBars[0];
	algorithms._quickSort(array, 0, array.length - 1, animationArray);

	for (let i = 0; i < animationArray.length; i++) {
		setTimeout(() => {
			currentCompare.style.backgroundColor = 'turquoise';
			if (animationArray[i][0].valueOf() === compare) {
				currentCompare = arrayBars[animationArray[i][1]];
				currentCompare.style.backgroundColor = 'red';
			}
			else if (animationArray[i][0].valueOf() === found) {
				leftSideCompare = arrayBars[animationArray[i][1]];
				leftSideCompare.style.backgroundColor = 'red';
			}
			else if (animationArray[i][0].valueOf() === swap) {
				rightSideCompare = arrayBars[animationArray[i][2]];
				leftSideCompare.style.backgroundColor = 'blue';
				rightSideCompare.style.backgroundColor = 'blue';
				let temp = leftSideCompare.style.height
				leftSideCompare.style.height = `${rightSideCompare.style.height}`;
				rightSideCompare.style.height = `${temp}`;
				if (leftSideCompare === pivotBar) {pivotBar = rightSideCompare;}
				else if (rightSideCompare === pivotBar) {pivotBar = leftSideCompare;}
			} else if (animationArray[i][0].valueOf() === setPivot) {
				if (pivotBar !== undefined) {
					pivotBar.style.backgroundColor = 'turquoise';
				}
				pivotBar = arrayBars[animationArray[i][1]];
				pivotBar.style.backgroundColor = 'green';
			} else {
				leftSideCompare.style.backgroundColor = 'turquoise';
				rightSideCompare.style.backgroundColor = 'turquoise';

			}
			pivotBar.style.backgroundColor = 'green';
		}, i * 50);
	}
}

export function isSorted(array) {
	for (let i = 0; i < array.length-1; i++) {
		if (array[i] > array[i+1]) {
			return false;
		}
	}
	return true;
}