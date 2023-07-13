/*
Question:
You are given an array nodes. It contains 7 integers, which represents the value of nodes of the binary tree in level order traversal. You are also given a root of the tree which has a value equal to nodes[0].
Your task to construct a binary tree by creating nodes for the remaining 6 nodes.

Approach:
- We can solve this problem recursively by performing a level-order traversal of the tree.
- Starting from the root node, we can recursively create the left and right child nodes using the given array of values.
- The position of each child node in the array can be calculated based on the index of its parent node.

Complexity Analysis:
- Since we are visiting each node once, the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(N) as we are using the call stack for recursion.

Code:
*/

struct node {
    int data;
    node* left;
    node* right;
};

node* newNode(int data) {
    node* newNode = new node();
    newNode->data = data;
    newNode->left = NULL;
    newNode->right = NULL;
    return newNode;
}

node* solve(vector<int>& vec, int i) {
    if(i >= 7) {
        return NULL;
    }
    
    node* root = newNode(vec[i]);
    i = 2 * i;
    root->left = solve(vec, i + 1);
    root->right = solve(vec, i + 2);
    
    return root;
}

void create_tree(node*& root0, vector<int>& vec) {
    root0 = solve(vec, 0);
}
