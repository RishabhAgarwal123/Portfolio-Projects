// 557 - Reverse Words in a String III
// Description:
// Given a string s, reverse the order of characters in each word within a sentence while still preserving whitespace and 
// initial word order.

// Example 1:
// Input: s = "Let's take LeetCode contest"
// Output: "s'teL ekat edoCteeL tsetnoc"

// Example 2:
// Input: s = "God Ding"
// Output: "doG gniD"

// Companies: APPLE, META, GOOGLE, AMAZON, YANDEX, MICROSOFT, BLOOMBERG, PAYTM

var reverseWords = function(s) {
    return s.split(' ').map(reverse).join(' ');
};

var reverse = function (word) {
    let len = word.length;
    let res = '';

    for (let i = 0; i < len; i++) res += word[len - i - 1];

    return res;
}