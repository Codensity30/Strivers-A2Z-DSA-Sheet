/*QUESTION:
Given a number N and a bit number K, check if the Kth index bit of N is set or not. A bit is called set if it is 1. The position of the set bit '1' should be indexed starting with 0 from the least significant bit (LSB) side in the binary representation of the number.

Example:
Input: N = 4, K = 0
Output: No
Explanation: The binary representation of 4 is 100, in which the 0th index bit from the LSB is not set. So, return false.

Approach:
1. Perform a bitwise AND operation between N and (1 << K).
2. If the result is non-zero, it means the Kth index bit is set (1); otherwise, it is not set (0).

CODE:*/
bool checkKthBit(int n, int k) {
    if (n & (1 << k))
        return true;
    return false;
}
