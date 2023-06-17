/*
QUESTION:-
You are given two non-empty linked lists representing two non-negative integers. 
The digits are stored in reverse order, and each of their nodes contains a single digit. 
Add the two numbers and return the sum as a linked list.

APPROACH:
Traverse both linked lists simultaneously, starting from the heads.
At each step, add the corresponding digits from both linked lists along with the carry (initialized as 0).
Create a new node with the sum%10 and update the carry as sum/10.
Move to the next nodes in both linked lists.
Continue this process until both linked lists are traversed completely and there is no carry left.
If one linked list is shorter than the other, consider its remaining digits as 0.
If there is still a remaining carry, create a new node with the carry and append it to the result linked list.
Return the head of the result linked list.

TIME COMPLEXITY: O(max(N, M)), where N and M are the lengths of the two input linked lists.
SPACE COMPLEXITY: O(max(N, M)), as the length of the result linked list can be at most max(N, M)+1.

*/

ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
    ListNode* p1 = l1;
    ListNode* p2 = l2;
    ListNode* dummy = new ListNode(); // Dummy node to simplify the logic
    ListNode* ans = dummy;
    int sum = 0, carry = 0;
    while (p1 || p2) {
        sum += carry; // Add the carry from the previous step
        if (p1) {
            sum += p1->val;
            p1 = p1->next;
        }
        if (p2) {
            sum += p2->val;
            p2 = p2->next;
        }
        ans->next = new ListNode(sum % 10); // Create a new node with the current digit
        carry = sum / 10; // Update the carry for the next step
        sum = 0;
        ans = ans->next; // Move to the next node in the result linked list
    }
    if (carry) {
        ans->next = new ListNode(carry); // Append the remaining carry as a new node
    }
    return dummy->next; // Return the head of the result linked list (excluding the dummy node)
}
