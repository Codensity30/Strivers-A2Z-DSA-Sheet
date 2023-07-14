/*
Question:
Given a binary tree, determine if it is height-balanced.

Approach:
- We can solve this problem recursively by checking if the left and right subtrees of each node are height-balanced.
- For each node, we calculate the height of its left and right subtrees, and check if the absolute difference of their heights is at most 1.
- If both subtrees are height-balanced, and the absolute difference of their heights is at most 1, then the current node and its subtree are height-balanced.
- We can use a pair of values to represent the result of the recursion: the first value indicates if the subtree is height-balanced, and the second value represents the height of the subtree.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node, the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(H), where H is the height of the binary tree. In the worst case, the tree can be skewed and have a height of N, resulting in O(N) space complexity. In the best case, the tree is balanced and has a height of log(N), resulting in O(log(N)) space complexity.

Code:
*/

pair<bool, int> solve(TreeNode* root) {
    if (!root) {
        return {true, 0};
    }
    auto left = solve(root->left);
    auto right = solve(root->right);
    int height = max(left.second, right.second) + 1;
    bool balanced = left.first && right.first && abs(left.second - right.second) <= 1;
    return {balanced, height};
}

bool isBalanced(TreeNode* root) {
    auto result = solve(root);
    return result.first;
}
