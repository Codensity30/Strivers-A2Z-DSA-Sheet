/*
QUESTION:
Given a non-negative number N, set the rightmost unset bit in its binary representation. If there are no unset bits, leave the number as it is.

Example:
Input: N = 6
Output: 7
Explanation:
The binary representation of 6 is 110.
After setting the rightmost unset bit, it becomes 111 which is 7.

Input: N = 15
Output: 15
Explanation:
The binary representation of 15 is 1111.
Since there are no unset bits, it remains the same.

APPROACH:
To set the rightmost unset bit in the binary representation of N, we can follow these steps:
1. Check if N+1 is a power of 2. If it is, then N already has all bits set, so return N.
2. Otherwise, perform the bitwise OR operation between N and (N+1). This will set the rightmost unset bit.
3. Return the result.

1. Check if N+1 is a power of 2 by using the isPowerOfTwo function.
2. If it is, return N as it already has all bits set.
3. Otherwise, perform the bitwise OR operation between N and (N+1) and return the result.

CODE:*/
bool isPowerOfTwo(int n) {
    if(n <= 0)
        return false;
    if(n & (n-1))
        return false;
    return true;
}

int setBit(int N)
{
    if(isPowerOfTwo(N+1))
        return N;

    int ans = (N | (N+1));
    return ans;
}

// Time Complexity: O(1)
// Space Complexity: O(1)
