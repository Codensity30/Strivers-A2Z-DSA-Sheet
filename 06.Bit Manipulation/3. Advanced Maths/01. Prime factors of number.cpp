/*
QUESTION:
Given a number N, find its unique prime factors in increasing order.

Example:
Input: N = 100
Output: 2 5
Explanation: 2 and 5 are the unique prime factors of 100.

APPROACH:
To find the unique prime factors of a number N, we can iterate from 2 to sqrt(N) and check if each number divides N.
1. Initialize an empty vector `ans` to store the prime factors.
2. Iterate from 2 to sqrt(N):
   - If `i` divides `N` (i.e., N % i == 0):
     - Add `i` to `ans`.
     - Divide `N` by `i` until it is no longer divisible by `i`.
3. If `N` is still greater than 1, it means that `N` itself is a prime factor. Add it to `ans`.
4. Return `ans`.

CODE:*/
vector<int> AllPrimeFactors(int n) {
    vector<int> ans;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            ans.push_back(i);
            while (n % i == 0)
                n /= i;
        }
    }
    if (n > 1)
        ans.push_back(n);
    return ans;
}

// Time Complexity: O(sqrt(N))
// Space Complexity: O(1) (excluding the space required for the output vector)


