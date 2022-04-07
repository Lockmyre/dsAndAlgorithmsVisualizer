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
	animationArray.push(["flashGreen"]);
	animationArray.push(["returnTurquoise"]);
}

export function _insertionSort(array) {
	var animationArray = [];
	for (let i = 1; i < array.length; i++) {
		var nextToInsert = array[i];
		insertInOrder(nextToInsert, array, i - 1, animationArray);
	}

	animationArray.push(["flashGreen"]);
	animationArray.push(["returnTurquoise"]);
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

export function _quickSort(array, left, right, animationArray) {
	let index = partition(array, left, right, animationArray);
	if (left < index - 1) {
		_quickSort(array, left, index - 1, animationArray);
	}
	if (index < right) {
		_quickSort(array, index, right, animationArray);
	}
}

function partition(array, left, right, animationArray) {
	let pivotIndex = Math.floor((left + right) / 2);
	let pivot = array[pivotIndex];
	animationArray.push(["setPivot", pivotIndex]);

	while (left <= right) {
		while (array[left] < pivot) {
			animationArray.push(["compare", left]);
			left++;
		}
		animationArray.push(["found", left]);
		while (array[right] > pivot) {
			animationArray.push(["compare", right]);
			right--;
		}
		if (left <= right) {
			animationArray.push(["swap", left, right]);
			swap(array, left, right);
			left++;
			right--;
		}
		animationArray.push(["fin"]);
	}
	return left;
}

function swap(array, firstIndex, secondIndex) {
	let temp = array[firstIndex];
	array[firstIndex] = array[secondIndex];
	array[secondIndex] = temp;
}

