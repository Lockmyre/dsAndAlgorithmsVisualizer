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
			array[current] = tempArray[beginHalf1];
			animation.swap = [current, beginHalf1];
			beginHalf1++;
		} else {
			array[current] = tempArray[beginHalf2];
			animation.swap = [current, beginHalf2];
			beginHalf2++;
		}

		animationArray.push(animation.comparison);
		animationArray.push(animation.comparison);
		animationArray.push(animation.swap);
		current++;
	}

	let remaining = mid - beginHalf1;
	for (let i = 0; i <= remaining; i++) {
		array[current + i] = tempArray[beginHalf1 + i];
		animationArray.push([beginHalf1 + i, beginHalf1 + i]);
		animationArray.push([beginHalf1 + i, beginHalf1 + i]);
		animationArray.push([current + i, beginHalf1 + i]);
	}
}