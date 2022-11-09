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

// Task 4A
function list_to_tsil(xs) {
    return is_null(xs)
        ? null
        : pair(list_to_tsil(tail(xs)), head(xs));
}

// Task 5A

// function sum_of_list(xs) {
//     if (is_null(xs)) {
//         return 0;
//     } else {
//         return head(xs) + sum_of_list(tail(xs));
//     }
// }

function sum_of_list(xs) {
    function helper(xs, accum) {
        return is_null(xs)
            ? accum
            : helper(tail(xs), head(xs) + accum);
    }
    return helper(xs, 0);
}

// Task 5c
function multi_map(f, xxs) {
    if (is_null(head(xxs))) {
        return null;
    } else {
        return pair(f(map(head,xxs)), multi_map(f, map(tail, xxs)));
    }
}

// Task 6A Sudoku
function make_coordinates(row, column) {
    return pair(row, column);
}

function get_x(coordinates) {
    return head(coordinates);
}

function get_y(coordinates) {
    return tail(coordinates);
}

// Task 6B
function access(coordinates_list, grid) {
    return list_ref(list_ref(grid, get_x(coordinates_list)), get_y(coordinates_list));
}

// Task 6C
// Theta(n)

// Task 6D
function all_different(xs) {
    return is_null(xs)
        ? true
        : is_null(member(head(xs), tail(xs))) && all_different(tail(xs));
}

all_different(list(1, 1, 2, 3));

// Task 6E
// Theta(n^2)

// Task 6F
function make_row_coordinates_list(row) {
    return map(x=> pair(row, x), enum_list(0, 8));
    // returrn build_list(9, col => make_coordinates(row, col));
    
}
// display_list(make_row_coordinates_list(4));

// Task 6G
function test_coordinates_list(grid, coordinates_list) {
    const grid_values_list = map(x => access(x, grid) ,coordinates_list);
    return all_different(grid_values_list);
}

// task 6H
function make_sudoku_coordinates_list_list() {
}
function test_sudoku(grid) {
    const checklist = make_sudoku_coordinates_list_list();
    return accumulate(
                (coordinates_list, sofar) =>
                    sofar &&
                    test_coordinates_list(grid, coordinates_list),
                true,
                checklist);
    
}

// Task 6I
// This question does not make sense. All Sudoku grids have the same size. 
// There is no parameter that grows and thus there is no order of growth.