/*
Question:-
Given two sorted arrays arr1 and arr2 of size N and M respectively and an element K.
Find the element that would be at the kth position of the final sorted array.

Example:- 

Input:
arr1[] = {2, 3, 6, 7, 9}
arr2[] = {1, 4, 8, 10}
k = 5
Output:
6
Explanation:
The final sorted array would be -
1, 2, 3, 4, 6, 7, 8, 9, 10
The 5th element of this array is 6.

Approach:
1. Compare the sizes of the two arrays, arr1 and arr2. If the size of arr1 is greater than arr2, swap the arrays to ensure arr1 is the smaller sized array.
2. Set the low and high variables for binary search.
   - If m < k, set low = k - m, otherwise set low = 0.
   - If k < n, set high = k, otherwise set high = n.
3. Perform binary search within the range [low, high] to find the kth element.
4. In each iteration of binary search:
   - Calculate the cut positions, cut1 and cut2, based on the mid position.
   - Determine the left and right elements of arr1 and arr2 based on the cut positions.
   - Compare the left and right elements and adjust the low and high pointers accordingly.
5. Return the maximum element among the left elements, as it would be the kth element in the final sorted array.

CODE
*/

int kthElement(int arr1[], int arr2[], int n, int m, int k)
{
    // assuming arr1 is the smaller sized array
    if (n > m)
        kthElement(arr2, arr1, m, n, k);

    int low, high;
    (m < k) ? low = k - m : low = 0;
    (k < n) ? high = k : high = n;

    while (low <= high) {
        int cut1 = low + (high - low) / 2;
        int cut2 = k - cut1;

        int l1, l2, r1, r2;

        (cut1 - 1 < 0) ? l1 = INT_MIN : l1 = arr1[cut1 - 1];
        (cut2 - 1 < 0) ? l2 = INT_MIN : l2 = arr2[cut2 - 1];
        (cut1 >= n) ? r1 = INT_MAX : r1 = arr1[cut1];
        (cut2 >= m) ? r2 = INT_MAX : r2 = arr2[cut2];

        if (l1 <= r2 && l2 <= r1) {
            return max(l1, l2);
        }
        else if (l1 > r2) {
            high = cut1 - 1;
        }
        else {
            low = cut1 + 1;
        }
    }
}

/*
Time Complexity: O(log(min(N, M)))
Space Complexity: O(1)
*/
