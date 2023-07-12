/*
Question:
Given arrival and departure times of all trains that reach a railway station, find the minimum number of platforms required for the railway station so that no train is kept waiting.
Consider that all the trains arrive on the same day and leave on the same day. Arrival and departure time can never be the same for a train, but we can have the arrival time of one train equal to the departure time of another. At any given instance of time, the same platform cannot be used for both the departure of a train and the arrival of another train. In such cases, we need different platforms.

Example:
Input: n = 6
arr[] = {0900, 0940, 0950, 1100, 1500, 1800}
dep[] = {0910, 1200, 1120, 1130, 1900, 2000}
Output: 3
Explanation:
Minimum 3 platforms are required to safely arrive and depart all trains.

Approach:
- We sort the arrival and departure arrays in non-decreasing order.
- We initialize variables 'i', 'j', 'plat', and 'ans' to 0.
- We iterate over the arrival array using 'i' and departure array using 'j'.
- If the arrival time at index 'i' is less than or equal to the departure time at index 'j', it means a train is arriving and we need an additional platform.
  - So, we increment 'i' and 'plat'.
  - We update 'ans' with the maximum value of 'ans' and 'plat'.
- If the arrival time is greater than the departure time, it means a train has departed and we can free up a platform.
  - So, we increment 'j' and decrement 'plat'.
- Finally, we return 'ans' as the minimum number of platforms required.

Complexity Analysis:
- The time complexity of this approach is O(NlogN), where N is the number of trains.
- We sort the arrival and departure arrays, which takes O(NlogN) time.
- The space complexity is O(1) as we use only a constant amount of extra space.

Code:
*/

int findPlatform(int arr[], int dep[], int n)
{
    sort(arr, arr + n);
    sort(dep, dep + n);
    int i = 0, j = 0, plat = 0, ans = 0;
    while (i < n) {
        if (arr[i] <= dep[j]) {
            i++;
            plat++;
            ans = max(ans, plat);
        }
        else {
            j++;
            plat--;
        }
    }
    return ans;
}
