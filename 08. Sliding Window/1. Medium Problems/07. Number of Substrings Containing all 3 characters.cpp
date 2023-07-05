/*
QUESTION:
Given a string s consisting only of characters 'a', 'b', and 'c', you need to count the number of substrings that contain at least one occurrence of all these characters.

APPROACH:
To count the number of substrings with at least one occurrence of 'a', 'b', and 'c', we can use a sliding window approach.

1. Create a helper function, countOfUnvalidSubstrings, which counts the number of substrings that do not contain all three characters.
   - Initialize an unordered_map, mp, to keep track of the counts of characters in the current window.
   - Initialize start to 0 and ans to 0.
   - Iterate over the string from left to right:
     - Increment the count of the current character in mp.
     - If the number of unique characters in mp exceeds 2, it means we have found an invalid substring.
       - Decrement the count of the character at the start of the window in mp.
       - If the count becomes zero, remove the character from mp.
       - Move the start of the window to the next position.
     - Add the length of the current window to ans.
   - Return ans.

2. In the main function, numberOfSubstrings:
   - Calculate the total number of substrings, cntOfTotalSubstrings, using the formula (n * (n + 1)) / 2, where n is the length of the string.
   - Subtract the count of invalid substrings obtained from countOfUnvalidSubstrings from cntOfTotalSubstrings.
   - Return the resulting count.
*/

int countOfUnvalidSubstrings(string& s) {
    unordered_map<char, int> mp;
    int start = 0, ans = 0;
    
    for (int i = 0; i < s.size(); i++) {
        mp[s[i]]++;
        
        while (mp.size() > 2) {
            mp[s[start]]--;
            
            if (mp[s[start]] == 0)
                mp.erase(s[start]);
            
            start++;
        }
        
        ans += i - start + 1;
    }
    
    return ans;
}

int numberOfSubstrings(string s) {
    long long n = s.size();
    int cntOfTotalSubstrings = (n * (n + 1)) / 2;
    return cntOfTotalSubstrings - countOfUnvalidSubstrings(s);
}

/*
COMPLEXITY ANALYSIS:
- Time complexity: O(n), where n is the length of the string s. We iterate over the string once.
- Space complexity: O(1), as the extra space used is constant throughout the algorithm.
*/
