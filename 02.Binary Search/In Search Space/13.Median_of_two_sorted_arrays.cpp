/*
NOTE:- IMPLEMENTATION OF THIS QUESTION IS NOT AT ALL INTUTIVE
Question:
We have an horizontal number line. On that number line, we have gas stations at positions `stations[0]`, `stations[1]`, ..., `stations[N-1]`, where N is the size of the `stations` array. Now, we need to add K more gas stations so that D, the maximum distance between adjacent gas stations, is minimized. Find the smallest possible value of D.

Example:
Input:
N = 10
stations = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
K = 9
Output: 0.50
Explanation: Each of the 9 stations can be added midway between all the existing adjacent stations.

Approach:
1. We can use binary search to find the smallest possible value of D.
2. Initialize `low` as 0 (minimum possible distance) and `high` as the distance between the last and first station positions (maximum possible distance).
3. While `low` is less than `high`, calculate the mid distance.
4. Use a helper function `isPossible` to check if it is possible to add K additional gas stations with a maximum distance of mid.
5. In the `isPossible` function, iterate over the stations and calculate the required number of stations to maintain the maximum distance. If the required stations are less than or equal to K, return true.
6. If `isPossible` returns true, update the answer and set high as mid-1 to search for a smaller maximum distance.
7. If `isPossible` returns false, set low as mid+1 to search for a larger maximum distance.
8. Return the answer as the smallest possible value of D.

Code:
*/

bool isPossible(double mid, vector<int>& stations, int k) {
    int req_stations = 0;
    for (int i = 1; i < stations.size(); i++) {
        req_stations += floor((stations[i] - stations[i-1]) / mid);
    }
    return req_stations <= k;
}

double findSmallestMaxDist(vector<int>& stations, int K) {
    double low = 0, high = stations[stations.size()-1] - stations[0];
    while (high - low > 1e-6) {
        double mid = low + (high - low) / 2;
        if (isPossible(mid, stations, K)) {
            high = mid;
        } else {
            low = mid;
        }
    }
    return low + 0.000001;
}

/*
Time Complexity: O(log N + N log (max_distance - min_distance))
- The binary search has a time complexity of O(log N), where N is the number of stations.
- The `isPossible` function has a time complexity of O(N), where N is the number of stations.
- Overall, the time complexity is dominated by the binary search, which contributes O(log N) to the overall complexity.

Space Complexity: O(1)
- The space complexity is constant as we are not using any extra data structures that scale with the input size.
*/