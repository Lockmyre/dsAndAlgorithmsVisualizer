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
		const animation = {};
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