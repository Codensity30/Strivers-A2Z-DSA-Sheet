/*QUESTION:
Given an array of integers arr, find the sum of min(b), where b ranges over every (contiguous) subarray of arr. Since the answer may be large, return the answer modulo 109 + 7.

APPROACH:
To find the sum of the minimums of all subarrays, we can use the concept of previous smaller and next smaller elements for each element in the array.
1. Define two helper functions:
   - `prevSmaller(arr)`: Returns an array that contains the index of the previous smaller element for each element in `arr`. If no smaller element exists, the index is set to -1.
   - `nextSmaller(arr)`: Returns an array that contains the index of the next smaller element for each element in `arr`. If no smaller element exists, the index is set to the length of the array.
2. Initialize a variable `ans` to 0 to store the final sum.
3. Iterate over each element `arr[i]` in the array:
   a. Calculate the number of subarrays in which `arr[i]` is the minimum element.
      - The number of subarrays with `arr[i]` as the minimum element on the left side is `i - prevS[i]`.
      - The number of subarrays with `arr[i]` as the minimum element on the right side is `nextS[i] - i`.
   b. Add `(leftElements * rightElements * arr[i]) % mod` to `ans`, where `mod` is `1e9 + 7`.
4. Return the final value of `ans` as the sum of minimums of all subarrays modulo `1e9 + 7`.

CODE:*/
vector<int> prevSmaller(vector<int>& arr){
    stack<int> st;
    vector<int> ans(arr.size(), -1);
    for(int i = 0; i < arr.size(); i++){
        while(!st.empty() && arr[st.top()] > arr[i])
            st.pop();
        if(!st.empty())
            ans[i] = st.top();
        st.push(i);
    }
    return ans;
}

vector<int> nextSmaller(vector<int>& arr){
    stack<int> st;
    vector<int> ans(arr.size(), arr.size());
    for(int i = arr.size()-1; i >= 0; i--){
        while(!st.empty() && arr[st.top()] >= arr[i])
            st.pop();
        if(!st.empty())
            ans[i] = st.top();
        st.push(i);
    }
    return ans;
}

int sumSubarrayMins(vector<int>& arr) {
    vector<int> prevS = prevSmaller(arr);
    vector<int> nextS = nextSmaller(arr);
    long long ans = 0;
    int mod = 1e9 + 7;

    for(int i = 0; i < arr.size(); i++){
        long long leftElements = i - prevS[i];
        long long rightElements = nextS[i] - i;
        // this formula is arrived by mathematical calculation
        ans += ((leftElements % mod) * (rightElements % mod) * (arr[i] % mod)) % mod;
    }

    return (int)ans;
}

/*
COMPLEXITY ANALYSIS:
- The time complexity of this approach is O(N), where N is the number of elements in the array `arr`. We iterate through the array twice to calculate the previous smaller and next smaller elements.
- The space complexity is O(N) as we use additional space to store the previous smaller and next smaller elements.
*/
