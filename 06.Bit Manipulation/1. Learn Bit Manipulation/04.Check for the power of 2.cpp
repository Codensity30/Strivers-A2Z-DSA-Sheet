/*
QUESTION:-
Given an integer n, return true if it is a power of two. Otherwise, return false.

Example 1:
Input: n = 1
Output: true
Explanation: 2^0 = 1

Example 2:
Input: n = 16
Output: true
Explanation: 2^4 = 16
*/

/*
APPROACH:
An integer n is a power of two if it has only one bit set (i.e., it is a power of 2).
To check if a number has only one bit set, we can use the bitwise AND operation with (n-1).
If the result is 0, then it is a power of two; otherwise, it is not.

1. If n is less than or equal to 0, return false.
2. Perform the bitwise AND operation between n and (n-1).
3. If the result is 0, return true; otherwise, return false.
*/

bool isPowerOfTwo(int n) {
    if(n <= 0)
        return false;
    if(n & (n-1))
        return false;
    return true;
}

// Time Complexity: O(1)
// Space Complexity: O(1)
