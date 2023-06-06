/*
QUESTION:
Given an unsorted array Arr of size N of positive integers. One number 'A' from set {1, 2,....,N} is missing and one number 'B' occurs twice in the array. Find these two numbers.

Example:
Input:
N = 2
Arr[] = {2, 2}
Output: 2 1
Explanation: Repeating number is 2 and the smallest positive missing number is 1.

APPROACH:
To find the missing and repeating numbers in the given unsorted array, we can utilize the properties of summation and sum of squares. Let's denote the missing number as 'x' and the repeating number as 'y'.

1. Calculate the optimal sum 'optSum' using the formula: optSum = N * (N + 1) / 2, where N is the size of the array.
2. Calculate the optimal sum of squares 'opt2Sum' using the formula: opt2Sum = N * (N + 1) * (2 * N + 1) / 6.
3. Calculate the actual sum 'actSum' and actual sum of squares 'act2Sum' of the given array.
4. Find the difference between the optimal sum and the actual sum: xMinusY = optSum - actSum.
5. Find the difference between the optimal sum of squares and the actual sum of squares: x2MinusY2 = opt2Sum - act2Sum.
6. Calculate the sum of 'x' and 'y': xPlusY = x2MinusY2 / xMinusY.
7. Calculate 'x' and 'y' using the equations: x = (xPlusY + xMinusY) / 2 and y = xPlusY - x.

CODE:
*/

vector<int> findTwoElement(vector<int> arr, int N) {
    long long n = N;
    long long optSum = n * (n + 1) / 2; // Sum if all elements are present once
    long long opt2Sum = n * (n + 1) * (2 * n + 1) / 6; // Optimum sum of squares
    long long actSum = 0; // Actual sum of the given array
    long long act2Sum = 0; // Actual sum of squares
    
    for (auto it : arr) {
        actSum += it;
        act2Sum += (long long)it * (long long)it;
    }
    
    long long xMinusY = optSum - actSum;
    long long x2MinusY2 = opt2Sum - act2Sum;
    long long xPlusY = x2MinusY2 / xMinusY;
    
    long long x = (xPlusY + xMinusY) / 2;
    long long y = xPlusY - x;
    
    return {(int)y, (int)x};
}

/*
TIME COMPLEXITY: O(N), where N is the size of the array.
SPACE COMPLEXITY: O(1).
*/
