QUESTION:
/*Given an array of integers nums and an integer k, a continuous subarray is called nice if there are k odd numbers in it. Return the number of nice subarrays.

Example 1:
Input: nums = [1,1,2,1,1], k = 3
Output: 2
Explanation: The only subarrays with 3 odd numbers are [1,1,2,1] and [1,2,1,1].

APPROACH:
1. Define a helper function called atMostK, which calculates the number of subarrays with at most k odd numbers.
2. Initialize variables start to 0, oddCnt to 0, and ans to 0.
3. Iterate through each element nums[i] in the array:
   - If nums[i] is odd, increment oddCnt by 1.
   - While oddCnt is greater than k, move the start pointer and decrement oddCnt if the element at nums[start] is odd. This ensures that we maintain at most k odd numbers in the subarray.
   - Add the count of subarrays from start to i (i - start + 1) to ans.
4. Return ans, which represents the number of subarrays with at most k odd numbers.
5. In the numberOfSubarrays function, return the difference between atMostK(nums, k) and atMostK(nums, k - 1) to get the number of nice subarrays.

CODE:*/
int atMostK(vector<int>& nums, int k) {
    int start = 0, oddCnt = 0, ans = 0;
    for(int i = 0; i < nums.size(); i++) {
        if(nums[i] % 2 != 0)
            oddCnt++;
        while(oddCnt > k) {
            if(nums[start] % 2 != 0)
                oddCnt--;
            start++;
        }
        ans += i - start + 1;
    }
    return ans;
}

int numberOfSubarrays(vector<int>& nums, int k) {
    return atMostK(nums, k) - atMostK(nums, k - 1);
}

/*
COMPLEXITY ANALYSIS:
- Time complexity: O(N), where N is the size of the input array nums. We traverse the array once in both the atMostK function and the numberOfSubarrays function.
- Space complexity: O(1), as we use constant extra space throughout the algorithm.
*/
