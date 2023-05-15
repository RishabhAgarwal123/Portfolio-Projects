// 6 - ZigZag Conversion
// Description:
// The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: 
// (you may want to display this pattern in a fixed font for better legibility)
// P   A   H   N
// A P L S I I G
// Y   I   R
// And then read line by line: "PAHNAPLSIIGYIR"
// Write the code that will take a string and make this conversion given a number of rows:
// string convert(string s, int numRows);
// Example 1:

// Input: s = "PAYPALISHIRING", numRows = 3
// Output: "PAHNAPLSIIGYIR"

// Example 2:
// Input: s = "PAYPALISHIRING", numRows = 4
// Output: "PINALSIGYAHRPI"
// Explanation:
// P     I    N
// A   L S  I G
// Y A   H R
// P     I

// Example 3:
// Input: s = "A", numRows = 1
// Output: "A"
// Companies: All major

var convert = function(s, numRows) {
    if (s.length <= numRows || numRows < 2) return s;
    let len = s.length;
    let num = 2 * (numRows - 1); 
    let res = Array(numRows).fill('');
    let temp = 0;
    for (let i = 0; i < len; i++) {
        temp = i % num;
        if (temp < numRows) res[temp] += s[i];
        else res[num - temp] += s[i];
    }
    return res.join('');
};