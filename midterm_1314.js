// Midterms1314
// Quyestion 1: Minimalistic Equality
function equal_boolean(x, y) {
    return x
        ? y ? true : y
        : y ? x : true;
}

equal_boolean(false, false);

function to_string(x) {}
function add_ieee_754(x, y) {}
function concatenate(x, y) {}
// Question 2: Additional Overload
function plus(x, y) {
    return is_number(x) && is_number(y)
        ? add_ieee_754(x, y)
        : is_string(x) || is_string(y)
            ? concatenate(to_string(x), to_string(y))
            : "error: wrong types";
}

// Question 3 Elementary Watson

function power(b, e) {
    return math_pow(b, e);
}
function tetrate(b, n) {
    return n === 1
        ? b
        : power(b, tetrate(b, n - 1));
}

tetrate(2, 4);

// Question 4 Entangled Chains
function plus_one(x) {
    return x + 1;
}
function twice(f) {
    return x=> f(f(x));
}
function n_times(f, n) {
    return n === 1
        ? f
        : x => f(n_times(f, n - 1)(x));
}
function chain(f, n) {
    return n === 1
        ? f
        : chain(f, n - 1)(f);
}
twice(twice)(twice)(twice);
/*
A : 0
B: 1
C: 2
D: 2
E: 4
F: 4
G: 8
H: 16
I: 64
J: 16^2 = 256 
K: 2^16 = 65536

*/

// Question 5: Zipping Along
// 5A
function make_pairs(xs, ys) {
    return is_null(xs)
        ? null
        : pair(pair(head(xs), head(ys)), make_pairs(tail(xs), tail(ys)));
}

// Order of growth is theta(n)
// Recursive process.
// 5B

function zip(f, xs, ys) {
    return is_null(xs)
        ? null
        : pair(f(head(xs), head(ys)), zip(f, tail(xs), tail(ys)));
}

// Question 6 : An accumulating filter
function filter1(pred, xs) {
    return accumulate((a, accum_list) => pred(a) ? pair(a, accum_list) : accum_list,
                       null,
                       xs);
}

filter1(x => x >= 1, list(1, 2, 3));

// Create a helper function that stores the accumulated list as an argument then
// return the accumulated list when the xs is null.

// Question 7A
const make_queen = pair;
const row = head;
const column = tail;

// 7B
function attack_each_other_diagonally(q1, q2) {
    return math_abs(row(q1) - row(q2)) === math_abs(column(q1) - column(q2));
}

// 7C
function attack_any_diagonally(q1, qs) {
    return accumulate((a, accum) => attack_each_other_diagonally(q1, a) || accum,
                      false,
                      qs);
}

// 7D
function attack_diagonally(qs) {
    return is_null(qs)
        ? false
        : attack_any_diagonally(head(qs), tail(qs)) || attack_diagonally(tail(qs));
}

// Order of growth theta n^2

// 7E
function permutations(xs) {
    
}
function queens(n) {
    const permutations_list = permutations(map(x => make_queen(1, x), enum_list(1, n)));
    return permutations_list;
}


// Order of growth is q * n