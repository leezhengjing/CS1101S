// QUESTION 3

// Instructions for students who are using this for practice:
//
// (1) Copy and paste this entire file into the editor of Source Academy
//     Playground at https://sourceacademy.nus.edu.sg/playground
// (2) Write your solution for each task in the Source Academy Playground.
// (3) Run the program to test your solution on the given testcases.


//===============================================================
// These functions are provided for running the testcases
// in the Source Academy Playground.
// They are NOT part of the actual testing facility provided
// in the actual Practical Assessment.
//===============================================================
// Tests whether arrays A and B are structurally equal.
function equal_array(A, B) {
    if (!is_array(A) || !is_array(B)) {
        return false;
    } else if (array_length(A) !== array_length(B)) {
        return false;
    } else {
        let is_equal = true;
        const len = array_length(A);
        for (let i = 0; is_equal && i < len; i = i + 1) {
            if (is_array(A[i]) || is_array(B[i])) {
                is_equal = equal_array(A[i], B[i]);
            } else {
                is_equal = equal(A[i], B[i]);
            }
        }
        return is_equal;
    }
}
// NOTE: This is NOT the actual assert function used
//       in the actual Practical Assessment.
function assert(test_name, test_func, truth, dependence) {
    const result = test_func();
    const is_equal = (is_array(truth)? equal_array(result, truth)
                                     : equal(result, truth));
    if (is_equal) {
        display(test_name + ": PASSED");
    } else {
        display(test_name + ": FAILED <<<");
    }
}
//===============================================================



//===============================================================
// TASK 3A(I)
//===============================================================
function count_lower_neighbors(emap, r, c) {

    // WRITE HERE.
    const nrows = array_length(emap);
    const ncolumns = array_length(emap[0]);
    if (r === 0 || r === nrows - 1 || c === 0 || c === ncolumns - 1) {
        return 0;
    } else {
        let count = 0;
        for (let i = -1; i < 2; i = i + 1) {
            for (let j = -1; j < 2; j = j + 1) {
                if (emap[r + i][c + j] < emap[r][c]) {
                    count = count + 1;
                } else {}
            }
        }
        return count;
    }
    // ANSWER KEY ANS BELOW
    /*
    const mRow = array_length(emap); // emap size is mRow x mCol.
    const mCol = array_length(emap[0]);

    if (r <= 0 || (mRow - 1) <= r || c <= 0 || (mCol - 1) <= c) {
        return 0;
    } else {
        let count = 0;
        for (let dr = -1; dr <= 1; dr = dr + 1) {
            for (let dc = -1; dc <= 1; dc = dc + 1) {
                if (emap[r + dr][c + dc] < emap[r][c]) {
                    count = count + 1;
                } else {}
            }
        }
        return count;
    }
    */
    // ---END TASK---
}


// TASK 3A(I) TESTS
const emapA1 =
[[3, 1, 1, 1, 1, 1, 1],
 [1, 1, 1, 1, 2, 3, 1],
 [1, 0, 3, 2, 1, 1, 0],
 [1, 1, 1, 1, 3, 1, 1],
 [1, 2, 1, 1, 3, 1, 3],
 [1, 1, 1, 1, 4, 1, 1]];
assert("3A(I)_1", () => count_lower_neighbors([[5]], 0, 0), 0, []);
assert("3A(I)_2", () => count_lower_neighbors(emapA1, 0, 0), 0, []);
assert("3A(I)_3", () => count_lower_neighbors(emapA1, 5, 4), 0, []);
assert("3A(I)_4", () => count_lower_neighbors(emapA1, 4, 6), 0, []);
assert("3A(I)_5", () => count_lower_neighbors(emapA1, 1, 1), 1, []);
assert("3A(I)_6", () => count_lower_neighbors(emapA1, 2, 2), 8, []);
assert("3A(I)_7", () => count_lower_neighbors(emapA1, 2, 3), 5, []);
assert("3A(I)_8", () => count_lower_neighbors(emapA1, 4, 4), 6, []);


//===============================================================
// TASK 3A(II)
//===============================================================
function count_peaks(emap) {

    // WRITE HERE.
    const nrows = array_length(emap);
    const ncolumns = array_length(emap[0]);
    let peak_count = 0;
    for (let r = 0; r < nrows; r = r + 1) {
        for (let c = 0; c < ncolumns; c = c + 1) {
            if (count_lower_neighbors(emap, r, c) === 8) {
                peak_count = peak_count + 1;
            }
        }
    }
    return peak_count;
    // ANS KEY ANS BELOW
    /*
    // ---BEGIN TASK---
    const mRow = array_length(emap); // emap size is mRow x mCol.
    const mCol = array_length(emap[0]);

    let count = 0;
    for (let r = 0; r < mRow; r = r + 1) {
        for (let c = 0; c < mCol; c = c + 1) {
            if (count_lower_neighbors(emap, r, c) === 8) {
                count = count + 1;
            } else {}
        }
    }
    return count;
    */
    // ---END TASK---

}


