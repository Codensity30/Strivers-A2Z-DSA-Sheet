/*
QUESTION:
Given two numbers a and b, swap their values without using a temporary variable and return them.

Example:
Input: a = 13, b = 9
Output: 9 13
Explanation: After swapping, the values become 9 and 13.

APPROACH:
To swap two numbers a and b without using a temporary variable, we can use the XOR (^) operation.
1. Set a = a XOR b, which XORs the binary representations of a and b and stores the result in a.
2. Set b = a XOR b, which XORs the new value of a (after step 1) with the original value of b, and stores the result in b.
3. Set a = a XOR b, which XORs the new value of a (after step 1) with the new value of b (after step 2), and stores the result in a.
4. The values of a and b are swapped.

CODE:*/
pair<int, int> get(int a, int b){
    a = a^b;
    b = a^b; 
    a = a^b;
    return {a, b};
}

// Time Complexity: O(1)
// Space Complexity: O(1)

