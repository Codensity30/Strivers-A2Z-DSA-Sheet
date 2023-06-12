/*
Question:
Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string "".

Approach:
1. Sort the array of strings lexicographically.
2. Take the first and last string from the sorted array.
3. Compare each character of the first and last string until they don't match or the end of either string is reached.
4. Return the common prefix.

Time Complexity: O(N*M*log(N)), where N is the number of strings and M is the maximum length of the strings.
- Sorting the array of strings takes O(N*log(N)) time.
- Comparing the first and last string takes O(M) time.

Space Complexity: O(1)
- We use constant space.

Code:
*/

using namespace std;

string longestCommonPrefix(vector<string>& strs) {
    if (strs.empty())
        return "";

    sort(strs.begin(), strs.end());

    int first = 0, last = strs.size() - 1;
    int i = 0, j = 0;
    int len = 0;

    while (i < strs[first].size() && j < strs[last].size() && strs[first][len] == strs[last][len]) {
        i++;
        j++;
        len++;
    }

    return strs[first].substr(0, len);
}
