/*
QUESTION:-
Given a positive integer N, determine whether it is odd or even.

Example 1:

Input:
N = 1
Output:
odd
Explanation:
The number 1 is odd.

APPROACH:
To determine whether a positive integer N is odd or even, we can check the least significant bit (LSB) of N. 
If the LSB is 1, the number is odd. If the LSB is 0, the number is even.
We can use the bitwise AND operation with 1 (N & 1) to check the LSB.
If the result is 1, we return "odd". If the result is 0, we return "even".


CODE*/

string oddEven(int N){
    if(N&1)
        return "odd";
    return "even";
}

// Time Complexity: O(1)
// Space Complexity: O(1)
