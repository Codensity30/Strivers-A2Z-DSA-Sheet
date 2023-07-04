/*
Question:
Given a string s, find the length of the longest substring without repeating characters.

Approach:
- We can use a sliding window approach to solve this problem.
- We maintain a window that contains only unique characters.
- We use a hash map to store the frequency of characters in the current window.
- We iterate through the string and expand the window by adding one character at a time.
- If we encounter a repeating character, we shrink the window from the left until the character is no longer in the window.
- We keep track of the maximum window size encountered so far and return it as the result.

Example:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

CODE:-
*/

int lengthOfLongestSubstring(const string& s) {
    int ans = 0;
    unordered_map<char, int> mp;
    int start = 0;
    
    for (int i = 0; i < s.size(); i++) {
        mp[s[i]]++;
        
        while (mp.size() < i - start + 1) {
            mp[s[start]]--;
            if (mp[s[start]] == 0)
                mp.erase(s[start]);
            start++;
        }
        
        if (mp.size() == i - start + 1)
            ans = max(ans, i - start + 1);
    }
    
    return ans;
}

// Complexity Analysis:
// - The time complexity of this algorithm is O(N), where N is the length of the input string `s`. We iterate through each character of the string once.
// - The space complexity is O(M), where M is the number of unique characters in the string `s`. The unordered map `mp` can store up to M key-value pairs.
