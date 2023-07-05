/*
QUESTION:
Given a string 'str' and an integer 'K', find the length of the largest substring with at most 'K' distinct characters.

EXAMPLE:
For example, if we are given 'str' = "abbbbbbc" and 'K' = 2, the substrings that can be formed are ["abbbbbb", "bbbbbbc"]. Hence, the answer is 7.

APPROACH:
We can use a sliding window approach to solve this problem.

1. Create a function, kDistinctChars, that takes 'k' and the input string 's' as parameters.
   - Initialize an unordered_map, mp, to store the frequency of characters.
   - Initialize 'start' to 0 and 'ans' to 0.
   - Iterate over the string from left to right:
     - Increment the frequency of the current character in the map.
     - If the number of distinct characters in the map exceeds 'k', move the 'start' pointer to the right and remove characters from the map until the number of distinct characters becomes equal to 'k'.
     - Update 'ans' with the maximum length of the substring (i - start + 1).
   - Return 'ans', which represents the length of the largest substring with at most 'k' distinct characters.

COMPLEXITY ANALYSIS:
- Time complexity: O(n), where n is the length of the string 's'. We iterate over the string once using the sliding window approach.
- Space complexity: O(k), as the space used by the unordered_map is proportional to the number of distinct characters, which can be at most 'k'.
*/

int kDistinctChars(int k, string &s) {
    unordered_map<char, int> mp;
    int start = 0, ans = 0;
    
    for (int i = 0; i < s.size(); i++) {
        mp[s[i]]++;
        
        while (mp.size() > k) {
            mp[s[start]]--;
            
            if (mp[s[start]] == 0)
                mp.erase(s[start]);
            
            start++;
        }
        
        ans = max(ans, i - start + 1);
    }
    
    return ans;
}
