// 643 - Maximum Average Subarray I
// Description:
// You are given an integer array nums consisting of n elements, and an integer k. Find a contiguous subarray whose length is equal to 
// k that has the maximum average value and return this value. Any answer with a calculation error less than 10-5 will be accepted.

// Example 1:
// Input: nums = [1,12,-5,-6,50,3], k = 4
// Output: 12.75000
// Explanation: Maximum average is (12 - 5 - 6 + 50) / 4 = 51 / 4 = 12.75

// Example 2:
// Input: nums = [5], k = 1
// Output: 5.00000

// Companies: GOOGLE, FACEBOOK

var findMaxAverage = function(nums, k) {
    let maxAverage = 0;
    let sum = 0;
    for (let i = 0; i < k; i++) sum = sum + nums[i];
    // if array length is equal to k
    if (nums.length === k) {
        maxAverage = sum / k;
        return maxAverage.toFixed(5);
    }
    let current = sum;
    for (let i = k; i < nums.length; i++) {
        current = current - nums[i - k] + nums[i];
        sum = Math.max(sum, current);
    }

    return (sum / k).toFixed(5);
};