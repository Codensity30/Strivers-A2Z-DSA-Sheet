/*
Question:
Given a binary tree, print its top view.

Approach:
- We can perform a level order traversal of the binary tree while keeping track of the horizontal distance (hd) of each node from the root.
- For each node, if the horizontal distance is not present in the map, we add it to the map along with its value.
- Since we want to print the nodes in the order of their horizontal distance, we maintain the minimum and maximum horizontal distances (`mini` and `maxi`) during the traversal.
- Finally, we iterate over the range from `mini` to `maxi` and retrieve the corresponding values from the map, and add them to the result vector.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node, the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(N), where N is the number of nodes in the binary tree. This space is used to store the nodes in the map during the traversal.

Code:
*/

vector<int> getTopView(TreeNode<int> *root) {
    if (!root) return {};

    unordered_map<int, int> mp;
    int mini = 0, maxi = 0;
    queue<pair<int, TreeNode<int>*>> q;
    q.push({0, root});

    while (!q.empty()) {
        auto p = q.front();
        q.pop();
        TreeNode<int>* curr = p.second;
        int hd = p.first;
        if (curr->left) {
            mini = min(mini, hd - 1);
            q.push({hd - 1, curr->left});
        }
        if (curr->right) {
            maxi = max(maxi, hd + 1);
            q.push({hd + 1, curr->right});
        }
        if (mp.find(hd) == mp.end())
            mp[hd] = curr->data;
    }

    vector<int> ans;
    for (int i = mini; i <= maxi; i++) {
        ans.push_back(mp[i]);
    }

    return ans;
}
