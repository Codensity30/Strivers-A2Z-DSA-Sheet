/*QUESTION:
Given a binary array nums and an integer k, return the maximum number of consecutive 1's in the array if you can flip at most k 0's.

Example 1:
Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

APPROACH:
1. Initialize variables zeroCnt, start, and ans.
2. Iterate through the array nums:
   - If the current element is 0, increment zeroCnt.
   - Enter a while loop to adjust the start index until zeroCnt becomes less than or equal to k.
   - During the adjustment, decrement zeroCnt if the element at the start index is 0.
   - Update ans by taking the maximum of the current ans and the length of the current subarray if zeroCnt is less than or equal to k.
3. Return the maximum length of consecutive 1's (ans).

CODE:*/

int longestOnes(vector<int>& nums, int k) {
    int zeroCnt = 0, start = 0, ans = 0;
    for(int i = 0; i < nums.size(); i++) {
        if(nums[i] == 0)
            zeroCnt++;
        while(zeroCnt > k) {
            if(nums[start] == 0)
                zeroCnt--;
            start++;
        }
        if(zeroCnt <= k)
            ans = max(ans, i - start + 1);
    }
    return ans;
}

/*
COMPLEXITY ANALYSIS:
- Time complexity: O(N), where N is the length of the input array nums. We iterate through the array once.
- Space complexity: O(1), as we are using a constant amount of additional space to store variables.
*/
