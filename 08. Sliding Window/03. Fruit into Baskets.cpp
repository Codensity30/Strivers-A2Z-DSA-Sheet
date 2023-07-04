/*QUESTION:
You are visiting a farm that has a single row of fruit trees arranged from left to right. The trees are represented by an integer array fruits of size N, where fruits[i] is the type of fruit the ith tree produces.
You want to collect as much fruit as possible. However, the owner has some strict rules that you must follow:
1. You only have two baskets, and each basket can only hold a single type of fruit. There is no limit on the amount of fruit each basket can hold.
2. Starting from any tree of your choice, you must pick exactly one fruit from every tree (including the start tree) while moving to the right. The picked fruits must fit in one of the baskets.
3. Once you reach a tree with fruit that cannot fit in your baskets, you must stop.

Given the integer array fruits, return the maximum number of fruits you can pick.

Example 1:
Input: N = 3, fruits[] = {2, 1, 2}
Output: 3
Explanation: We can pick fruits from all three trees.

APPROACH:
1. Initialize an unordered_map mp to track the frequency of fruit types.
2. Initialize variables ans and start to keep track of the maximum number of fruits and the start index of the subarray.
3. Iterate through the fruit trees using a sliding window approach:
   - Increment the frequency of the current fruit type in the map.
   - Enter a while loop to adjust the start index until the number of fruit types in the map becomes more than 2.
   - During the adjustment, decrement the frequency of the fruit type at the start index and remove it from the map if the frequency becomes 0.
   - Update the ans by taking the maximum of the current ans and the length of the current subarray if the number of fruit types in the map is at most 2.
4. Return the maximum number of fruits (ans).

CODE:*/

int totalFruits(int N, vector<int>& fruits) {
    unordered_map<int, int> mp;
    int ans = 0, start = 0;
    for(int i = 0; i < fruits.size(); i++) {
        mp[fruits[i]]++;
        while(mp.size() > 2) {
            mp[fruits[start]]--;
            if(mp[fruits[start]] == 0)
                mp.erase(fruits[start]);
            start++;
        }
        if(mp.size() <= 2)
            ans = max(ans, i - start + 1);
    }
    return ans;
}

/*
COMPLEXITY ANALYSIS:
- Time complexity: O(N), where N is the number of fruit trees. We iterate through the fruit trees once using the sliding window approach.
- Space complexity: O(1) or O(2), as the size of the map can be at most 2 since we only have two baskets.
*/
