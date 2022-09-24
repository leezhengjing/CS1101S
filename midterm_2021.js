const result_1 = accumulate((x, y) => list(x, y),
 null,
 enum_list(1, 10));

display(result_1);

const result_2 = accumulate((x, y) => pair(x, list(y)),
 null,
 enum_list(1, 10));

display(result_2);

function apply(p, t) {
    return 
}

const t1 = 8;
apply(null, t1); // returns 8
const t2 = pair(pair(1, 2), pair(3, pair(4, 5)));
apply( list(tail, tail, head), t2 );