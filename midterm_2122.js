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
    return N < 1 ? 0 : (N * N) + fun(N - 1) + fun(N - 1);
}

// Theta(2^N)

// Q6

function fun_3(N) {
    return N <= 1 ? 1: N* fun(N / 4);
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
function unique(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        return head(xs) !== head(tail(xs))
            ? pair(head(xs), unique(tail(xs)))
            : unique(tail(xs));
    }
}

display(unique(list(1, 1, 1, 2, 3, 3, 4, 4, 5, 6, 6, 6)));

// Q10 MCQ
// A
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

function remove_elem(A, pos) {
    return p => p < pos? A(p) : A(p + 1);
}

// Question 12

function zip(A, B) {
    p => p % 2 === 0
        ? A(p / 2)
        : B(math_floor(p / 2));
}

// Section E
// Question 13

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

function smallest(ston) {
    return is_pair(head(ston))
        ? smallest(head(ston))
        : head(ston);
}

// Question 18

function largest(ston) {
    return !is_null(tail(ston))
        ? largest(tail(ston))
        : is_pair(ston)
        ? largest(head(ston))
        : head(ston);
}

// Question 19

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