// Reflection R8
function make_withdraw(balance, password) {
    let wrong_tries = 0;
    
    function withdraw(amount, pw) {
        if (wrong_tries >= 3) {
            return "Account disabled";
        } else if (pw !== password) {
            return "Wrong password; no withdraw";
        } else {
            wrong_tries = 0;
            
            if (balance >= amount) {
                balance = balance - amount;
                return balance;
            } else {
                return "Insufficient funds";
            }
        }
    }
    return withdraw;
}

const W1 = make_withdraw()

// Q 2

let commission = 25; // my commission in dollars
// return a calculator for total price
// total price = (commission + cost) * (1 + tax_rate)
function make_price_calculator(tax_rate) {
    function calculator(cost) {
        return (commission + cost) * (1 + tax_rate);
    }
    return calculator;
}
const calc = make_price_calculator(0.07);
commission = 125;
calc(75);