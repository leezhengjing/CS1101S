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
