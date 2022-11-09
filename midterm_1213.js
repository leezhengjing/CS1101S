// Type your program in here!
// MIDTERMS1213
// TASK 1A
function conditional(a, b, c) {
    if (a) {
        return b();
    } else {
        return c();
    }
}
// TASK 1B

const True = (x, y) => x;
const False = (x, y) => y;
function conditional2(a , b , c) {
    return a(b, c);
}
conditional2(True, 1, 2);
conditional2(False, 1, 2);

// Tasl 1C
function simple_conditional(a, b, c) {
    if (a) {
        return b;
    } else {
        return c;
    }
}

// Task 1D

// The problem is that both expressions B and C get evaluated.
// ( true ) ? display (" yes ") : display (" no ")
// Here both "yes" and "no" will be displayed.


// TAsk 2
const diff = a => b => b - a;

// Task 3

function square(x) {
    return x * x;
}

function add_one(x) {
    return x + 1;
}

function compose1(f, g) {
    return x => f(g(x));
}

function compose2(f, g) {
    return f(g);
}

compose1(square, add_one)(7);

// Task 3B
compose2(square, add_one(7));