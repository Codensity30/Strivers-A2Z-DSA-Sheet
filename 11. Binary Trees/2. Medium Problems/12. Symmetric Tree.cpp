/**
 QUESTION:
 Given the root of a binary tree, check whether it is a mirror of itself
 (i.e., symmetric around its center).
 
 Example:
 Input: root = [1,2,2,3,4,4,3]
 Output: true
 */

/**
 APPROACH:
 We can solve this problem using a recursive approach.
 1. Define a helper function "isMirror" that takes two tree nodes as input.
 2. Base case:
    - If both nodes are NULL, return true.
    - If either node is NULL, return false.
 3. Check if the values of the two nodes are equal.
 4. Recursively call "isMirror" on the left and right children of the two nodes:
    - isMirror(node1->left, node2->right)
    - isMirror(node1->right, node2->left)
 5. Return the logical AND of the above two recursive calls.
 6. In the main "isSymmetric" function, return the result of calling "isMirror" on the root's left and right children.
 
 COMPLEXITY ANALYSIS:
 - The time complexity is O(N), where N is the number of nodes in the binary tree, as we need to visit all the nodes once.
 - The space complexity is O(H), where H is the height of the tree, due to the recursive function calls on the stack.
   In the worst case, the height of the tree can be equal to the number of nodes, resulting in O(N) space complexity.

CODE:-
*/

bool isMirror(TreeNode* node1, TreeNode* node2) {
    if (!node1 && !node2)
        return true;
    if (!node1 || !node2)
        return false;
    return (node1->val == node2->val) &&
           isMirror(node1->left, node2->right) &&
           isMirror(node1->right, node2->left);
}

bool isSymmetric(TreeNode* root) {
    return isMirror(root->left, root->right);
}
