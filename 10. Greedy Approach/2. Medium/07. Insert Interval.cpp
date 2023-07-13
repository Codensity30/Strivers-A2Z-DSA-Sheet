/*
Question:
You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.

Insert newInterval into intervals such that intervals is still sorted in ascending order by starti and intervals still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return intervals after the insertion.

Example:
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

Approach:
- We iterate through the intervals and compare them with the newInterval.
- There are three possible cases:
  1. The newInterval is before the current interval: We add the newInterval and update the newInterval to the current interval.
  2. The newInterval is after the current interval: We add the current interval to the result.
  3. The newInterval overlaps with the current interval: We update the newInterval to cover the merged interval.

Complexity Analysis:
- The time complexity of this approach is O(N), where N is the number of intervals.
- We iterate through the intervals once.
- The space complexity is O(1) as we are using a constant amount of additional space.

Code:
*/

vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
    vector<vector<int>> ans;
    int n = intervals.size();

    for(int i = 0; i < n; i++) {
        // newInterval is after the current interval
        if(intervals[i][1] < newInterval[0]) {
            ans.push_back(intervals[i]);
        }
        // newInterval is before the current interval
        else if(newInterval[1] < intervals[i][0]) {
            ans.push_back(newInterval);
            newInterval = intervals[i];
        }
        // newInterval overlaps with the current interval
        else {
            newInterval[0] = min(intervals[i][0], newInterval[0]);
            newInterval[1] = max(intervals[i][1], newInterval[1]);
        }
    }
    ans.push_back(newInterval);
    return ans;
}
