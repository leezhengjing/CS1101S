// Midterms 21_22 Paper
// Section A
// Q1
function repeat(v, k) {
    return k === 0
        ? null
        : pair(v, repeat(v, k - 1));
}

// Q2
function expand_list(L, k) {
    return accumulate((x,y) => append(repeat(x, k), y), null, L);
}

// Q3
function expand_matrix(M, k) {
    // return accumulate((x,y) => append(repeat(expand_list(x, k), k), y), null, M);
    return expand_list( map(r => expand_list(r, k), M), k );
}

display(expand_matrix(list(list(1, 2, 3), list(4, 5, 6)), 3));

display(list( list(1, 1, 1, 2, 2, 2, 3, 3, 3),
              list(1, 1, 1, 2, 2, 2, 3, 3, 3),
              list(1, 1, 1, 2, 2, 2, 3, 3, 3),
              list(4, 4, 4, 5, 5, 5, 6, 6, 6),
              list(4, 4, 4, 5, 5, 5, 6, 6, 6), 
              list(4, 4, 4, 5, 5, 5, 6, 6, 6)));

// Section B: Orders of growth
// Q4 
function fun(N) {
    return N < 1 ? 0 : (N / 2) + fun(N - 1000);
}
// Theta(N)

// Q5 

function fun_2(N) {
    return N < 1 ? 0 : (N * N) + fun_2(N - 1) + fun_2(N - 1);
}

// Theta(2^N)

// Q6

function fun_3(N) {
    return N <= 1 ? 1: N* fun_3(N / 4);
}

// Theta(log N)

// Q7

function fun_4(N) {
    return N < 1 ? null : pair(enum_list(1, N), fun(N - 1));
}

// Theta(N^2)

// Q8

function fun_5(N) {
    return N < 1 ? null : append(enum_list(1, N), fun(N - 1));
}

// Theta(N^2)

// Section C
// Q9
/* 
Given a list of numbers that is already sorted in ascending order, the function unique returns a
list with all the duplicates removed and the remaining numbers are sorted in ascending order. For
example,
unique( list(1, 1, 1, 2, 3, 3, 4, 4, 5, 6, 6, 6) );
// returns list(1, 2, 3, 4, 5, 6)
*/
function unique(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        return head(xs) !== head(tail(xs))
            ? pair(head(xs), unique(tail(xs)))
            : unique(tail(xs));
    
}

display(unique(list(1, 1, 1, 2, 3, 3, 4, 4, 5, 6, 6, 6)));

// Q10 MCQ
// A
/*
Complete the following implementation of unique, which gives rise to an iterative process.
function unique(xs) {
    function iter(ys, result) {
        if (is_null(ys)) {
            return result;
        } else {
            return iter(tail(ys), / YOUR SOLUTION / );
        }
    }
    return iter(reverse(xs), null);
}
*/

function unique_iter(xs) {
    function iter(ys, result) {
        if (is_null(ys)) {
            return result;
        } else {
            return iter(tail(ys), 
                        is_null(result) || head(ys) !== head(result)
                        ? pair(head(ys), result)
                        : result);
        }
    }
    return iter(reverse(xs), null);
}

display(unique_iter(list(1, 1, 1, 2, 3, 3, 4, 4, 5, 6, 6, 6)));

// Section D
// Question 11
/*
Complete the function remove_elem that takes as arguments an active list A, and a non-negative
integer pos, and returns an active list that has the same elements as A but with A(pos) removed.
The value of pos is assumed less than the length of A. Do not use the make_active_list function
in your solution.
function remove_elem(A, pos) {
    return / YOUR SOLUTION /
}
Example:
const as = make_active_list(list(8, 3, 5, 7));
const bs = remove_elem(as, 2);
active_length(bs); // returns 3
list(bs(0), bs(1), bs(2), bs(3));
// returns list(list(8), list(3), list(7), null)
*/

function remove_elem(A, pos) {
    return p => p < pos? A(p) : A(p + 1);
}

