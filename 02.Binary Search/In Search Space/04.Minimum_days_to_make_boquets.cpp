/*
Question:
You are given an integer array bloomDay, an integer m, and an integer k. You want to make m bouquets. To make a bouquet, you need to use k adjacent flowers from the garden.

The garden consists of n flowers, where the i-th flower will bloom on the bloomDay[i] day and can be used in exactly one bouquet.

Return the minimum number of days you need to wait to be able to make m bouquets from the garden. If it is impossible to make m bouquets, return -1.

Example:

Input:
bloomDay = [1,10,3,10,2]
m = 3
k = 1

Output:
3

Explanation:
Let us see what happened in the first three days. x means flower bloomed and _ means flower did not bloom in the garden.
We need 3 bouquets each should contain 1 flower.
After day 1: [x, _, _, _, _]   // we can only make one bouquet.
After day 2: [x, _, _, _, x]   // we can only make two bouquets.
After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.
*/

/*
Approach:
- Use binary search to find the minimum number of days required to make m bouquets.
- The search space will be between the minimum and maximum bloom day.
- For each mid value, simulate the process of making bouquets.
- Count the number of bouquets that can be made using k adjacent flowers on or after the current day.
- If the count is equal to or greater than m, update the answer and search in the lower half of the search space.
- If the count is less than m, search in the upper half of the search space.
*/

bool isPossible(int mid, vector<int>& bloomDay, int m, int k) {
    int bqts = 0, temp = 0;
    for(auto it:bloomDay){
        if(it<=mid)
            temp++;
        else
            temp = 0;
        if(temp==k){
            bqts++;
            temp = 0;
        }
    }
    if(bqts>=m)
        return true;
    return false;
}

int minDays(vector<int>& bloomDay, int m, int k) {
    if((long)m*k > bloomDay.size())
        return -1;

    int ans = -1;
    int low = INT_MAX, high = INT_MIN;
    for(auto it:bloomDay){
        low = min(low,it);
        high = max(high,it);
    }

    while(low<=high){
        int mid = low+(high-low)/2;
        if(isPossible(mid,bloomDay,m,k)){
            ans = mid;
            high = mid-1;
        }
        else{
            low = mid+1;
        }
    }
    return ans;
}

// Time Complexity: The binary search approach takes O(log n), where n is the number of elements in the `bloomDay` array.
// Space Complexity: The space complexity is O(1) since we are using a constant amount of extra space.