/*
Question:
You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].
Each element nums[i] represents the maximum length of a forward jump from index i.
Return the minimum number of jumps to reach nums[n - 1].

Example:
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

Approach:
- We maintain three variables: 'steps', 'end', and 'farthest'.
- 'steps' keeps track of the minimum number of jumps required.
- 'end' represents the current farthest position that we can reach.
- 'farthest' stores the farthest position we can reach by taking a jump from the current position.
- We iterate over the array from left to right, except for the last element.
- At each position, we update the 'farthest' by taking the maximum of the current farthest and the current position plus the maximum jump length at that position.
- If the 'farthest' position is greater than or equal to the last index, it means we can reach the end, so we return 'steps + 1'.
- When we reach the 'end' position, it means we have taken the maximum number of jumps from the previous step.
- So, we increment 'steps' by 1 and update the 'end' to the 'farthest' position.
- Finally, we return the 'steps' as the minimum number of jumps required.

Complexity Analysis:
- The time complexity of this approach is O(N), where N is the length of the input array 'nums'.
- We iterate over the array once.
- The space complexity is O(1) as we use only a constant amount of extra space.

Code:
*/

int jump(vector<int>& nums) {
    int steps = 0, end = 0, farthest = 0;
    for (int i = 0; i < nums.size() - 1; i++) {
        farthest = max(farthest, nums[i] + i);
        if (farthest >= nums.size() - 1)
            return steps + 1;
        if (i == end) {
            steps++;
            end = farthest;
        }
    }
    return steps;
}
