function last_comes_first(xs) {
    return is_null(xs) || is_null(tail(xs))
        ? xs
        : pair( head(reverse(xs)),
                reverse(tail(reverse(xs))) );
}

last_comes_first(list(2, 5, 3, 4, 5));

function last_comes_first(xs) {
    if (is_null(tail(xs))) {
        return xs;
    } else {
        const p = last_comes_first(tail(xs));
        return pair(head(p), pair(head(xs), tail(p)));
    }
}
    
last_comes_first(list(2, 5, 3, 4, 5));
make_ac
function sum(as, f) {
    return accumulate( (x, y) => f(as(x)) + y,
                      0,
                      enum_list(0, act_length(as) - 1) );
}
const twice = f => (x => f(f(x)));
const thrice = f => (x => f(f(f(x))));

 ((thrice(twice))(x => 2 * x))(1);

function mystery(f, x) {
 return x === 0
 ? f(x)
 : mystery(x => f(x + 1), x - 1);
}
mystery(x => 7 * x, 8);

list();

