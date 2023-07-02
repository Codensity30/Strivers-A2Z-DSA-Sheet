/*
QUESTION:
We are given an array of integers representing asteroids in a row. Each asteroid moves at the same speed.
If two asteroids meet, the smaller one will explode. If both are the same size, both will explode.
Find out the state of the asteroids after all collisions.

APPROACH:
To solve this problem, we can use a stack to simulate the asteroid collisions.
1. We iterate through each asteroid in the given array.
2. For each asteroid, we check if it will collide with the asteroids in the stack.
   - If the current asteroid is moving to the right (positive direction), we simply push it onto the stack.
   - If the current asteroid is moving to the left (negative direction), we compare its size with the asteroids in the stack.
     - If the stack is empty or the top asteroid in the stack is also moving to the left, we push the current asteroid onto the stack.
     - If the top asteroid in the stack is moving to the right and its size is smaller than the current asteroid, we pop the top asteroid from the stack and continue the comparison.
     - If the top asteroid in the stack is moving to the right and its size is equal to or greater than the current asteroid, we do not push the current asteroid onto the stack and continue to the next asteroid.
3. After processing all the asteroids, the remaining asteroids in the stack represent the final state after collisions.

Example:
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.

CODE:
*/

vector<int> asteroidCollision(vector<int>& asteroids) {
    stack<int> st;
    for (int i = 0; i < asteroids.size(); i++) {
        int siz = abs(asteroids[i]);
        while (!st.empty() && (st.top() > 0 && asteroids[i] < 0) && (st.top() < siz)) {
            st.pop();
        }
        // Check if same size asteroids collide
        if (!st.empty() && (st.top() > 0 && asteroids[i] < 0) && st.top() == siz) {
            st.pop();
        }
        else if (st.empty() || !(st.top() > 0 && asteroids[i] < 0)) {
            st.push(asteroids[i]);
        }
    }
    vector<int> ans;
    while (!st.empty()) {
        ans.push_back(st.top());
        st.pop();
    }
    reverse(ans.begin(), ans.end());
    return ans;
}

/*
COMPLEXITY ANALYSIS:
- Let n be the number of asteroids in the given array.
- The time complexity of the solution is O(n) because we iterate through each asteroid once.
- The space complexity is O(n) because in the worst case, all asteroids can be stored in the stack.
*/
