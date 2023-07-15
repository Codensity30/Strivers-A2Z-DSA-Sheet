/*
Question:
Given a Binary Tree, find its Boundary Traversal. The traversal should be in the following order:

Left boundary nodes: defined as the path from the root to the left-most node, i.e., the leaf node you could reach when you always travel preferring the left subtree over the right subtree.
Leaf nodes: All the leaf nodes except for the ones that are part of the left or right boundary.
Reverse right boundary nodes: defined as the path from the right-most node to the root. The right-most node is the leaf node you could reach when you always travel preferring the right subtree over the left subtree. Exclude the root from this as it was already included in the traversal of left boundary nodes.
Note: If the root doesn't have a left subtree or right subtree, then the root itself is the left or right boundary.

Approach:
- We can divide the boundary traversal into three parts: left boundary nodes, leaf nodes, and reverse right boundary nodes.
- To find the left boundary nodes, we can traverse the left subtree from the root to the leftmost leaf node. We add the values of the nodes to the answer vector during this traversal.
- To find the leaf nodes, we can perform a separate recursive traversal of the binary tree and add the values of the leaf nodes (excluding the ones already included in the left boundary or right boundary) to the answer vector.
- To find the reverse right boundary nodes, we can traverse the right subtree from the root to the rightmost leaf node (excluding the root). We add the values of the nodes to the answer vector during this traversal.
- Finally, we return the answer vector containing the boundary traversal.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node, the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(H), where H is the height of the binary tree. In the worst case, the height of the binary tree can be N, resulting in O(N) space complexity.

Code:
*/

void leftTraversal(TreeNode<int>* root, vector<int>& ans) {
    if (!root) return;
    if (!root->left && !root->right) return;

    ans.push_back(root->val);

    if (root->left)
        leftTraversal(root->left, ans);
    else
        leftTraversal(root->right, ans);
}

void leafTraversal(TreeNode<int>* root, vector<int>& ans) {
    if (!root) return;
    if (!root->left && !root->right) {
        ans.push_back(root->val);
    }
    leafTraversal(root->left, ans);
    leafTraversal(root->right, ans);
}

void rightTraversal(TreeNode<int>* root, vector<int>& ans) {
    if (!root) return;
    if (!root->left && !root->right) return;

    int temp = root->val;

    if (root->right)
        rightTraversal(root->right, ans);
    else
        rightTraversal(root->left, ans);

    ans.push_back(temp);
}

vector<int> boundaryTraversal(TreeNode<int>* root) {
    if (!root) return {};
    vector<int> ans;

    ans.push_back(root->val);
    leftTraversal(root->left, ans);
    leafTraversal(root->left, ans);
    leafTraversal(root->right, ans);
    rightTraversal(root->right, ans);

    return ans;
}
