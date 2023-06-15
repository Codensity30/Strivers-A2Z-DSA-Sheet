/*
QUESTION:- 
Create a link list of size N according to the given input literals. Each integer input is accompanied by an indicator which can either be 0 or 1. If it is 0, insert the integer in the beginning of the link list. If it is 1, insert the integer at the end of the link list. 
Hint: When inserting at the end, make sure that you handle NULL explicitly.

Example 1:

Input:
LinkedList: 9->0->5->1->6->1->2->0->5->0
Output: 5 2 9 5 6
Explanation:
Length of Link List = N = 5
9 0 indicated that 9 should be
inserted in the beginning. Modified
Link List = 9.
5 1 indicated that 5 should be
inserted in the end. Modified Link
List = 9,5.
6 1 indicated that 6 should be
inserted in the end. Modified Link
List = 9,5,6.
2 0 indicated that 2 should be
inserted in the beginning. Modified
Link List = 2,9,5,6.
5 0 indicated that 5 should be
inserted in the beginning. Modified
Link List = 5,2,9,5,6. 
Final linked list = 5, 2, 9, 5, 6.

Example 2:

Input:
LinkedList: 5->1->6->1->9->1
Output: 5 6 9

The approach to solving this problem is as follows:

1. Initialize an empty linked list by setting the `head` pointer to `NULL`.
2. Iterate through the given input literals.
3. If the indicator is 0, insert the integer at the beginning of the linked list by calling the `insertAtBeginning` function. This function creates a new node with the given integer value and inserts it at the beginning of the linked list.
4. If the indicator is 1, insert the integer at the end of the linked list by calling the `insertAtEnd` function. This function creates a new node with the given integer value and inserts it at the end of the linked list.
5. After iterating through all the input literals, the resulting linked list will be the desired output.

Time complexity of this approach is O(N), where N is the number of input literals, as we need to iterate through all the literals to construct the linked list.
Space complexity is O(1) as we are not using any extra space that grows with the input size. We only need a constant amount of space to store the pointers and temporary variables.

CODE:-
*/

Node *insertAtBegining(Node *head, int x) {
    if(head==NULL)
        return new Node(x);
    Node* temp = new Node(x);
    temp->next = head;
    return temp;    
}


//Function to insert a node at the end of the linked list.
Node *insertAtEnd(Node *head, int x)  {
    if(head==NULL)
        return new Node(x);
    Node* curr = head;
    while(curr->next){
        curr = curr->next;
    }
    curr->next = new Node(x);
    return head;
}