/*
Question:
The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.
For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.
Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.

Example:
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
- 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.

Approach:
- We can solve this problem using a stack and a hashmap.
- First, we iterate through the `nums2` array from right to left.
- For each element, we pop elements from the stack that are smaller than or equal to the current element and store the next greater element for each popped element in the hashmap.
- Finally, we iterate through the `nums1` array and retrieve the next greater element from the hashmap if it exists, otherwise assign -1.

Code:
*/

void nextGstack(vector<int>& nums, unordered_map<int, int>& mp) {
    stack<int> st;
    for (int i = nums.size() - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= nums[i]) {
            st.pop();
        }
        if (!st.empty())
            mp[nums[i]] = st.top();

        st.push(nums[i]);
    }
}

vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
    unordered_map<int, int> mp;
    nextGstack(nums2, mp);

    vector<int> ans(nums1.size(), -1);

    for (int i = 0; i < nums1.size(); i++) {
        if (mp.find(nums1[i]) != mp.end())
            ans[i] = mp[nums1[i]];
    }
    return ans;
}

/*
Complexity Analysis:
- The time complexity of the `nextGreaterElement` function is O(N + M), where N is the size of `nums1` and M is the size of `nums2`.
- The `nextGstack` function has a time complexity of O(M), where M is the size of `nums2`.
- The space complexity is O(N), where N is the size of `nums1`, to store the result in the `ans` vector and the `mp` hashmap.
*/