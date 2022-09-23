function repeat(v, k) {
    return k === 0
        ? null
        : pair(v, repeat(v, k - 1));
}

function expand_list(L, k) {
    return accumulate((x,y) => append(repeat(x, k), y), null, L);
}

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

const as = list(8, 3, 5, 7);
// 
// expand_list( map(r => expand_list(r, k), M), k );