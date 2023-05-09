// 1100 - Find K-Length Substrings With No Repeated Characters
// Description:
// Given a string s and an integer k, return the number of substrings in s of length k with no repeated characters.

// Example 1:
// Input: s = "havefunonleetcode", k = 5
// Output: 6
// Explanation: There are 6 substrings they are: 'havef','avefu','vefun','efuno','etcod','tcode'.

// Example 2:
// Input: s = "home", k = 5
// Output: 0
// // Explanation: Notice k can be larger than the length of s. In this case, it is not possible to find any substring.

// Companies: AMAZON

var numKLenSubstrNoRepeats = function(s, k) {
    const strings = [];
    let count = 0;

    for (let i = 0; i < s.length; i++) {
        strings.push(s[i]);

        if (strings.length >= k) {
            const set = new Set(strings);
            if (set.szie === k) count++;
            strings.shift();
        }
    }

    return count;
}