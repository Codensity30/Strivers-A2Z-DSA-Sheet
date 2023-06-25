/*QUESTION:-
Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:
- Each of the digits 1-9 must occur exactly once in each row.
- Each of the digits 1-9 must occur exactly once in each column.
- Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
- The '.' character indicates empty cells.

Example:
Input:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]

Output:
[
  ["5","3","4","6","7","8","9","1","2"],
  ["6","7","2","1","9","5","3","4","8"],
  ["1","9","8","3","4","2","5","6","7"],
  ["8","5","9","7","6","1","4","2","3"],
  ["4","2","6","8","5","3","7","9","1"],
  ["7","1","3","9","2","4","8","5","6"],
  ["9","6","1","5","3","7","2","8","4"],
  ["2","8","7","4","1","9","6","3","5"],
  ["3","4","5","2","8","6","1","7","9"]
]

Approach:
We can solve the Sudoku puzzle using a backtracking approach.
1. Iterate over each cell in the board.
2. If the cell is empty (denoted by '.'), try placing a digit from 1 to 9.
3. Check if the placement is valid by verifying that the digit does not already exist in the same row, column, or 3x3 sub-box.
4. If the placement is valid, update the cell with the digit and move to the next cell recursively.
5. If the placement is not valid or we have reached the end of the board, backtrack by undoing the placement and trying the next digit.
6. Repeat this process until we have filled all the cells or found a valid solution.

Time Complexity: The time complexity of the backtracking algorithm for solving a Sudoku puzzle is O(9^(m*n)), where m and n are the number of rows and columns in the board. In the worst case, we have to try all possible combinations.
Space Complexity: The space complexity is O(1) as we are using a constant amount of space for the board and temporary variables.

CODE:-*/

bool isValid(int row, int col, char digit, vector<vector<char>>& board) {
    for (int i = 0; i < 9; i++) {
        if (board[row][i] == digit)
            return false;
        if (board[i][col] == digit)
            return false;
        if (board[3 * (row / 3) + (i / 3)][3 * (col / 3) + (i % 3)] == digit)
            return false;
    }
    return true;
}

bool solve(vector<vector<char>>& board) {
    for (int i = 0; i < board.size(); i++) {
        for (int j = 0; j < board[0].size(); j++) {
            if (board[i][j] == '.') {
                for (char digit = '1'; digit <= '9'; digit++) {
                    if (isValid(i, j, digit, board)) {
                        board[i][j] = digit;
                        if (solve(board))
                            return true;
                        board[i][j] = '.';
                    }
                }
                return false;
            }
        }
    }
    return true;
}
