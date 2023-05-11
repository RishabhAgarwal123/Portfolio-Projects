// 42 - Trapping Rain Water
// Description:
// Example 1:
// Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
// Output: 6
// Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 
// units of rain water (blue section) are being trapped.

// Example 2:
// Input: height = [4,2,0,3,2,5]
// Output: 9

// Companies: All major Companies
var trap = function(height) {
    let left = 0, right = height.length - 1, result = 0, leftMax = 0, rightMax = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] > leftMax) leftMax = height[left];
            else result += leftMax - height[left];
            left++;
        } else {
            if (height[right] > rightMax) rightMax = height[right];
            else result += rightMax - height[right];
            right--;
        }
    }
    return result;
};