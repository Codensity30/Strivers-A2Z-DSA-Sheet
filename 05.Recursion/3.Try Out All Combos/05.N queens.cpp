/**
 * Question: The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.
 * Given an integer n, return all distinct solutions to the n-queens puzzle.
 *
Example 1:


Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above

 * Approach:
 * 1. Use backtracking to solve the n-queens puzzle.
 * 2. Start with an empty chessboard and try placing queens in each row, ensuring that no two queens threaten each other.
 * 3. Use row, column, and diagonal constraints to validate the queen placements.
 * 4. If a valid configuration is found, add it to the list of solutions.
 *
 * Time Complexity: O(N!), where N is the input parameter representing the size of the chessboard.
 *   - In the worst case, there can be N! possible configurations to check.
 *   - However, with the pruning technique used in backtracking, the actual runtime is much less than N! in most cases.
 *
 * Space Complexity: O(N^2), where N is the input parameter representing the size of the chessboard.
 *   - The space is used to store the chessboard configuration and the auxiliary arrays for tracking the used columns and diagonals.
 */

unordered_map<int,bool>rowMap ;
unordered_map<int,bool>left_downMap;
unordered_map<int,bool>left_upMap;

vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> ans;
    vector<string> board (n,string(n,'.'));
    solve(0,n,board,ans);
    return ans;
}

void solve(int col, int n, vector<string>& board, vector<vector<string>>& ans){

    if(col==n){
        ans.push_back(board);
        return;
    }

    for(int row = 0; row < n; row++){
        if(isValid(row,col,n)){
            // setting in maps
            rowMap[row] = true;
            left_downMap[row+col+n] = true;
            left_upMap[row-col+n] = true;

            // making recursive calls
            board[row][col] = 'Q';
            solve(col+1,n,board,ans);
            board[row][col] = '.';

            // unsetting in maps
            rowMap[row] = false;
            left_downMap[row+col+n] = false;
            left_upMap[row-col+n] = false;
        }
    }
}

bool isValid(int row, int col, int n){
    
    bool cnd1 = rowMap[row];
    bool cnd2 = left_upMap[row-col+n];
    bool cnd3 = left_downMap[row+col+n];

    return (cnd1 || cnd2 || cnd3)? false:true;
}
