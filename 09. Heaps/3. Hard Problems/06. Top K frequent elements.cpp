/*
Question:
Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.
*/

/*
Approach:
1. Create a frequency map to count the occurrences of each element in the array.
2. Use a min heap to store the k most frequent elements based on their frequencies.
3. Iterate through the frequency map and push elements into the min heap.
4. If the size of the min heap exceeds k, remove the element with the lowest frequency.
5. Finally, extract the elements from the min heap and return them in reverse order to get the k most frequent elements.
*/

/*
Complexity Analysis:
- The time complexity is O(N log K), where N is the size of the input array nums. Building the frequency map takes O(N) time, and inserting and removing elements from the min heap take O(log K) time, which is done for each element in nums.
- The space complexity is O(N) to store the frequency map and O(K) for the min heap, resulting in a total of O(N + K) space.

CODE:-
*/

vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> mp;
    for (auto it : nums)
        mp[it]++;
    
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    for (auto it : mp) {
        pq.push({ it.second, it.first });
        if (pq.size() > k)
            pq.pop();
    }
    
    vector<int> ans;
    while (!pq.empty()) {
        ans.push_back(pq.top().second);
        pq.pop();
    }
    
    reverse(ans.begin(), ans.end());
    return ans;
}

