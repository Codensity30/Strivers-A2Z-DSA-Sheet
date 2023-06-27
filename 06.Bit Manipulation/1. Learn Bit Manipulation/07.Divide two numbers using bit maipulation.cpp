/*
QUESTION:
Given two integers dividend and divisor, find the quotient after dividing dividend by divisor without using multiplication, division, and mod operator.

Example:
Input: dividend = 10, divisor = 3
Output: 3
Explanation: 10/3 gives a quotient of 3 and remainder of 1.

APPROACH:
To divide two integers without using multiplication, division, and mod operator, we can use a bitwise shifting approach.
1. Initialize a variable ans as 0 to store the quotient.
2. Check if the dividend and divisor have different signs to determine the sign of the quotient.
3. Take the absolute values of the dividend and divisor to work with positive numbers.
4. Iterate while the absolute value of the dividend is greater than or equal to the absolute value of the divisor:
    a. Initialize a variable q as 1 to represent the current quotient digit.
    b. Iterate while the absolute value of the dividend is greater than the absolute value of the divisor left-shifted by q:
        i. Increment q.
    c. Add (1 << (q - 1)) to the quotient ans.
    d. Subtract the absolute value of the divisor left-shifted by (q - 1) from the absolute value of the dividend.
5. Return the quotient ans, considering the sign based on the step 2.

CODE:*/

int divideTwoInteger(int dividend, int divisor) {
    if (dividend == divisor)
        return 1;

    bool isNegative = ((dividend < 0 && divisor >= 0) || (dividend >= 0 && divisor < 0));

    int ans = 0;
    int a = abs(dividend);
    int b = abs(divisor);

    while (a >= b) {
        // at each stage we will find the greatest power of 2 which is smaller than the dividend
        int q = 1;
        while (a > (b << q))
            q++;
        ans += (1 << (q - 1));
        a -= (b << (q - 1));
    }

    return (isNegative) ? -ans : ans;
}

// Time Complexity: O(log n), where n is the absolute value of the dividend
// Space Complexity: O(1)


