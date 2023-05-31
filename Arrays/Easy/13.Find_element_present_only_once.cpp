/*
QUESTION:-
Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.
You must implement a solution with a linear runtime complexity and use only constant extra space.


Example 1:
Input: nums = [2,2,1]
Output: 1

Example 2:
Input: nums = [4,1,2,1,2]
Output: 4
*/

/*
APPROACH:-
-> We can use XOR operation as we know xor cancles out the same elements
-> Intial xr=0 then traverse the entire array and xor each element with xr
-> Since only one element is present once and all other are present twice so the remaining element would be the
    one which is present only once cause all other gets cancels out
*/

// CODE:-
int singleNumber(vector<int> &nums)
{
    int xr = 0;
    for (int i = 0; i < nums.size(); i++)
    {
        xr = nums[i] ^ xr;
    }
    return xr;
}

// TIME COMPLEXITY = O(N)
// SPACE COMPLEXITY = O(0)