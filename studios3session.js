import {heart, square, blank, show, beside, stack, circle, ribbon
    , stack_frac} from "rune";

function moony_1(bottom_right) {
    return stack(beside(circle, blank),
        beside(square, bottom_right));
}

// show(moony_1(ribbon));

function moony_2(n) {
    return n === 1
        ? circle
        : moony_1(moony_2(n - 1));
}

// show(moony_2(5));

function moony_3(n){
    return n === 1 
           ? circle 
           : beside_frac(1/n, stack_frac(1 / n,circle, square),
           stack_frac(1/n,blank, moony_3(n-1))); 
}


/*
function moony(n){
    return  n === 1
            ? circle
            : beside_frac(1/n,stack_frac(1/n,circle,square),stack_frac(1/n,blank,moony(n-1)));
}
*/

//recur to iter, use xtra parameter to store the data


//1. recursive as there is deferred operations.its linear in both space and time
function fast_expt(b, n) {
    return n % 2 === 0 
        ? fast_expt(b ** 2, n / 2) 
        : fast_expt(b , n - 1);
}


function fast_expt(n) {
    return n === 1
        ? math_pow(3, 1)
        : n % 2 === 0
        ? math_pow(fast_expt(n / 2), 2)
        : 3 * fast_expt(n - 1);
}

