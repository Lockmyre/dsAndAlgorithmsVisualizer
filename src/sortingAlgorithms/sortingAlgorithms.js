export function _mergeSort(array, tempArray, first, end, animationArray) {
	if (first < end) {
		var mid = Math.floor((first+end) / 2);
		_mergeSort(array,tempArray, first, mid, animationArray);
		_mergeSort(array, tempArray, mid + 1, end, animationArray);

		merge(array, tempArray, first, mid, end, animationArray);
	}
}

function merge(array, tempArray, first, mid, end, animationArray) {
	for (let i = first; i <= end; i++) {
		tempArray[i] = array[i];
	}

	let beginHalf1 = first,
	beginHalf2 = mid + 1,
	current = first;

	while (beginHalf1 <= mid && beginHalf2 <= end) {
		const animation = {};
		animation.comparison = [beginHalf1, beginHalf2];
		if (tempArray[beginHalf1] <= tempArray[beginHalf2]) {
			animation.swap = [current, tempArray[beginHalf1]];
			array[current] = tempArray[beginHalf1];
			beginHalf1++;
		} else {
			animation.swap = [current, tempArray[beginHalf2]];
			array[current] = tempArray[beginHalf2];
			beginHalf2++;
		}

		animationArray.push(animation.comparison);
		animationArray.push(animation.comparison);
		animationArray.push(animation.swap);
		current++;
	}

	let remaining = mid - beginHalf1;
	for (let i = 0; i <= remaining; i++) {
		animationArray.push([beginHalf1 + i, beginHalf1 + i]);
		animationArray.push([beginHalf1 + i, beginHalf1 + i]);
		animationArray.push([current + i, tempArray[beginHalf1 + i]]);
		array[current + i] = tempArray[beginHalf1 + i];
	}
}

export function _selectionSort(array, lengthOfArray, animationArray) {
	for (let i = 0; i < lengthOfArray - 1; i++) {
		let min = array[i];
		let indexOfMin = i;
		for (let index = i + 1; index <= lengthOfArray - 1; index++) {
			animationArray.push(["compare", indexOfMin, index]);
			if (array[index] < min) {
				animationArray.push(["newSmallest", indexOfMin, index]);
				min = array[index];
				indexOfMin = index;
			}
		}
		animationArray.push(["swap", i, indexOfMin]);
		let temp = array[i];
		array[i] = array[indexOfMin];
		array[indexOfMin] = temp;
	}
}

export function _insertionSort(array) {
	var animationArray = [];
	for (let i = 1; i < array.length; i++) {
		var nextToInsert = array[i];
		insertInOrder(nextToInsert, array, i - 1, animationArray);
	}

	return animationArray;
}

function insertInOrder(anEntry, array, end, animationArray) {
	let index = end;
	while (index >= 0 && anEntry < array[index]) {
		animationArray.push(["compare", index+1, index]);
		animationArray.push(["insert", index+1, index]);
		array[index+1] = array[index];
		index--;
	}
	array[index+1] = anEntry;
}

export function _quickSort(array, first, last) {
	const MIN_SIZE = 4;

	if (first >= last) {return;}

	if (last - first + 1 < MIN_SIZE) {
		quickSortInsertionSort(array, first, last);
	} else {
		var pivotIndex = partition(array, first, last);
		_quickSort(array, first, pivotIndex - 1);
		_quickSort(array, pivotIndex + 1, last);
	}
}

function quickSortInsertionSort(array, first, last) {
	for (let i = first; i < last; i++) {
		var nextToInsert = array[i];
		quickSortInsertInOrder(array, nextToInsert, i - 1);
	}
}

function quickSortInsertInOrder(array, anEntry, end) {
	let index = end;
	while (index >= 0 && anEntry < array[index]) {
		array[index+1] = array[index];
		index--;
	}
	array[index+1] = anEntry;
}

function partition(array, first, last) {
	var mid = Math.round(first + (last - first) / 2);
	sortFirstMiddleLast(array, first, mid, last);
	let pivotIndex = last - 2;
	swap(array, mid, pivotIndex);
	let pivotValue = array[pivotIndex];
	let indexFromLeft = first + 1;
	let indexFromRight = last - 3;
	let done = false;

	while (!done) {
		while (array[indexFromLeft] < pivotValue) {
			indexFromLeft++;
		}
		while (array[indexFromRight] > pivotValue) {
			indexFromRight--;
		}

		if (indexFromLeft < indexFromRight) {
			swap(array, indexFromLeft, indexFromRight);
			indexFromLeft++;
			indexFromRight--;
		}
		else {
			done = true;
		}
	}

	swap(array, indexFromLeft, pivotIndex);
	return indexFromLeft;
}

function sortFirstMiddleLast(array, first, mid, last) {
	if (array[first] > array[mid]) {
		swap(array, first, mid);
	}
	if (array[first] > array[last]) {
		swap(array, first, last);
	}
	if (array[mid] > array[last]) {
		swap(array, mid, last);
	}
}

function swap(array, firstIndex, secondIndex) {
	let temp = array[secondIndex];
	array[secondIndex] = array[firstIndex];
	array[firstIndex] = temp;
}

