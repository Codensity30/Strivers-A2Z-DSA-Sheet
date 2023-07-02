/*QUESTION:
You are given an integer array nums. The range of a subarray of nums is the difference between the largest and smallest element in the subarray. Return the sum of all subarray ranges of nums.

APPROACH:
To find the sum of all subarray ranges, we can use the concept of previous smaller, next smaller, previous greater, and next greater elements for each element in the array.
1. Define four helper functions:
   - `prevSmaller(arr)`: Returns an array that contains the index of the previous smaller element for each element in `arr`. If no smaller element exists, the index is set to -1.
   - `nextSmaller(arr)`: Returns an array that contains the index of the next smaller element for each element in `arr`. If no smaller element exists, the index is set to the length of the array.
   - `prevGreater(arr)`: Returns an array that contains the index of the previous greater element for each element in `arr`. If no greater element exists, the index is set to -1.
   - `nextGreater(arr)`: Returns an array that contains the index of the next greater element for each element in `arr`. If no greater element exists, the index is set to the length of the array.
2. Initialize a variable `ans` to 0 to store the final sum.
3. Iterate over each element `arr[i]` in the array:
   a. Calculate the number of subarrays where `arr[i]` is the minimum element:
      - The number of subarrays with `arr[i]` as the minimum element on the left side is `i - prevS[i]`.
      - The number of subarrays with `arr[i]` as the minimum element on the right side is `nextS[i] - i`.
   b. Calculate the number of subarrays where `arr[i]` is the maximum element:
      - The number of subarrays with `arr[i]` as the maximum element on the left side is `i - prevG[i]`.
      - The number of subarrays with `arr[i]` as the maximum element on the right side is `nextG[i] - i`.
   c. Update `ans` by adding `(maxleftElements * maxrightElements * arr[i]) - (minleftElements * minrightElements * arr[i])`.
4. Return the final value of `ans` as the sum of all subarray ranges.

CODE:*/

// NOTE:- The code could be more concise if done in double traversal but I find this more intuitive
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

vector<int> prevGreater(vector<int>& arr){
    stack<int> st;
    vector<int> ans(arr.size(), -1);
    for(int i = 0; i < arr.size(); i++){
        while(!st.empty() && arr[st.top()] < arr[i])
            st.pop();
        if(!st.empty())
            ans[i] = st.top();
        st.push(i);
    }
    return ans;
}

vector<int> nextGreater(vector<int>& arr){
    stack<int> st;
    vector<int> ans(arr.size(), arr.size());
    for(int i = arr.size()-1; i >= 0; i--){
        while(!st.empty() && arr[st.top()] <= arr[i])
            st.pop();
        if(!st.empty())
            ans[i] = st.top();
        st.push(i);
    }
    return ans;
}

long long subArrayRanges(vector<int>& arr) {
    vector<int> prevS = prevSmaller(arr);
    vector<int> nextS = nextSmaller(arr);
    vector<int> prevG = prevGreater(arr);
    vector<int> nextG = nextGreater(arr);
    long long ans = 0;

    for(int i = 0; i < arr.size(); i++){
        long long minleftElements = i - prevS[i];
        long long minrightElements = nextS[i] - i;
        long long maxleftElements = i - prevG[i];
        long long maxrightElements = nextG[i] - i;
        ans += (maxleftElements * maxrightElements * arr[i]) - (minleftElements * minrightElements * arr[i]);
    }
    return ans;
}

/*
COMPLEXITY ANALYSIS:
- The time complexity of this approach is O(N), where N is the number of elements in the array `arr`. We iterate through the array multiple times to calculate the previous smaller, next smaller, previous greater, and next greater elements.
- The space complexity is O(N) as we use additional space to store the previous smaller, next smaller, previous greater, and next greater elements.
*/

