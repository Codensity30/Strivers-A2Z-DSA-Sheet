/*
Question:
Given the roots of two binary trees p and q, write a function to check if they are the same or not.
Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

Approach:
- The trees are considered the same if they have the same structure (i.e., same nodes in the same arrangement) and the corresponding nodes have the same values.
- We can use a recursive approach to check if the trees are the same.
- The trees are the same if both trees are empty (reached the end of the tree) or both trees are non-empty and the current nodes have the same value, and the left subtrees and right subtrees are the same.
- We can check if the trees are the same by comparing the values of the current nodes and recursively checking the left subtrees and right subtrees.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node, the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(H), where H is the height of the binary tree. In the worst case, the tree can be skewed and have a height of N, resulting in O(N) space complexity. In the best case, the tree is balanced and has a height of log(N), resulting in O(log(N)) space complexity.

Code:
*/

bool isSameTree(TreeNode* p, TreeNode* q) {
    if (!p && !q) {
        return true; // Both trees are empty, they are the same
    }
    if (!p || !q) {
        return false; // One tree is empty and the other is not, they are different
    }
    return (p->val == q->val) && isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
}
