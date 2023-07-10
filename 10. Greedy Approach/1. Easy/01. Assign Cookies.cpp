/*
Question:
Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.

Each child i has a greed factor g[i], which is the minimum size of a cookie that the child will be content with; and each cookie j has a size s[j]. If s[j] >= g[i], we can assign the cookie j to the child i, and the child i will be content. Your goal is to maximize the number of your content children and output the maximum number.

Example:
Input: g = [1,2,3], s = [1,1]
Output: 1
Explanation: You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. 
And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
You need to output 1.

Approach:
1. Sort the greed factor array g and the cookie size array s in ascending order.
2. Initialize a counter variable child to track the number of content children.
3. Iterate over the cookie size array s and check if the current cookie size is greater than or equal to the greed factor of the current child.
4. If it is, increment the child counter and move to the next child.
5. Finally, return the total number of content children.

Complexity Analysis:
- Sorting the arrays takes O(n log n) time, where n is the size of the arrays.
- The iteration over the arrays takes O(n) time.
- Therefore, the overall time complexity is O(n log n).

Code:
*/

int findContentChildren(vector<int>& g, vector<int>& s) {
    sort(g.begin(), g.end());
    sort(s.begin(), s.end());
    int child = 0;
    for (int i = 0; i < s.size() && child < g.size(); i++) {
        if (s[i] >= g[child])
            child++;
    }
    return child;
}
