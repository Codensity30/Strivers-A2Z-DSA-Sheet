/**
 * QUESTION: Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.
 * 
 * Example:
 * Input: s = "leetcode", wordDict = ["leet","code"]
 * Output: true
 * Explanation: Return true because "leetcode" can be segmented as "leet code".
 *
 * Approach:
 * We can solve this problem using a recursive approach with backtracking.
 * 1. Start from the beginning of the string and try to find a word from the dictionary that matches a substring starting at the current index.
 * 2. If we find a match, recursively call the function on the remaining substring.
 * 3. Repeat this process until we reach the end of the string.
 * 4. If we can successfully break the string into words, we return true. Otherwise, we return false.
 *
 * Time Complexity: O(2^N), where N is the length of the string. In the worst case, we can have 2^N recursive calls.
 * Space Complexity: O(N), where N is the length of the string. The recursion stack can go up to N in the worst case.
 */

bool solve(int index, string& s, unordered_set<string>& dict) {
    if (index >= s.size()) {
        return true;
    }

    for (int i = index; i < s.size(); i++) {
        string temp = s.substr(index, i - index + 1);

        if (dict.find(temp) != dict.end() && solve(i + 1, s, dict)) {
            return true;
        }
    }

    return false;
}

bool wordBreak(string s, vector<string>& wordDict) {
    unordered_set<string> dict;
    for (int i = 0; i < wordDict.size(); i++) {
        dict.insert(wordDict[i]);
    }
    return solve(0, s, dict);
}
