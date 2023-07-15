/*
Question:
Given the root of a binary tree, return the zigzag level order traversal of its nodes' values. (i.e., from left to right, then right to left for the next level and alternate between).

Approach:
- We can use a queue to perform a level order traversal of the binary tree.
- To achieve the zigzag order, we can use a flag variable to keep track of the current direction (left to right or right to left) for each level.
- Initialize a boolean variable `ltor` to true, where true represents the left to right direction.
- While traversing each level, we store the values of the nodes in a temporary vector.
- If `ltor` is true, we push the left child first and then the right child into the queue for the next level.
- If `ltor` is false, we push the right child first and then the left child into the queue for the next level.
- After processing all the nodes in the current level, if `ltor` is false, we reverse the temporary vector to achieve the right to left direction for the next level.
- We alternate the value of `ltor` after processing each level to switch between left to right and right to left directions.
- Finally, we return the vector containing the zigzag level order traversal.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node, the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(M), where M is the maximum number of nodes at any level in the binary tree. In the worst case, the maximum number of nodes at any level can be N/2 (in a complete binary tree), resulting in O(N) space complexity.

Code:
*/

vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
    if (!root) return {}; // Empty tree, return an empty vector

    vector<vector<int>> ans; // Vector to store the zigzag level order traversal
    queue<TreeNode*> q; // Queue for level order traversal
    q.push(root);
    bool ltor = true; // Flag variable to track the current direction (left to right or right to left)

    while (!q.empty()) {
        int n = q.size(); // Number of nodes at the current level
        vector<int> levelValues; // Temporary vector to store the values of nodes at the current level

        for (int i = 0; i < n; i++) {
            TreeNode* curr = q.front();
            q.pop();

            levelValues.push_back(curr->val);

            if (curr->left) q.push(curr->left);
            if (curr->right) q.push(curr->right);
        }

        if (!ltor) {
            reverse(levelValues.begin(), levelValues.end()); // Reverse the values to achieve right to left direction
        }

        ans.push_back(levelValues);

        ltor = !ltor; // Alternate the direction for the next level
    }

    return ans;
}
