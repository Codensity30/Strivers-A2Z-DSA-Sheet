/*
Question:
Given a string s, sort it in decreasing order based on the frequency of the characters.
The frequency of a character is the number of times it appears in the string.

Approach:
1. Create a frequency map to count the occurrences of each character in the string.
2. Use a priority queue to sort the characters based on their frequencies in decreasing order.
3. Iterate through the priority queue and append the characters to a new string according to their frequencies.

Code:
*/

string frequencySort(string s) {
    unordered_map<char, int> mp;
    for (auto c : s) {
        mp[c]++;
    }

    priority_queue<pair<int, char>> pq;
    for (auto it : mp) {
        pq.push({ it.second, it.first });
    }

    string ans = "";
    while (!pq.empty()) {
        auto curr = pq.top();
        pq.pop();
        ans.append(curr.first, curr.second);
    }

    return ans;
}

/*
Time Complexity: O(n log n), where n is the length of the string. Building the frequency map takes O(n) time, and the priority queue operations take O(n log n) time.
Space Complexity: O(n), where n is the length of the string. The space is used to store the frequency map and the priority queue.
*/