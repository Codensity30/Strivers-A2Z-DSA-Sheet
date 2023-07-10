/*
Question:
Given weights and values of N items, we need to put these items in a knapsack of capacity W to get the maximum total value in the knapsack.
Note: Unlike 0/1 knapsack, you are allowed to break the item.

Example:
Input:
N = 3, W = 50
values[] = {60, 100, 120}
weight[] = {10, 20, 30}
Output:
240.00
Explanation: Total maximum value of items
we can have is 240.00 from the given
capacity of the sack.

Approach:
1. We will define a comparator function that compares items based on their value/weight ratio in descending order.
2. We will sort the items array based on the comparator function.
3. Initialize a variable loot to keep track of the total value in the knapsack.
4. Iterate over the items array, starting from the item with the highest value/weight ratio.
5. If the weight of the current item is greater than the remaining capacity W, we take a fraction of the item to fill the remaining capacity.
   The fraction is determined by the remaining capacity divided by the weight of the current item.
6. Add the fraction of the item's value to the loot.
7. Reduce the remaining capacity by the weight of the item.
8. Repeat steps 5-7 until the remaining capacity becomes zero or all items are considered.
9. Finally, return the loot, which represents the maximum total value in the knapsack.

Complexity Analysis:
- The sorting step takes O(n log n) time, where n is the number of items.
- The iteration over the items takes O(n) time.
- Therefore, the overall time complexity is O(n log n).

Code:
*/

static bool comp(Item a, Item b) {
    return a.value / (a.weight * 1.0) > b.value / (b.weight * 1.0);
}

double fractionalKnapsack(int W, Item arr[], int n) {
    sort(arr, arr + n, comp);
    double loot = 0;
    for (int i = 0; i < n && W; i++) {
        if (arr[i].weight > W) {
            loot += (W * (arr[i].value / (arr[i].weight * 1.0)));
            W = 0;
        } else {
            loot += arr[i].value;
            W -= arr[i].weight;
        }
    }
    return loot;
}