// Question 12
/*
Complete the function zip that takes as arguments two active lists A and B of the same length, and
returns an active list in which the elements of A and B are interleaved. For example,
const as = make_active_list(list(11, 22, 33));
const bs = make_active_list(list(44, 55, 66));
const cs = zip(as, bs);
active_length(cs); // returns 6
list(cs(0), cs(1), cs(2), cs(3), cs(4), cs(5));
// returns list(list(11), list(44), list(22), list(55), list(33), list(66))
Do not use the make_active_list function in your solution.
function zip(A, B) {
    return * YOUR SOLUTION *
}

*/
function zip(A, B) {
    p => p % 2 === 0
        ? A(p / 2)
        : B(math_floor(p / 2));
}

// Section E
// Question 13
/* 
In JavaScript and Source, we can represent positive integers from the interval [1, 21023], but not all
these integers can be represented precisely. Only a subset of these integers are distinguishable from
their successors, i.e. i !== i + 1 is true.
It is also a fact that if a positive power of two is distinguishable from its successor, then all smaller
positive powers of two are distinguishable from their successors.
Complete the following program to find the exponent of the largest power of two in [1, 21023] that
is distinguishable from its successor. It is also given that 20
is distinguishable from its successor,
and 21023 is not. Write your program such that it requires no more than 10 calls to the
distinguishable function. You are allowed to use the Source functions math_pow, math_floor,
and math_ceil.
function distinguishable(i) {
    return i !== i + 1;
}
function find(lo, hi) {
    if (hi - lo <= 1) {
        return lo;
    } else {
        * YOUR SOLUTION *
 }
}
find(0, 1023);
If find(0, 1023) returns k, then 2
k
is distinguishable from its successor, but 2
k+1 is not
distinguishable from its successor.
*/

function distinguishable(i) {
    return i !== i + 1;
}

function find(lo, hi) {
    if (hi - lo <= 1) {
        return lo;
    } else {
        const mid = math_floor((lo + hi)/2)
        return disposable(math_pow(2, mid))
            ? find(mid, hi)
            : find(lo, mid);
    }
}


// Section F
// Question 14
// E

// Question 15
// B

// Question 16
// C

// Section G
// Question 17
/* 
Complete the function smallest that takes as argument a non-null SToN, and returns the smallest
number element in the SToN. Your solution must make good use of the sorted property of the SToN
to efficiently find the required element.
For efficiency reasons, your solution should not use the Source function is_list, and instead it
may use either the is_pair or is_number function.
function smallest(ston) {
    return is_pair(head(ston)) * YOUR SOLUTION *
}
smallest(my_ston); // returns 1
*/

function smallest(ston) {
    return is_pair(head(ston))
        ? smallest(head(ston))
        : head(ston);
}

// Question 18
/* 
Complete the function largest that takes as argument a non-null SToN, and returns the largest
number element in the SToN. Your solution must make good use of the sorted property of the SToN
to efficiently find the required element.
For efficiency reasons, your solution should not use the Source function is_list, and instead it
may use either the is_pair or is_number function.
function largest(ston) {
    return !is_null(tail(ston)) * YOUR SOLUTION *
}
largest(my_ston); // returns 15
*/

function largest(ston) {
    return !is_null(tail(ston))
        ? largest(tail(ston))
        : is_pair(ston)
        ? largest(head(ston))
        : head(ston);
}

// Question 19
/*
Complete the function find that takes as arguments a SToN and a number x, and returns true if x
is one of the elements in the SToN, otherwise it returns false. Your solution must make good use
of the sorted property and the tree structure of the SToN to efficiently compute the result.
Your solution must make use of the smallest function and/or largest function from the
preceding questions.
For efficiency reasons, your solution should not use the Source function is_list, and instead it
may use either the is_pair or is_number function.
function find(ston, x) {
    if (is_null(ston)) {
        return false;
    } else if (is_null(tail(ston))) {
        return is_pair(head(ston)) ? find(head(ston), x) : x === head(ston);
    } else {
 * YOUR SOLUTION *
    }
}
find(my_ston, 12); // returns true
find(my_ston, 3.5); // returns false
*/


function find(ston, x) {
    if (is_null(ston)) {
        return false;
    } else if (is_null(tail(ston))) {
        return is_pair(head(ston)) ? find(head(ston), x) : x === head(ston);
    } else {
        return x >= smallest(tail(item))
            ? find(tail(ston), x)
            : is_pair(head(ston)) ? find(head(ston), x) : x === head(ston);
    }
}