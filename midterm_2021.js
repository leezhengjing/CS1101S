// 2021 Midterm Paper
// Section A: List Notation

// Q1
/*
What is the result of evaluating the following Source program in list notation?
const xs = list(6, 7, 8);
pair(xs, tail(xs));
*/
// list( list(6, 7, 8), 7, 8 )

// Ans: A

// Q2

// Ans : E

// Q3

// Ans: B

// Section B: Box and Pointer Diagrams
// Q4
const result_1 = map(x => list(x), enum_list(1, 1000));

// Q5
const result_2 = accumulate((x, y) => list(x, y),
                             null,
                             enum_list(1, 10));

// My attempt below

const result_2_1 = accumulate((x, y) => pair(x, list(y)),
                             null,
                             enum_list(1, 10));

display(result_2);

// Section C: Orders of Growth
// Q6 
function fun_1(N) {
    return N <= 1 ? 1 : fun_1(2 * N / 3) * (2 * N / 3);
}
// Theta(log N)

// Q7
function fun_2(N) {
    return N <= 1000000 ? N : (N / 1000000) + fun_2(N – 1000000);
}
// Theta(N)

// Q8
function fun_3(N) {
    return N <= 1 ? N : fun_3(N / 2) + fun_3(N / 2) + 1;
}
// Theta(N)

// Q9
function fun_4(N) {
    if (N <= 1) {
        return N;
    } else {
        const h = x => x <= 0 ? 0 : x + h(x - 1);
        return h(N) + fun_4(N - 1);
    }
}
// Theta(N^2)

// Q10
function fun(N) {
    if (N <= 1) {
        return N;
    } else {
        const x = accumulate((x, y) => x + y, 0, enum_list(1, N));
        return x + fun(N / 2) + fun(N / 2);
    }
}
// Theta(N log N)

// Section D: Matrices
// Q11
/*
Complete the function get_elem that takes as arguments a matrix M, a row number r, and a column
number c, and returns the matrix element at Row r and Column c. Note that the topmost row in the
matrix is Row 0 and the leftmost column is Column 0.

Example:
const A = list( list(1, 2, 3), list(4, 5, 6), list(7, 8, 9) );
get_elem(A, 0, 2); // returns 3
get_elem(A, 2, 0); // returns 7
*/
function get_elem(M, r, c) {
    return list_ref(list_ref(M, r), c);
}

// Q12
/*
Complete the function horizontal_flip that takes as argument a matrix M, and returns a matrix that
is the horizontal flip of M.

Example:
const A = list( list(1,2,3,4), list(5,6,7,8), list(9,10,11,12) );
horizontal_flip(A);
// returns list( list(4,3,2,1), list(8,7,6,5), list(12,11,10,9) )
*/
function horizontal_flip(M) {
    return map(xs => reverse(xs), M);
}

// Q13
/*
Complete the function row_sums that takes as argument a matrix M, and returns a list of numbers
containing the sum of elements in each row of M.

Example:
const A = list( list(1,2,3,4), list(5,6,7,8), list(9,10,11,12) );
row_sums(A);
// returns list(10, 26, 42)
*/

function row_sums(M) {
    return map(xs => accumulate((x,y) => x + y, 0, xs), M);
}

// Q14
/*
The transpose of a R  C matrix M is a C  R matrix T such that
get_elem(M, r, c) === get_elem(T, c, r).\

Complete the function transpose that takes as argument a matrix M, and returns a matrix that is the
transpose of M.
function transpose(M) {
    const nR = length(M); // number of rows
    const nC = length(head(M)); // number of columns
    // You may not need to use nR and/or nC.
    return map( / your solution / , enum_list(0, nC - 1) );
}
Example:
const A = list( list(1,2,3,4), list(5,6,7,8), list(9,10,11,12) );
transpose(A);
// returns list( list(1,5,9), list(2,6,10), list(3,7,11), list(4,8,12) )
*/

function transpose(M) {
    const nR = length(M); // number of rows
    const nC = length(head(M)); // number of columns
    return map(k => 
               accumulate((x,y) => pair(list_ref(x, k), y),
                          null,
                          M),
               enum_list(0, nC - 1) );
} //My answer//

// given answers//
function transpose(M) {
    const nR = length(M); // number of rows
    const nC = length(head(M)); // number of columns
    // You may not need to use nR and/or nC.
    // Solution 1:
    return map( c => map(row => list_ref(row, c), M) ,
                enum_list(0, nC - 1) )
    // Solution 2:
    return map( c => map(r => get_elem(M, r, c), enum_list(0, nR - 1)) ,
                enum_list(0, nC - 1) );
}

// Section E: Pair Trees
// Q15
// B 

// Q16
// B

// Q17
/*
Write the function has(t, x) that returns true if pair-tree t contains the number x, otherwise it
returns false.

function has(t, x) {
    * your solution *
}

Examples:
const t1 = 8;
has(t1, 4); // returns false
has(t1, 8); // returns true
const t2 = pair(pair(1, 2), pair(3, pair(4, 5)));
has(t2, 4); // returns true
has(t2, 8); // returns false
*/
function has(t, x) {
    return is_number(t)
    ? t === x
    : has(head(t), x) || has(tail(t), x);
}

// Q18
/* A path is a list of functions that are successively applied to a pair-tree to reach a subtree. For example,
the path list(head, tail, tail) applied to pair(pair(1, pair(2, 5)), 3) gives you 5.
Write the function apply(p, t) that takes a path p and a pair-tree t as arguments and returns the
subtree of t that p refers to. You can assume that the given path p is a valid path within pair-tree t.
function apply(p, t) {
    * your solution *
}
Examples:
const t1 = 8;
apply(null, t1); // returns 8
const t2 = pair(pair(1, 2), pair(3, pair(4, 5)));
apply( list(tail, tail, head), t2 ); // returns 4
apply( list(head), t2 ); // returns pair(1, 2) */
function apply(p, t) {
    return is_null(p)
        ? t
        : apply(tail(p), (head(p))(t));
}

// Q19
/*
Assume that the number 8 (lucky number) appears exactly once in a given pair-tree. Write the
function find_8(t) that takes the pair-tree as an argument and returns the unique path to 8, i.e.
apply(find_8(t), t) should return 8 if t contains exactly one 8.
function find_8(t) {
 * your solution *
}
Examples:
const t1 = 8;
find_8(t1); // returns null
const t2 = pair(pair(1, 2), pair(3, pair(8, 5)));
find_8(t2); // returns list(tail, tail, head)

*/
function find_8(t) {
    return is_number(t)
    ? null
    : has(head(t), 8)
        ? pair(head, find_8(head(t)))
        : pair(tail, find_8(tail(t)));
}

// Q20 COIN CHANGE QUESTION

/* 
Write the function find_all_8(t) that takes a pair-tree t as argument and returns the list of all paths
that lead to the number 8. The order of the paths in the result list does not matter. Note that the number
8 might appear any number of times in the pair-tree, including not at all.
function find_all_8(t) {
    * your solution *
}
Examples:
const t1 = 8;
find_all_8(t1); // returns list(null)
const t2 = pair(pair(1, 2), pair(3, pair(4, 5)));
find_all_8(t2); // returns null
const t3 = pair(8, pair(8, pair(8, 2)));
find_all_8(t3);
// returns list( list(head), list(tail, head), list(tail, tail, head) )
*/

function find_all_8(t) {
    return is_number(t)
    ? (t === 8 ? list(null) : null)
    : append( map(x => pair(head, x), find_all_8(head(t))),
              map(x => pair(tail, x), find_all_8(tail(t))) );
}