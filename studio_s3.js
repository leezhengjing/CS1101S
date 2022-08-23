// import {beside, stack, circle, square, blank, show, ribbon} from "rune";

// function mooney_1(bottom_right) {
//     return beside(stack(circle, square), stack(blank, bottom_right));
// }

// show(mooney_1(ribbon));

// function mooney_2(n) {
//     return n === 1
//         ? circle
//         : mooney_1(mooney_2(n - 1));
// }

// show(mooney_2(5));

function moony_iter(counter, n, result) {
    const frac = 1 / (counter + 1);
    return counter === n
        ? result
        : moony_iter(counter + 1,
                     n,
                     beside_frac(frac,
                                 stack_frac(frac, circle, square),
                                 stack_frac(frac, blank, result)));
}


function moony(n) {
    return moony_iter(1, n, circle);
}

show(moony(5));

