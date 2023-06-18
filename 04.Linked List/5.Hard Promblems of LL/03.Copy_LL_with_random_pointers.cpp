/*
QUESTION:
A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null.

Construct a deep copy of the list. The deep copy should consist of exactly n brand new nodes, where each new node has its value set to the value of its corresponding original node. Both the next and random pointer of the new nodes should point to new nodes in the copied list such that the pointers in the original list and copied list represent the same list state. None of the pointers in the new list should point to nodes in the original list.

For example, if there are two nodes X and Y in the original list, where X.random --> Y, then for the corresponding two nodes x and y in the copied list, x.random --> y.

Return the head of the copied linked list.

The linked list is represented in the input/output as a list of n nodes. Each node is represented as a pair of [val, random_index] where:

val: an integer representing Node.val
random_index: the index of the node (range from 0 to n-1) that the random pointer points to, or null if it does not point to any node.
Your code will only be given the head of the original linked list.

Example 1:
Input: head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
Output: [[7,null],[13,0],[11,4],[10,2],[1,0]]

Example 2:
Input: head = [[1,1],[2,1]]
Output: [[1,1],[2,1]]

APPROACH:
To create a deep copy of a linked list with random pointers, we can follow these steps:
1. Traverse the original linked list and create a new node for each node in the original list. Insert the new node between the original node and its next node.
2. Set the random pointer of the new node by mapping it to the corresponding random node in the original list.
3. Separate the original list and the copied list by updating the next pointers of nodes in both lists.
4. Return the head of the copied list.

TIME COMPLEXITY:
The time complexity of this approach is O(n) since we traverse the original list once to create the copied list.

SPACE COMPLEXITY:
The space complexity is also O(n) because we create a new node for each node in the original list.

CODE:
*/
Node* copyRandomList(Node* head) {
    if (head == NULL)
        return head;

    // inserting dupli node in between
    Node* orig = head;
    while (orig) {
        Node* temp = orig->next;
        orig->next = new Node(orig->val);
        orig->next->next = temp;
        orig = orig->next->next;
    }
    // setting random pointers
    orig = head;
    while (orig) {
        if (orig->random && orig->next)
            orig->next->random = orig->random->next;
        orig = orig->next->next;
    }
    // setting next pointers and dettaching duplicate nodes from the original list
    orig = head;
    Node* ans = orig->next;
    while (orig && orig->next) {
        Node* temp = orig->next->next;
        if (orig->next->next)
            orig->next->next = orig->next->next->next;
        orig->next = temp;
        orig = orig->next;
    }
    return ans;
}
