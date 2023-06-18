/**QUESTION:**

Given a Linked List of size N, where every node represents a sub-linked-list and contains two pointers:
(i) a next pointer to the next node,
(ii) a bottom pointer to a linked list where this node is the head.
Each of the sub-linked lists is in sorted order.
Flatten the Link List such that all the nodes appear in a single level while maintaining the sorted order.

Note: The flattened list will be printed using the bottom pointer instead of the next pointer.

**APPROACH:**

To flatten the linked list, we can use a recursive approach. The idea is to flatten the list from right to left. Starting from the last node, we recursively flatten the sublist pointed by the bottom pointer and merge it with the current node. We continue this process until we reach the head of the original linked list. Finally, we return the flattened list.

**TIME COMPLEXITY:** The time complexity is O(N), where N is the total number of nodes in the linked list.

**SPACE COMPLEXITY:** The space complexity is O(1) since we are modifying the given linked list in-place without using any extra space.

**CODE:**/

Node* merge(Node* head1, Node* head2)  
{  
    if (head1 == NULL)
        return head2;
    if (head2 == NULL)
        return head1;
    if (head1->data < head2->data) {
        head1->bottom = merge(head1->bottom, head2);
        return head1;
    }
    else {
        head2->bottom = merge(head1, head2->bottom);
        return head2;
    }
}

Node* flatten(Node* root)
{
    if (root == NULL)
        return root;

    Node* left = root;
    Node* right = flatten(root->next);
    root->next = NULL;
    left = merge(left, right);
    return left;
}