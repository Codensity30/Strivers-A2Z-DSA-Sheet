/*
QUESTION:-
Given the head of a linked list, return the list after sorting it in ascending order.

Example:
Input: head = [4,2,1,3]
Output: [1,2,3,4]

APPROACH:
To sort a linked list, we can use the merge sort algorithm.
1. Implement a function to merge two sorted linked lists.
2. Implement a function to recursively divide the linked list into two halves.
3. Apply merge sort on each half.
4. Merge the sorted halves using the merge function.
5. Return the head of the sorted linked list.

TIME COMPLEXITY: O(NlogN)
SPACE COMPLEXITY: O(logN) - Recursive stack space

*/

ListNode* merge(ListNode* left, ListNode* right) {
    if (left == NULL)
        return right;
    if (right == NULL)
        return left;
    
    if (left->val < right->val) {
        left->next = merge(left->next, right);
        return left;
    } else {
        right->next = merge(left, right->next);
        return right;
    }
}

ListNode* mergeSort(ListNode* start) {
    if (start == NULL || start->next == NULL)
        return start;
    
    ListNode* slow = start;
    ListNode* fast = start->next;
    
    // Find the middle of the linked list
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
    }
    
    ListNode* a = mergeSort(slow->next); // Sort the right half
    slow->next = NULL; // Break the linked list into two halves
    ListNode* b = mergeSort(start); // Sort the left half
    
    return merge(a, b); // Merge the sorted halves
}

ListNode* sortList(ListNode* head) {
    return mergeSort(head);
}
