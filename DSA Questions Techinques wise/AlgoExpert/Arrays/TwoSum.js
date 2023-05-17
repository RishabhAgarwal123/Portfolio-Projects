// Write a function that takes in a non-empty array of distinct integers and an
//   integer representing a target sum. If any two numbers in the input array sum
//   up to the target sum, the function should return them in an array, in any
//   order. If no two numbers sum up to the target sum, the function should return
//   an empty array.  
//   Note that the target sum has to be obtained by summing two different integers
//   in the array; you can't add a single integer to itself in order to obtain the
//   target sum.You can assume that there will be at most one pair of numbers summing up to
//   the target sum.
// Sample Input: 
// arr = [3, 5, -4, 8, 11, 1, -1, 6]
// taregtSum = 10

// Using Sorting
function twoNumberSum(array, targetSum) {
	array.sort((a, b) => a- b);
	let start = 0;
	let end = array.length - 1;
	while (start < end) {
		const sum = array[start] + array[end];
		if (sum < targetSum) {
			start++;
		} else if (sum > targetSum) {
			end--
		} else {
			console.log(array[start], array[end]);
			return [array[start], array[end]];
		}
	}
	return [];
}

// Using Hashset
function twoNumberSum(array, targetSum) {
    const possibleSums = {};
      for (const num of array) {
          const possibleSum = targetSum - num;
          if (possibleSum in possibleSums) {
              return [possibleSum, num];
          } else {
              possibleSums[num] = true;
          }
      }
      return [];
  }