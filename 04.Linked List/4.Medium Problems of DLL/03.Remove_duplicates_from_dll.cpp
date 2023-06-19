/*Given a doubly linked list of n nodes sorted by values, the task is to remove duplicate nodes present in the linked list.

Example 1:
Input:
n = 6
1<->1<->1<->2<->3<->4
Output:
1<->2<->3<->4
Explanation:
Only the first occurrence of the node with value 1 is retained, and the rest of the nodes with value 1 are deleted.

Example 2:
Input:
n = 7
1<->2<->2<->3<->3<->4<->4
Output:
1<->2<->3<->4
Explanation:
Only the first occurrence of nodes with values 2, 3, and 4 are retained, and the rest of the repeating nodes are deleted.

Approach:
1. Initialize a variable `dupli` with the value of the head node.
2. Start from the next node, `curr`, and iterate until the end of the linked list.
3. For each node, check if its data is equal to `dupli`.
   - If it is equal, remove the node by updating the `next` and `prev` pointers of its neighboring nodes.
   - Continue removing all consecutive nodes with the same value.
4. If `curr` is not null, update `dupli` with the data of `curr`.
5. Repeat steps 3-4 until the end of the linked list is reached.
6. Return the head of the modified linked list.

Time Complexity: O(N), where N is the number of nodes in the linked list.
Space Complexity: O(1).

CODE:
*/
Node* removeDuplicates(Node* head)
{
    int dupli = head->data;
    Node* curr = head->next;

    while (curr) {
        while (curr && curr->data == dupli) {
            if (curr->next)
                curr->next->prev = curr->prev;
            curr->prev->next = curr->next;
            curr = curr->next;
        }
        if (curr) {
            dupli = curr->data;
            curr = curr->next;
        }
    }
    return head;
}
