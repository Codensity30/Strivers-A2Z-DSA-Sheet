/*
QUESTION:-
Given a linked list of size N. The task is to complete the function countNodesinLoop() that checks whether a given Linked List contains a loop or not and if the loop is present then return the count of nodes in a loop or else return 0. C is the position of the node to which the last node is connected. If it is 0 then no loop.

Example 1:
Input: N = 10
value[]={25,14,19,33,10,21,39,90,58,45}
C = 4
Output: 7
Explanation: The loop is 45->33. So
length of loop is 33->10->21->39->
90->58->45 = 7. The number 33 is
connected to the last node to form the
loop because according to the input the
4th node from the beginning(1 based
index) will be connected to the last
node for the loop.

Example 2:
Input: N = 2
value[] = {1,0}
C = 1
Output: 2
Explanation: The length of the loop
is 2.
*/

/*
APPROACH:
To detect a loop in a linked list, we can use the Floyd's cycle-finding algorithm, also known as the "tortoise and hare" algorithm.
Initialize two pointers, slow and fast, to the head of the linked list.
Move the slow pointer one step at a time and the fast pointer two steps at a time.
If the linked list has a loop, the fast pointer will eventually catch up to the slow pointer.
In other words, if there is a loop, the two pointers will meet at some point.
Once the two pointers meet, move one of the pointers back to the meeting point and start counting the number of nodes in the loop.
Continue moving the pointer until it reaches the meeting point again, counting the nodes along the way.
Return the count of nodes in the loop.
If the fast pointer reaches the end of the list (i.e., it becomes NULL or reaches a node with a NULL next pointer), then there is no loop in the linked list, and we can return 0.
*/

int countNode(struct Node* slow, struct Node* fast) {
    int cnt = 1;
    slow = slow->next;
    while (fast != slow) {
        slow = slow->next;
        cnt++;
    }
    return cnt;
}

int countNodesinLoop(struct Node* head) {
    struct Node* slow = head;
    struct Node* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (fast == slow)
            return countNode(slow, fast);
    }
    return 0;
}

// TIME COMPLEXITY: O(N)
// SPACE COMPLEXITY: O(1)


