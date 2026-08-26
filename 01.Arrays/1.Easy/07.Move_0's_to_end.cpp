/*
QUESTION:-
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:

Input: nums = [0]
Output: [0]
*/

/*
APPROACH:-
-> while iterating check if nums[i] is a non-zero element.
    -> if yes, swap(nums[lastNonZeroIndex], nums[i]) and increment lastNonZeroIndex by +1
-> the advantage is that we dont need to do another pass looking for next zeroth element unlike brute force
-> here lastNonZeroIndex is always ahead of i, so no swap will take place when i == lastNonZeroIndex
*/

// CODE:-
void moveZeroes(vector<int> &nums)
{
    int lastNonZero = 0;

    for (int i = 0; i < nums.size(); i++)
    {
        if(nums[i]!=0)
        {
            swap(nums[lastNonZero],nums[i]);
            lastNonZero++;
        }
    }
}

// TIME COMPLEXITY = O(N)
// SPACE COMPLEXITY = O(1)