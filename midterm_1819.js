// Midterm AY1819
// Question 3: Lets be Logical
// Q3A
function hoo(f, g, h, x) {
    return f(x) 
        ? 100
        : g(x) 
            ? (h(x) ? 100 : 50) 
            : 50;
}
// Q3B
/* (i) Iterative process.
(ii) There is no deferred operation in the evaluation, therefore it is an iterative process.
gee(4)
 false || gee(3)
 gee(3)
 false || gee(2)
 gee(2)
 false || gee(1)
 gee(1)
 false || gee(0)
 gee(0)
 true
*/

// Question 4: Recursive vs Iterative Processes
// Q4A : Recursive Version
function get_sublist(start, end, L) {
    function helper(pos, ys) {
        if (pos < start) {
            return helper(pos + 1, tail(ys));
        } else if (pos <= end) {
            return pair(head(ys), helper(pos + 1, tail(ys)));
        } else { return null; }
    }
    return helper(0, L);
}

// Q4B : Iterative Version
function get_sublist_1(start, end, L) {
    function helper(pos, ys, result) {
        // SOLUTION 1:
        if (pos < start) {
            return helper(pos + 1, tail(ys), result);
        } else if (pos <= end) {
            return helper(pos + 1, tail(ys), pair(head(ys), result));
        } else {
            return reverse(result);
        }
    return helper(0, L, null);
}

function get_sublist_2(start, end, L) {
    function helper(pos, ys, result) {
        // SOLUTION 2:
        return pos < start
            ? helper(pos + 1, tail(ys), result)
            : pos <= end
                ? helper(pos + 1, tail(ys), pair(head(ys), result))
                : reverse(result);
    }
    return helper(0, L, null);
}

// Question 5: The Benefits of Being Sorted
// Q5A

function is_subset(S, T) {
    if (is_null(S)) {
        return true;
    } else if (is_null(T)) {
        return false;
    } else if (head(S) < head(T)) {
        return false;
    } else if (head(S) === head(T)) {
        return is_subset(tail(S), tail(T));
    } else {
        return is_subset(S, tail(T));
    }
}

// Q5B

function super_merge(L) {
    // SOLUTION 1:
    return accumulate(merge, null, L);
}
// SOLUTION 2:
//  return accumulate((x, ys) => merge(x, ys), null, L);

// Question 6: Active Lists
// Q6A
function make_active_list(L) {
    const len = length(L);
    return pos => (pos < 0 || pos >= len)
        ? null
        : list(list_ref(L, pos));
}

// Q6B
function map_active_list(op, act_list) {
    // SOLUTION 1:
    function new_act_list(pos) {
        const x = act_list(pos);
        return is_null(x) ? x : list(op(head(x)));
    }
    return new_act_list;
    // SOLUTION 2:
    //  return pos => map(op, act_list(pos));
}

// Question 7: Binary Search Trees
/* 
Complete the function negate_bst that takes in a BST of numbers and returns a new BST of
numbers that has all the numbers from the input BST negated. The “shape” of the result BST must
be a left-right reflection of that of the input BST. For example:
const B = make_binary_tree_node(
    make_binary_tree_node(make_empty_binary_tree(),-3,make_empty_binary_tree()),
    2,
    make_binary_tree_node(make_empty_binary_tree(),5, make_empty_binary_tree()));
negate_bst(B);
/* returns the same tree as:
make_binary_tree_node(
    make_binary_tree_node(make_empty_binary_tree(), -5, make_empty_binary_tree()),
    -2,
    make_binary_tree_node(make_empty_binary_tree(), 3, make_empty_binary_tree()));
*/



// Q7A
function negate_bst_1(bst) {
    // SOLUTION 1:
    if (is_empty_binary_tree(bst)) {
        return make_empty_binary_tree();
    } else {
        return make_binary_tree_node(negate_bst(right_subtree_of(bst)),
                                     -1 * value_of(bst),
                                     negate_bst(left_subtree_of(bst)));
    }
}

function negate_bst_2(bst) {
    // SOLUTION 2:
    return is_empty_binary_tree(bst)
        ? make_empty_binary_tree()
        : make_binary_tree_node(negate_bst(right_subtree_of(bst)),
                                -1 * value_of(bst),
                                negate_bst(left_subtree_of(bst)));
}

// Q7B
/* 
Complete the function accumulate_bst that behaves like accumulate but can only work on BST.
Note that the order of application of the input operation op must start from the largest value in the
BST, in descending order, to the smallest value. For example, if the input BST B has the values 1, 2,
3, 4, 5, 6 and 7, then, regardless of the “shape” of the BST B, the call
accumulate_bst(pair, null, B) should return list(1,2,3,4,5,6,7), and the call
accumulate_bst((x, y) => x + y, 0, B) should return 28.
*/
function accumulate_bst(op, initial, bst) {
    // SOLUTION 1:
    if (is_empty_binary_tree(bst)) {
        return initial;
    } else {
        const s = accumulate_bst(op, initial, right_subtree_of(bst));
        const t = op(value_of(bst), s);
        return accumulate_bst(op, t, left_subtree_of(bst));
    }
}
function accumulate_bst_2(op, initial, bst) {
    // SOLUTION 2:
    function listify_bst(b) {
        if (is_empty_binary_tree(b)) {
            return null;
        } else {
            const left_list = listify_bst(left_subtree_of(b));
            const value = value_of(b);
            const right_list = listify_bst(right_subtree_of(b));
            return append(left_list, pair(value, right_list));
        }
    }
    return accumulate(op, initial, listify_bst(bst));
}


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
/*
Complete the function permutations that takes as argument a list of distinct numbers and returns
a list of all permutations of the input numbers. Each permutation is a list of numbers. The
permutations in the result list can be in any order. For example:
permutations(list(1, 2, 3));
// Example result: list(list(1,2,3), list(2,1,3), list(2,3,1),
// list(1,3,2), list(3,1,2), list(3,2,1)).
To get full marks for this part, your function must make use of the insertions function from Part
A in a correct and meaningful way
*/
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


permutations_1(list(1, 2, 3));
