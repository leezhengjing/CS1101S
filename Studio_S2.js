function biggie_function(combo) {
    return combo <= 4 ? combo + 4 : combo;
}

function unbiggie_function(combo) {
    return combo >= 5 ? combo - 4 : combo;
}

function is_biggie_size(combo) {
    return combo > 4;
}

function combo_price(combo) {
    return is_biggie_size(combo) ? unbiggie_function(combo) * 1.17  + 0.50:  combo * 1.17;
}

function empty_order() {
    return 0;
}

function add_to_order(order, combo) {
    return order * 10 + combo;
}

function last_order(order) {
    return order % 10;
}

function other_combos(order) {
    return (order - last_order(order)) / 10;
}

combo_price(8);