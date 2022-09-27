// Midterms AY1718
// Q4 Improving Selection Sort

function find_min(xs) {
    function helper(ys, smallest_so_far, acc) {
        return (is_null(ys))
            ? pair (smallest_so_far, acc)
            : (smallest_so_far > head ( ys ))
                ? helper(tail(ys), head(ys), pair(smallest_so_far, acc))
                : helper(tail(ys), smallest_so_far ,pair(head(ys), acc));
    }
    return helper(tail(xs), head(xs), null);
}

// Q5 Improving Merge Sort

function take_drop(xs , n) {
    function helper(ys, k ,acc) {
        return (k === 0)
            ? pair(acc , ys)
            : helper(tail(ys), k - 1, pair(head(ys), acc));
    }
    return helper(xs, n, null);
}


// Q6

function solvable(xs, n) {
    function get_index(xs, k) {
        function helper(ys, counter) {
            return k === head(ys)
                ? counter
                : helper(tail(ys), counter + 1);
        }
        return helper(xs, 0);
    }
    function drop(xs, k) {
        return k === 0
            ? xs
            : drop(tail(xs), k - 1);
    }
    function helper(ys, k, counter) {
        return is_null(tail(ys))
            ? counter
            : k <= (length(ys) - 1)
                ? helper(drop(ys, k), head(drop(ys, k)), counter + 1)
                : helper(drop(xs, get_index(xs, k) - k),
                         head(drop(xs, get_index(xs, k) - k)),
                         counter + 1);
    }
    return n === helper(xs, head(xs), 0);
}

solvable(list(6, 1, 3, 5, 2, 2, 4, 3), 4);