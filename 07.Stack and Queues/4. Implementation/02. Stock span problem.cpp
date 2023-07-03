/*
QUESTION:
Design an algorithm to calculate the span of a stock's price for the current day based on the price history.

APPROACH:
To solve this problem, we can use a stack to store the prices along with their corresponding spans.
1. Initialize an empty stack and a variable to keep track of the current day (let's call it 'cnt').
2. For each price, do the following:
   - While the stack is not empty and the price at the top of the stack is less than or equal to the current price, pop elements from the stack.
   - Calculate the span for the current price using the following formula:
     - If the stack is empty, the span is cnt + 1.
     - Otherwise, the span is cnt - stack.top().second, where stack.top().second represents the day corresponding to the price at the top of the stack.
   - Push the current price along with its span (pair<int, int>) onto the stack.
   - Increment the 'cnt' variable.
3. Return the calculated spans.

Example:
Input: [100, 80, 60, 70, 60, 75, 85]
Output: [1, 1, 1, 2, 1, 4, 6]

CODE:
*/

class StockSpanner {
public:
    stack<pair<int, int>> st;
    int cnt;

    StockSpanner() {
        cnt = 0;
    }
    
    int next(int price) {
        while (!st.empty() && st.top().first <= price)
            st.pop();
        
        int ans = 1;
        
        if (!st.empty())
            ans = cnt - st.top().second;
        else
            ans = cnt + 1;
        
        st.push({price, cnt});
        cnt++;
        
        return ans;
    }
};

/*
COMPLEXITY ANALYSIS:
- The time complexity for each 'next' operation is O(1) on average because each price is pushed and popped from the stack at most once.
- The space complexity is O(n), where n is the number of prices, because the stack can store at most n elements.
*/

