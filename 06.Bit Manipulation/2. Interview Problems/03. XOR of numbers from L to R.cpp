/*
Question:
You are given two integers L and R, your task is to find the XOR of elements of the range [L, R].

Example:

Input:
L = 4, R = 8
Output:
8
Explanation:
4 ^ 5 ^ 6 ^ 7 ^ 8 = 8
*/

/*
Approach:
The XOR of a range [L, R] can be calculated by XORing the XORs of the individual numbers in the range [1, L-1] and [1, R].
We can observe a pattern in the XOR values based on the remainders of the numbers divided by 4.
Using this pattern, we can calculate the XOR of a given number n by applying some conditions.

1. If n % 4 == 0, the XOR value is n.
2. If n % 4 == 1, the XOR value is 1.
3. If n % 4 == 2, the XOR value is n+1.
4. If n % 4 == 3, the XOR value is 0.

By calculating the XOR values for L-1 and R separately using the above pattern, we can XOR them to get the final result.

Code:
*/

int calculateXOR(int n) {
    if (n % 4 == 0)
        return n;
    if (n % 4 == 1)
        return 1;
    if (n % 4 == 2)
        return n + 1;
    if (n % 4 == 3)
        return 0;
}

int findXOR(int L, int R) {
    int uptol = calculateXOR(L - 1);
    int uptor = calculateXOR(R);
    return uptor ^ uptol;
}

/*
Complexity Analysis:
- The time complexity is O(1) as the calculations are based on simple arithmetic operations.
- The space complexity is O(1) as no extra space is required.
*/

