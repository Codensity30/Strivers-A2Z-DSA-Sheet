/*
QUESTION:
Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).

Example:
Input: x = 2.00000, n = 10
Output: 1024.00000

APPROACH:
To calculate x raised to the power n, we can use the concept of binary exponentiation.
1. If n is 0, return 1, as any number raised to the power 0 is 1.
2. Initialize a variable res to 1 to store the result.
3. If n is negative, set isNegative flag to true and make n positive.
4. Iterate until n becomes 0:
   - If the least significant bit of n is 1 (i.e., n is odd), multiply res by x.
   - Update x to x^2 by multiplying it with itself.
   - Right-shift n by 1 to remove the least significant bit.
5. If isNegative is true, return 1/res; otherwise, return res.

CODE:*/
double myPow(double x, int n) {
    if (n == 0)
        return 1;
    double res = 1;
    bool isNegative = (n < 0);
    n = abs(n);
    while (n > 0) {
        if (n & 1) { // Check if n is odd
            res = res * x;
        }
        x = x * x; // Update x to x^2
        n = n >> 1; // Right-shift n by 1
    }
    return (isNegative) ? 1 / res : res;
}

// Time Complexity: O(log(n))
// Space Complexity: O(1)


