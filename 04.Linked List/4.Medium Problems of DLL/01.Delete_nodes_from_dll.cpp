/**QUESTION:**

You are given the head of a doubly Linked List and a key. Your task is to delete all occurrences of the given key and return the new doubly Linked List.

**Example:**

Input: 
2 <-> 2 <-> 10 <-> 8 <-> 4 <-> 2 <-> 5 <-> 2
Key: 2
Output: 
10 <-> 8 <-> 4 <-> 5
Explanation: 
All occurrences of 2 have been deleted.

**APPROACH:**

To delete all occurrences of the given key from a doubly linked list, we can traverse the list and check each node's data. If the data matches the key, we handle three cases: deleting the first node, deleting the last node, and deleting a middle node. We update the pointers accordingly to remove the node from the list.

**TIME COMPLEXITY:** The time complexity is O(N), where N is the number of nodes in the doubly linked list.

**SPACE COMPLEXITY:** The space complexity is O(1) since we are modifying the given linked list in-place without using any extra space.

**CODE:**/

void deleteAllOccurOfX(struct Node** head_ref, int x) {
    Node* curr = *head_ref;
    while (curr) {
        if (curr->data == x) {
            // First node
            if (!curr->prev) {
                *head_ref = curr->next;
            }
            // Last node
            else if (!curr->next) {
                curr->prev->next = curr->next;
            }
            // Middle node
            else {
                curr->next->prev = curr->prev;
                curr->prev->next = curr->next;
            }
        }
        curr = curr->next;
    }
}
