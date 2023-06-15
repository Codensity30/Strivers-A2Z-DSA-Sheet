/*
QUESTION:-
Given a doubly linked list of n elements. The task is to reverse the doubly linked list.

Example 1:

Input:
LinkedList: 3 <--> 4 <--> 5
Output: 5 4 3
Example 2:

Input:
LinkedList: 75 <--> 122 <--> 59 <--> 196
Output: 196 59 122 75

APPROACH:-
1. Initialize two pointers `curr` and `nxt` to traverse the linked list. Set `curr` to the head of the linked list.
2. In each iteration, store the next node in the `nxt` pointer to avoid losing the reference to the next node.
3. Swap the `next` and `prev` pointers of the current node (`curr`).
4. Check if the `prev` pointer of the current node (`curr->prev`) is `NULL`, which indicates that `curr` is the last node of the original linked list. If so, update the `ans` pointer to point to `curr` (the new head of the reversed linked list).
5. Move the `curr` pointer to the previous node (`curr = curr->prev`) using the stored `nxt` pointer.
6. Repeat steps 2-5 until `curr` becomes `NULL`, indicating that we have reached the end of the original linked list.
7. Return the `ans` pointer, which now points to the head of the reversed linked list.

Time complexity of this approach is O(N), where N is the number of nodes in the doubly linked list. We need to traverse the entire list once to reverse the links.
Space complexity is O(1) as we are using a constant amount of extra space to store temporary pointers during the reversal process.
*/

Node* reverseDLL(Node * head)
{
    Node* curr = head;
    Node* ans = NULL;
    while(curr){
        Node* nxt = curr->next;
        curr->next = curr->prev;
        curr->prev = nxt;
        // this is to get the last node
        if(curr->prev==NULL)
            ans = curr;
        curr = curr->prev;
    }
    return ans;
}