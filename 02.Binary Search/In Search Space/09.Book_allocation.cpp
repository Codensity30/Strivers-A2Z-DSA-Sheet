/*
Question:
You have N books, each with Ai number of pages. M students need to be allocated contiguous books, with each student getting at least one book. Out of all the permutations, the goal is to find the permutation where the student with the most pages allocated to him gets the minimum number of pages, out of all possible permutations.

Note: Return -1 if a valid assignment is not possible, and allotment should be in contiguous order.

Example:

Input:
N = 4
A[] = {12,34,67,90}
M = 2
Output: 113
Explanation:
Allocation can be done in following ways:
{12} and {34, 67, 90} Maximum Pages = 191
{12, 34} and {67, 90} Maximum Pages = 157
{12, 34, 67} and {90} Maximum Pages = 113.
Therefore, the minimum of these cases is 113, which is selected as the output.

Approach:
- We can use binary search to find the minimum number of pages that can be allocated to the student with the most pages.
- The range for binary search will be from the minimum number of pages in the array to the sum of all the pages in the array.
- For each mid value, we will check if it is possible to allocate the books in a way that the maximum number of pages for a student is less than or equal to mid.
- To check this, we iterate through the array of pages and keep track of the number of students and the sum of pages allocated to the current student.
- If at any point, the sum exceeds the mid value, we increment the number of students and reset the sum to the current page value.
- If the number of students exceeds the given M, it means we need more students to allocate the pages, so we return false.
- If at the end, the number of students is less than or equal to M, it means it is possible to allocate the pages within the given constraints, so we return true.
- Finally, we perform binary search and find the minimum mid value that returns true in the isPossible function.

Code:
*/

bool isPossible(int mid, int A[], int N, int M) {
    int pos_m = 1;
    int temp = 0;
    for (int i = 0; i < N; i++) {
        if (temp + A[i] <= mid) {
            temp += A[i];
        } else {
            pos_m++;
            if (A[i] > mid)
                return false;
            temp = A[i];
        }
    }
    if (pos_m <= M)
        return true;
    return false;
}

int findPages(int A[], int N, int M) {
    if (M > N)
        return -1;
    int low = INT_MAX, high = 0;
    int ans = -1;
    for (int i = 0; i < N; i++) {
        low = min(low, A[i]);
        high += A[i];
    }
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (isPossible(mid, A, N, M)) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

/*
Time Complexity: O(N log S), where N is the number of books and S is the sum of all the pages in the array. The binary search takes log S iterations, and for each iteration, we check the validity of allocation in O(N) time.
Space Complexity: O(1), as we are using a constant amount of extra space.
*/