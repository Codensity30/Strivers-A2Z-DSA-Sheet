/*
QUESTION:-
Given a doubly-linked list, a position p, and an integer x. The task is to add a new node with value x at the position just after pth node in the doubly linked list.

Example 1:

Input:
LinkedList: 2<->4<->5
p = 2, x = 6 
Output: 2 4 5 6
Explanation: p = 2, and x = 6. So, 6 is
inserted after p, i.e, at position 3
(0-based indexing).
Example 2:

Input:
LinkedList: 1<->2<->3<->4
p = 0, x = 44
Output: 1 44 2 3 4
Explanation: p = 0, and x = 44 . So, 44
is inserted after p, i.e, at position 1
(0-based indexing).

APPROACH:-
The approach to adding a node at a specific position in a doubly linked list is as follows:

1. Initialize a counter `cnt` to 0 and a pointer `curr` to the head of the linked list.
2. Traverse the linked list using the `curr` pointer until the `cnt` is less than the specified position.
3. Increment the `cnt` by 1 and move the `curr` pointer to the next node in each iteration.
4. Once the `cnt` reaches the desired position, create a new node with the given data.
5. Set the `next` pointer of the new node to the next node of the current node (`curr->next`) and the `prev` pointer of the new node to the current node (`curr`).
6. Update the `next` pointer of the current node (`curr->next`) to point to the new node.
7. If the new node is inserted in the middle of the list, update the `prev` pointer of the next node (`nxt`) to point to the new node.
8. The new node is successfully inserted into the linked list.

Time complexity of this approach is O(N), where N is the number of nodes in the doubly linked list. In the worst case, we may need to traverse the entire list to reach the desired position.
Space complexity is O(1) as we are using a constant amount of extra space to store temporary pointers during the insertion process.

CODE:-
*/

void addNode(Node *head, int pos, int data)
{
   int cnt = 0;
   Node* curr = head;
   while(cnt<pos){
       curr = curr->next;
       cnt++;
   }
   Node* nxt = curr->next;
   curr->next = new Node(data);
   curr->next->prev = curr;
   curr->next->next = nxt;
}