/*QUESTION:
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

APPROACH:
To calculate the trapped water, we can use the two-pointer approach. We initialize two pointers, one at the beginning of the array (`left`) and another at the end of the array (`right`). We also maintain two variables, `leftMax` and `rightMax`, to keep track of the maximum bar height encountered from the left and right side, respectively.

1. Initialize `left` to 0 and `right` to the last index of the array.
2. Initialize `leftMax` and `rightMax` to the minimum integer value (`INT_MIN`).
3. Initialize `ans` (trapped water) to 0.
4. Iterate while `left` is less than or equal to `right`:
    a. If `height[left]` is less than `height[right]`:
        - Update `leftMax` if `height[left]` is greater than the current `leftMax`.
        - Calculate the amount of water trapped at the current `left` index by subtracting `height[left]` from `leftMax` and add it to `ans`.
        - Increment `left` by 1.
    b. Else:
        - Update `rightMax` if `height[right]` is greater than the current `rightMax`.
        - Calculate the amount of water trapped at the current `right` index by subtracting `height[right]` from `rightMax` and add it to `ans`.
        - Decrement `right` by 1.
5. Return the final value of `ans`.

CODE:*/
int trap(vector<int>& height) {
    int leftMax = INT_MIN;
    int rightMax = INT_MIN;
    int left = 0, right = height.size()-1;
    int ans = 0;

    while(left <= right) {
        if(height[left] < height[right]) {
            if(height[left] > leftMax)
                leftMax = height[left];
            else
                ans += leftMax - height[left];
            left++;
        } else {
            if(height[right] > rightMax)
                rightMax = height[right];
            else
                ans += rightMax - height[right];
            right--;
        }
    }

    return ans;
}
/*
COMPLEXITY ANALYSIS:
- The time complexity of this approach is O(N), where N is the number of elements in the `height` array. We iterate through the array once.
- The space complexity is O(1) as we only use a constant amount of extra space to store variables.
*/


