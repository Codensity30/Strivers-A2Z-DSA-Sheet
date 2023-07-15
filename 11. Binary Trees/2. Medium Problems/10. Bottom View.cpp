/*
Question:
Given a binary tree, print its bottom view.

Approach:
- We can perform a level order traversal of the binary tree while keeping track of the horizontal distance (hd) and the level of each node from the root.
- For each node, we update its horizontal distance and level in the map.
- Since we want to print the nodes in the order of their horizontal distance, we maintain the minimum and maximum horizontal distances (`mini` and `maxi`) during the traversal.
- Finally, we iterate over the range from `mini` to `maxi` and retrieve the corresponding values from the map, and add them to the result vector.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node, the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(N), where N is the number of nodes in the binary tree. This space is used to store the nodes in the map during the traversal.

Code:
*/

vector<int> getBottomView(TreeNode<int> *root) {
    if (!root) return {};

    unordered_map<int, pair<int, int>> mp;
    int mini = 0, maxi = 0;
    queue<pair<TreeNode<int>*, pair<int, int>>> q;
    q.push({root, {0, 0}});

    while (!q.empty()) {
        auto p = q.front();
        q.pop();
        TreeNode<int>* curr = p.first;
        int hd = p.second.first;
        int level = p.second.second;

        mp[hd] = {curr->data, level};
        mini = min(mini, hd);
        maxi = max(maxi, hd);

        if (curr->left) {
            q.push({curr->left, {hd - 1, level + 1}});
        }
        if (curr->right) {
            q.push({curr->right, {hd + 1, level + 1}});
        }
    }

    vector<int> ans;
    for (int i = mini; i <= maxi; i++) {
        ans.push_back(mp[i].first);
    }

    return ans;
}
