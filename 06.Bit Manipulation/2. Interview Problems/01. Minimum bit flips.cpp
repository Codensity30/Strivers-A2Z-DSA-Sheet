/*
QUESTION:
A bit flip of a number x is choosing a bit in the binary representation of x and flipping it from either 0 to 1 or 1 to 0. Given two integers start and goal, return the minimum number of bit flips required to convert start to goal.

Example:
Input: start = 10, goal = 7
Output: 3
Explanation: The binary representation of 10 and 7 are 1010 and 0111 respectively. We can convert 10 to 7 in 3 steps:
- Flip the first bit from the right: 1010 -> 1011.
- Flip the third bit from the right: 1011 -> 1111.
- Flip the fourth bit from the right: 1111 -> 0111.
It can be shown that we cannot convert 10 to 7 in less than 3 steps. Hence, we return 3.

APPROACH:
To find the minimum number of bit flips required to convert start to goal, we can iterate over each bit position from right to left and compare the corresponding bits in start and goal. If they are different, we increment a counter. Finally, we return the counter.

CODE:*/
int minBitFlips(int start, int goal) {
    int i = 0;
    int cnt = 0;
    while (i < 32) {
        int startbit = (start >> i) & 1;
        int goalbit = (goal >> i) & 1;
        if (startbit != goalbit)
            cnt++;
        i++;
    }
    return cnt;
}

// Time Complexity: O(log n), where n is the maximum value between start and goal
// Space Complexity: O(1)


