/*
Question:
Given the root of a binary tree, calculate the vertical order traversal of the binary tree.
There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values.

Approach:
- We can perform a level order traversal of the binary tree while keeping track of the horizontal distance (hd) of each node from the root.
- For each node at position (row, col), its left and right children will be at positions (row + 1, col - 1) and (row + 1, col + 1) respectively.
- We can use a queue to perform the level order traversal. The queue will store pairs of (hd, node), where hd represents the horizontal distance and node represents the current node being processed.
- During the traversal, we maintain an unordered_map to store the nodes at each horizontal distance. The key in the map is the horizontal distance (hd), and the value is a vector of pairs representing the level and value of the nodes at that horizontal distance.
- After the traversal, we iterate over the keys in the map in ascending order and sort the nodes within each horizontal distance based on their levels. We then extract the values and add them to the result vector.
- Finally, we return the result vector containing the vertical order traversal.

Complexity Analysis:
- Since we visit each node once and perform constant time operations for each node, the time complexity of this approach is O(N), where N is the number of nodes in the binary tree.
- The space complexity is O(N), where N is the number of nodes in the binary tree. This space is used to store the nodes in the unordered_map during the traversal.

Code:
*/

// NOTE:- we are keeping track of levels because of the question condition but if no such condition exists, then no need of level only hd will work.

vector<vector<int>> verticalTraversal(TreeNode* root) {
    if (!root) return {};

    unordered_map<int, vector<pair<int, int>>> mp;
    int mini = 0, maxi = 0;
    queue<pair<int, TreeNode*>> q;
    q.push({0, root});

    int lvl = 0;
    while (!q.empty()) {
        int n = q.size();
        for (int i = 0; i < n; i++) {
            auto p = q.front();
            q.pop();
            TreeNode* curr = p.second;
            int hd = p.first;
            if (curr->left) {
                mini = min(mini, hd - 1);
                q.push({hd - 1, curr->left});
            }
            if (curr->right) {
                maxi = max(maxi, hd + 1);
                q.push({hd + 1, curr->right});
            }
            mp[hd].push_back({lvl, curr->val});
        }
        lvl++;
    }

    vector<vector<int>> ans;
    for (int i = mini; i <= maxi; i++) {
        sort(mp[i].begin(), mp[i].end());
        vector<int> temp;
        for (auto it : mp[i])
            temp.push_back(it.second);
        ans.push_back(temp);
    }

    return ans;
}
