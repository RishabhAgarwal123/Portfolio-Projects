// 234 - Palindrome Linked List
// Description:
// Given the head of a singly linked list, return true if it is a 
// palindrome or false otherwise.

// Example 1:
// Input: head = [1,2,2,1]
// Output: true

// Example 2:
// Input: head = [1,2]
// Output: false

// Companies: All mojor Companies
var isPalindrome = function(head) {
    let slow = head, fast = head;
    while (fast !== null && fast.next !== null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    let reverse = reverseList(slow);
    let current = head;
    while (reverse !== null) {
        if (reverse.val !== current.val) return false;
        reverse = reverse.next;
        current = current.next;
    }
    return true;
};

var reverseList = function(head) {
    let prev = null;
    let current = head;
    while (current !== null) {
        const nextNode = current.next;
        current.next = prev;
        prev = current;
        current = nextNode;
    }
    return prev;
}