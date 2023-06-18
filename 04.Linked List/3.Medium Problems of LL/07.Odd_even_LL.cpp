/*
QUESTION:-
Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [1,3,5,2,4]

Example 2:
Input: head = [2,1,3,5,6,4,7]
Output: [2,3,6,7,1,5,4]
*/

/*
APPROACH:
To group nodes with odd indices together followed by nodes with even indices, we can follow these steps:
1. Initialize two pointers, `odd` and `even`, to the first and second nodes respectively.
2. Save the starting node of the even list as `evenHead`.
3. Iterate while `odd->next` and `even` are not NULL.
4. Connect the odd list with the next odd node (`odd->next = even->next`).
5. Move the `odd` pointer to the next odd node (`odd = odd->next`).
6. Connect the even list with the next even node (`even->next = odd->next`).
7. Move the `even` pointer to the next even node (`even = even->next`).
8. Connect the end of the odd list with the starting node of the even list (`odd->next = evenHead`).
9. Return the head of the modified list.

This approach reorders the linked list in place without using any extra space.

TIME COMPLEXITY: O(N)
SPACE COMPLEXITY: O(1)
*/

ListNode* oddEvenList(ListNode* head) {
    if (!head || !head->next)
        return head;
    
    ListNode* odd = head;
    ListNode* even = head->next;
    ListNode* evenHead = even;  // save the starting node of the even list
    
    while (odd->next && even) {
        odd->next = even->next;  // connect the odd list with the next odd node
        if (odd->next){
            even->next = odd->next->next;  // connect the even list with the next even node
            odd = odd->next;  // move the odd pointer to the next odd node
        }
        even = even->next;  // move the even pointer to the next even node
    }
    
    odd->next = evenHead;  // connect the end of the odd list with the starting node of the even list
    
    return head;
}
