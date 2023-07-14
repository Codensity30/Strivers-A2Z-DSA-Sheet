/*
Question:
Given the root of a binary tree, return the inorder traversal of its nodes' values.

Approach:
- We can perform an inorder traversal iteratively using a stack.
- The idea is to push all the left children of a node into the stack until we reach a node with no left child.
- Then, we pop a node from the stack, add its value to the result vector, and move to its right child (if it exists).
- We repeat this process until the stack is empty and all nodes are traversed.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node, the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(N) as we store the node values in the result vector and use a stack to keep track of the nodes.

Code:
*/

void pushLeft(TreeNode* curr, stack<TreeNode*>& st) {
    while (curr) {
        st.push(curr);
        curr = curr->left;
    }
}

vector<int> inorderTraversal(TreeNode* root) {
    if (!root) {
        return {};
    }
    stack<TreeNode*> st;
    TreeNode* curr = root;
    pushLeft(curr, st);
    vector<int> ans;
    while (!st.empty()) {
        curr = st.top();
        st.pop();
        ans.push_back(curr->val);
        curr = curr->right;
        if (curr) {
            pushLeft(curr, st);
        }
    }
    return ans;
}
