// dom access constants
const passwordEl = document.getElementById("output-pass");
const pwLengthEl = document.getElementById("pw-length");
const generateBtnEl = document.getElementById("pw-btn");
const copyBtnEl = document.getElementById("copy-btn")
const incNumsEl = document.getElementById("inc-nums");
const incSymsEl = document.getElementById("inc-syms");
const incLowerEl = document.getElementById("inc-lower");
const incUpperEl = document.getElementById("inc-upper");
const symbols = "!@#$%^&*()";

//Copy Password
copyBtnEl.addEventListener('click', () => {
    passwordEl.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');
});


// functions to get numbers, symbols, lower and uppercase letters
function getNum() {
    //from ascii chart
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getLow() {
    //from ascii chart
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getUp() {
    //from ascii chart
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getSym() {
    //from symbols function
    return symbols[Math.floor(Math.random() * symbols.length)];
}

//Sets the options to be checked to key value pairs
const getRandom = {
    numbers: getNum,
    lower: getLow,
    upper: getUp,
    symbols: getSym
}

//Arrow function to check which values user has decided to include and generates password-end fucntion?
generateBtnEl.addEventListener('click', () => {
    const incNums = incNumsEl.checked;
    const incSyms = incSymsEl.checked;
    const incLower = incLowerEl.checked;
    const incUpper = incUpperEl.checked;
    const length = +pwLengthEl.value;

    passwordEl.value = generatePassword(incNums, incSyms, incLower, incUpper, length);
});


function generatePassword(numbers, symbols, lower, upper, length) {
    let password = '';

    //Checks and sees what the user has checked on UI
    const checkedCount = numbers + lower + upper + symbols;
    const checkedArr = [ {upper}, {lower}, {numbers}, {symbols} ]
    .filter(item => Object.values(item)[0]);

    //Checks and sees if the user didn't check anything at all
    if(checkedCount == 0) {
        return'';
    }

    for(let i=0; i<length; i += checkedCount) {
        checkedArr.forEach(type => {
            const checkedName = Object.keys(type)[0];
            password += getRandom[checkedName]();
        })
    }

    //Because depending on selection the password would be 4 or more regardless
    const endUserPassword = password.slice(0,length);
    return endUserPassword;
}


