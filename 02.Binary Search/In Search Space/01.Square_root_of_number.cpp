/*
QUESTION:
Given an integer x, find the square root of x. If x is not a perfect square, then return floor(√x).

Example:

Input:
x = 5
Output: 2
Explanation: Since 5 is not a perfect square, the floor of the square root of 5 is 2.

Input:
x = 4
Output: 2
Explanation: Since 4 is a perfect square, the square root of 4 is 2.

APPROACH:
We can use binary search to find the square root of x. 
1. Initialize the search space with low = 1 and high = x.
2. While low is less than or equal to high:
     - Calculate the mid of the search space.
     - If the square of mid is equal to x, return mid as the square root.
     - If the square of mid is less than x, update the answer to mid and set low = mid + 1 to search for a larger value.
     - If the square of mid is greater than x, set high = mid - 1 to search for a smaller value.
3. Return the answer, which represents the floor of the square root of x.

CODE:
*/

long long int floorSqrt(long long int x) 
{
    long long int low = 1, high = x;
    long long int ans = -1;
    while(low <= high){
        long long int mid = low + (high - low) / 2;
        if(x == mid * mid)
            return mid;
        else if(mid * mid < x){
            ans = mid;
            low = mid + 1;
        }
        else
            high = mid - 1;
    }
    return ans;
}

/*
Time Complexity: O(log(x))
Space Complexity: O(1)
*/