/*
QUESTION:
Given an array of integers heights representing the histogram's bar height where the width of each bar is 1,
return the area of the largest rectangle in the histogram.

Example:
Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where the width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.
*/

/*
APPROACH:
To find the largest rectangle area, we can use the concept of a stack.
The idea is to maintain a stack of indices of the heights in non-decreasing order.
For each height, we compare it with the top of the stack.
If the current height is greater than the top of the stack, we push its index onto the stack.
Otherwise, we keep popping elements from the stack and calculate the area using the popped index as the right boundary.
The left boundary can be obtained from the new top of the stack.
By doing this, we ensure that the heights in the stack are always in non-decreasing order.
Finally, we calculate the area for each popped element and update the maximum area found so far.

CODE:
*/


vector<int> prevSmaller(vector<int>& arr) {
    stack<int> st;
    vector<int> ans(arr.size(), -1);
    for (int i = 0; i < arr.size(); i++) {
        while (!st.empty() && arr[st.top()] > arr[i])
            st.pop();
        if (!st.empty())
            ans[i] = st.top();
        st.push(i);
    }
    return ans;
}

vector<int> nextSmaller(vector<int>& arr) {
    stack<int> st;
    vector<int> ans(arr.size(), arr.size());
    for (int i = arr.size() - 1; i >= 0; i--) {
        while (!st.empty() && arr[st.top()] >= arr[i])
            st.pop();
        if (!st.empty())
            ans[i] = st.top();
        st.push(i);
    }
    return ans;
}

int largestRectangleArea(vector<int>& heights) {
    vector<int> prev = prevSmaller(heights);
    vector<int> next = nextSmaller(heights);

    int ans = INT_MIN;
    for (int i = 0; i < heights.size(); i++) {
        ans = max(ans, (next[i] - prev[i] - 1) * heights[i]);
    }
    return ans;
}

/*
COMPLEXITY ANALYSIS:
- The time complexity of the solution is O(n), where n is the number of elements in the heights array.
  This is because we iterate through the array once to calculate the previous and next smaller elements.
- The space complexity is O(n) as well since we use two additional arrays to store the previous and next smaller elements.
*/

