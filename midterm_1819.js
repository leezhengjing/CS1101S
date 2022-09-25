// Question 8: Permutations Again!
/* 
Complete the function insertions(x, ys) that returns all possible ways to insert x into the list
ys, without changing the relative order of the elements in ys. For example:
insertions(4, list(1, 2, 3));
// returns list(list(4,1,2,3), list(1,4,2,3), list(1,2,4,3), list(1,2,3,4)).

Your function can make use of the take and drop functions (for merge sort) presented in the
lectures/reflections. 
*/

function take(xs, n) {
    return (n === 0) ? null : pair(head(xs), take(tail(xs), n - 1));
}
// drop the first n elements from the list and return the rest
function drop(xs, n) {
    return (n === 0) ? xs : drop(tail(xs), n - 1);
}

function insertions_1(x, ys) {
    // SOLUTION 1:
    return map( k => append(take(ys, k), pair(x, drop(ys, k))),
                enum_list(0, length(ys)) );
}

function insertions_2(x, ys) {
    // SOLUTION 2:
    function helper(k, result) {
        if (k < 0) {
            return result;
        } else {
            const u = append(take(ys, k), pair(x, drop(ys, k)));
            return helper(k - 1, pair(u, result));
        }
    }
    return helper(length(ys), null);
}

function insertions_3(x, ys) {
    // SOLUTION 3:
    const len = length(ys);
    function helper(k) {
        return (k > len)
        ? null
        : pair(append(take(ys, k), pair(x, drop(ys, k))),
        helper(k + 1));
    }
    return helper(0);
}

function insertions_4(x, ys) {
    // SOLUTION 4:
    return is_null(ys)
        ? list(list(x))
        : pair( pair(x, ys),
                map(i => pair(head(ys), i), insertions_4(x, tail(ys))) );
}

function insertions_mysolution(x, ys){
    // MY ATTEMPT
    function insertion_helper(counter) {
        return counter > length(ys)
            ? null
            : pair(append(take(ys, counter), pair(x, drop(ys, counter))),
                   insertion_helper(counter + 1));
    }
    return insertion_helper(0);
}

insertions_mysolution(4, list(1, 2, 3));

// Question 8B
function permutations_1(xs) {
    // SOLUTION 1:
    if (is_null(xs)) {
        return list(null);
    } else {
        const s = permutations_1(tail(xs));
        const t = map(ys => insertions_3(head(xs), ys), s);
        return accumulate(append, null, t);
    }
}

function permutations_2(xs) {
    // SOLUTION 2:
    return accumulate((x, ps) => accumulate((p, qs) => append(insertions(x, p),
                                                              qs),
                                             null,
                                             ps),
                      list(null),
                      xs);
}

function permutations_3(xs) {
    // SOLUTION 3:
    return accumulate((x, ps) => accumulate(append,
                                            null,
                                            map(p => insertions(x, p), ps)),
                      list(null),
                      xs);
}


// permutations_1(list(1, 2));
