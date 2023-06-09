/*
QUESTION:
Koko loves to eat bananas. There are n piles of bananas, the ith pile has piles[i] bananas. The guards have gone and will come back in h hours.

Koko can decide her bananas-per-hour eating speed of k. Each hour, she chooses some pile of bananas and eats k bananas from that pile. If the pile has less than k bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return the minimum integer k such that she can eat all the bananas within h hours.

EXAMPLES:
Input: piles = [3,6,7,11], h = 8
Output: 4

Input: piles = [30,11,23,4,20], h = 5
Output: 30

APPROACH:
- We can apply binary search to find the minimum eating speed.
- The eating speed can range from 1 to the maximum number of bananas in a pile.
- For each eating speed, we check if it is possible to finish eating all the bananas within h hours.
- We calculate the required time based on the eating speed, considering the number of bananas in each pile.
- If the required time is less than or equal to h, it means it is possible to finish eating all the bananas within h hours.
- We update the answer accordingly and continue the binary search.


CODE:
*/

bool isPossible(int mid, vector<int>& piles, int h){
    long req = 0;
    for(auto it:piles){
        int time = it/mid;
        req += time;
        if(it%mid!=0) req++;
    }
    if(req<=h)
        return true;
    return false;
}

int minEatingSpeed(vector<int>& piles, int h) {
    int ans = -1;
    int low = 1, high = INT_MIN;
    for(auto it:piles){
        high = max(high,it);
    }
    while(low<=high){
        int mid = low+(high-low)/2;
        if(isPossible(mid,piles,h)){
            ans = mid;
            high = mid-1;
        }
        else{
            low = mid+1;
        }
    }
    return ans;
}

// TIME COMPLEXITY: O(N log M), where N is the number of piles and M is the maximum number of bananas in a pile.
// SPACE COMPLEXITY: O(1)