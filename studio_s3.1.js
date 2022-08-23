import {heart, square, blank, show, beside, stack, circle, ribbon
    , stack_frac, beside_frac} from "rune";

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



// function fast_expt(n) {
    
// }