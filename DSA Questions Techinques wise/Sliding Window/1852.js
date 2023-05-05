// 1852 - Distinct Numbers in Each Subarray
// Description:
// Given an integer array nums and an integer k, you are asked to construct the array ans of size n-k+1 where ans[i] is the number of 
// distinct numbers in the subarray nums[i:i+k-1] = [nums[i], nums[i+1], ..., nums[i+k-1]].
// Return the array ans.

// Example 1:
// Input: nums = [1,2,3,2,2,1,3], k = 3
// Output: [3,2,2,2,3]
// Explanation: The number of distinct elements in each subarray goes as follows:
// - nums[0:2] = [1,2,3] so ans[0] = 3
// - nums[1:3] = [2,3,2] so ans[1] = 2
// - nums[2:4] = [3,2,2] so ans[2] = 2
// - nums[3:5] = [2,2,1] so ans[3] = 2
// - nums[4:6] = [2,1,3] so ans[4] = 3

// Example 2:
// Input: nums = [1,1,1,1,2,3,4], k = 4
// Output: [1,2,3,4]
// Explanation: The number of distinct elements in each subarray goes as follows:
// - nums[0:3] = [1,1,1,1] so ans[0] = 1
// - nums[1:4] = [1,1,1,2] so ans[1] = 2
// - nums[2:5] = [1,1,2,3] so ans[2] = 3
// - nums[3:6] = [1,2,3,4] so ans[3] = 4
// Companies: AMAZON, Arista Networks

var distinctNumbers = function(nums, k) {
    const len = nums.length;
    if (len < k) return [];

    const map = new Map();
    const res = [];
    let start = 0;

    for (let i = 0; i < len; i++) {
        const num = nums[i];
        map.set(num, (map.get(num)??0) + 1);

        if (i >= (start + k - 1)) {
            res[start] = map.size;
            const item = nums[start];
            map.set(item, map.get(item) - 1);

            if (map.get(item) === 0) map.delete(item);
            start++;
        }
    }

    return res;
};