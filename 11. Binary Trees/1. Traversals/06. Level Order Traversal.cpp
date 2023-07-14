/*
Question:
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

Approach:
- We can perform a level order traversal using a queue.
- We start by pushing the root node into the queue.
- Then, while the queue is not empty, we process each level by taking the size of the queue and iterating over the nodes at that level.
- For each node, we add its value to the current level's vector and push its left and right child nodes into the queue if they exist.
- After processing each level, we add the level's vector to the result vector.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node, the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(N) as we store the node values in the result vector.

Code:
*/

vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> ans;
    if (!root) {
        return ans;
    }
    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        vector<int> level;
        int n = q.size();
        for (int i = 0; i < n; i++) {
            TreeNode* curr = q.front();
            q.pop();
            level.push_back(curr->val);
            if (curr->left) {
                q.push(curr->left);
            }
            if (curr->right) {
                q.push(curr->right);
            }
        }
        ans.push_back(level);
    }

    return ans;
}
