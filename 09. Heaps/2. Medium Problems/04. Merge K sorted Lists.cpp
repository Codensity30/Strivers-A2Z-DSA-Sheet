/*
QUESTION:
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

APPROACH:
To merge K sorted linked lists, we can use a min-heap (priority queue) to store the smallest nodes from each list.
1. Create a min-heap of size K to store the current smallest nodes from each list.
2. Initialize the min-heap with the head node from each list.
3. While the min-heap is not empty, extract the smallest node from the min-heap, add it to the merged linked list, and replace it with the next node from the same list.
4. Repeat step 3 until all nodes from all lists are processed.

The mergeKLists function implements this approach. It uses a min-heap (priority queue) to merge K sorted linked lists into one sorted linked list.

TIME COMPLEXITY:
The time complexity of the mergeKLists function is O(N log K), where N is the total number of nodes across all lists and K is the number of linked lists. Inserting nodes into the min-heap and extracting the minimum node take O(log K) time, and we do this for N nodes. The overall time complexity is dominated by the heap operations.

SPACE COMPLEXITY:
The space complexity is O(K) as we need to store K nodes in the min-heap.
*/

ListNode* mergeKLists(vector<ListNode*>& lists) {
    priority_queue<pair<int, ListNode*>, vector<pair<int, ListNode*>>, greater<pair<int, ListNode*>>> pq;

    for (int i = 0; i < lists.size(); i++) {
        if (lists[i]) {
            pq.push({lists[i]->val, lists[i]});
        }
    }

    ListNode* dummy = new ListNode();
    ListNode* ans = dummy;

    while (!pq.empty()) {
        auto top = pq.top();
        pq.pop();
        dummy->next = new ListNode(top.first);
        dummy = dummy->next;
        ListNode* nxt = top.second->next;
        if (nxt) {
            pq.push({nxt->val, nxt});
        }
    }

    return ans->next;
}