// TASK 3A(II) TESTS
const emapA2a =
[[3, 1, 1, 1, 1, 1, 1],
 [1, 1, 1, 1, 2, 3, 1],
 [1, 0, 3, 2, 1, 1, 0],
 [1, 1, 1, 1, 3, 1, 1],
 [1, 2, 1, 1, 3, 1, 3],
 [1, 1, 1, 1, 4, 1, 1]]; // 3 peaks
const emapA2b =
[[3, 1, 4, 1, 5, 1, 6, 1],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [1, 7, 1, 8, 1, 9, 1, 0],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [2, 1, 3, 1, 4, 1, 5, 2],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [1, 9, 1, 8, 1, 7, 1, 6],
 [1, 1, 1, 1, 1, 1, 1, 1],
 [8, 1, 9, 1, 8, 1, 9, 1]]; // 9 peaks
assert("3A(II)_1", () => count_peaks([[5]]),
    0, ["count_lower_neighbors"]);
assert("3A(II)_2", () => count_peaks([[2,3,4],[3,5,3],[4,3,2]]),
    1, ["count_lower_neighbors"]);
assert("3A(II)_3", () => count_peaks(emapA2a),
    3, ["count_lower_neighbors"]);
assert("3A(II)_4", () => count_peaks(emapA2b),
    9, ["count_lower_neighbors"]);


//===============================================================
// TASK 3B
//===============================================================
function count_islands(emap) {
    // WRITE HERE.
    // ANS KEY ANS, IDK HOW DO
    // ---BEGIN TASK---
    const R = array_length(emap);    // emap size is R x C.
    const C = array_length(emap[0]); // emap size is R x C.
    const label = [];                // 2D array for labelling islands.
    let island_count = 0;

    // The function island "floods" an entire island with
    // the label island_id, starting from the position (row, col).
    function label_island(row, col, island_id) {
        if ( row >= 0 && row < R && col >= 0 && col < C ) {
            if ( emap[row][col] !== 0 && label[row][col] === 0 ) {
                label[row][col] = island_id;
                label_island(row, col - 1, island_id);
                label_island(row, col + 1, island_id);
                label_island(row - 1, col, island_id);
                label_island(row + 1, col, island_id);
            } else {}
        } else {}
    }

    // The labels are initialized to 0.
    // The islands are going to be labelled from 1 onwards.
    for (let row = 0; row < R; row = row + 1) {
        label[row] = [];
        for (let col = 0; col < C; col = col + 1) {
            label[row][col] = 0;
        }
    }

    for (let row = 0; row < R; row = row + 1) {
        for (let col = 0; col < C; col = col + 1) {
            if (emap[row][col] !== 0 && label[row][col] === 0) {
                island_count = island_count + 1;
                label_island(row, col, island_count);
            } else {}
        }
    }
    return island_count;
    // ---END TASK---
}


// TASK 3B TESTS
const emapB1 =
[[2, 1, 0, 2, 1, 1, 3],
 [0, 1, 0, 1, 0, 0, 2],
 [0, 0, 0, 2, 3, 1, 1],
 [1, 0, 2, 0, 0, 0, 0],
 [0, 0, 1, 2, 0, 0, 0],
 [1, 0, 3, 0, 1, 1, 2]]; // 6 islands
const emapB2 =
[[1, 2, 0, 0, 1, 0, 0, 1],
 [1, 2, 2, 3, 1, 0, 2, 1],
 [0, 1, 1, 0, 1, 0, 0, 1],
 [0, 0, 0, 0, 0, 3, 3, 0],
 [1, 1, 2, 0, 0, 0, 0, 0],
 [1, 0, 1, 0, 0, 1, 2, 3],
 [1, 3, 2, 1, 1, 0, 1, 1]]; // 5 islands
assert("3B_1", () => count_islands([[0]]), 0, []);
assert("3B_2", () => count_islands([[1]]), 1, []);
assert("3B_3", () => count_islands([[0,0], [0,0]]), 0, []);
assert("3B_4", () => count_islands([[2,1], [1,3]]), 1, []);
assert("3B_5", () => count_islands([[0,1], [0,0]]), 1, []);
assert("3B_6", () => count_islands([[2,0], [0,1]]), 2, []);
assert("3B_7", () => count_islands(emapB1), 6, []);
assert("3B_8", () => count_islands(emapB2), 5, []);


//===============================================================
