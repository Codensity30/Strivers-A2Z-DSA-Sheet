/*
Given a sorted doubly linked list of positive distinct elements, the task is to find pairs in the doubly linked list whose sum is equal to a given value `target`.

Example 1:
Input:  
1 <-> 2 <-> 4 <-> 5 <-> 6 <-> 8 <-> 9
Target: 7
Output: (1, 6), (2, 5)
Explanation: We can see that there are two pairs (1, 6) and (2, 5) with a sum of 7.

Example 2:
Input: 
1 <-> 5 <-> 6
Target: 6
Output: (1, 5)
Explanation: We can see that there is one pair (1, 5) with a sum of 6.

Approach:
1. Initialize two pointers, `start` and `end`, pointing to the beginning and end of the doubly linked list, respectively.
2. While the `start` pointer's data is less than the `end` pointer's data:
   - Calculate the sum of the data at the `start` and `end` pointers.
   - If the sum is equal to the target value, add the pair (start->data, end->data) to the result vector and move both the `start` and `end` pointers.
   - If the sum is less than the target value, move the `start` pointer to the next node.
   - If the sum is greater than the target value, move the `end` pointer to the previous node.
3. Return the result vector containing all the pairs whose sum is equal to the target.

Time Complexity: O(N), where N is the number of nodes in the doubly linked list.
Space Complexity: O(1).

CODE:
*/
vector<pair<int, int>> findPairsWithGivenSum(Node *head, int target)
{
    vector<pair<int, int>> ans;
    Node* start = head;
    Node* end = head;
    while (end->next) {
        end = end->next;
    }
    while (start->data < end->data) {
        int sum = start->data + end->data;
        if (sum == target) {
            ans.push_back({ start->data, end->data });
            start = start->next;
            end = end->prev;
        }
        else if (sum < target) {
            start = start->next;
        }
        else {
            end = end->prev;
        }
    }
    return ans;
}
