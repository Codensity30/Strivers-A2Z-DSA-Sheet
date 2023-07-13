/*
Question:
Given the root of a binary tree, return the inorder traversal of its nodes' values.

Approach:
- inorder traversal visits the left subtree first, followed by the root node, and then the right subtree.
- We can solve this problem recursively by following the inorder traversal order.

Complexity Analysis:
- Since we are visiting each node once, the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(N) as we are using the call stack for recursion.

Code:
*/

vector<int> inorderTraversal(TreeNode* root) {
    vector<int> ans;
    solve(root, ans);
    return ans;
}

void solve(TreeNode* root, vector<int>& ans) {
    if (!root) {
        return;
    }
    solve(root->left, ans);
    ans.push_back(root->val);
    solve(root->right, ans);
}
