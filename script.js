const mathForDay = 60 * 60 * 24 * 1000;
let clientPayCheck = [];
let actualDate = Date();

function register() {
    let payCheck = {
        name: document.getElementById('personName').value,
        date: document.getElementById('possibleDate').value,
        purchase: document.getElementById('possibleValue').value
    }
    if (payCheck.name == "" || payCheck.date == "" || payCheck.purchase == "") {
        alert("Preencha todos os campos!");
    } else {
        clientPayCheck.push(payCheck);
    }
}

function calculateInterest() {
    document.getElementById('account').innerHTML = "";
    let accountData = {
        name: "Nome",
        date: "Data de Vencimento",
        purchase: "Valor para ser pago",
    }
    showAll(accountData)

    function calculatorTaxes(obj) {

        let today = new Date(actualDate);
        let expire = new Date(obj.date)
        let dateComparison = ((today.getTime() - expire.getTime()) / (mathForDay)).toFixed(0);
        obj.purchase = parseInt(obj.purchase)
        let objMod = {
            name: obj.name,
            date: obj.date,
            purchase: obj.purchase
        }
        if (dateComparison > 0) {
            objMod.purchase += objMod.purchase * ((dateComparison * 0.001) + 0.02);
        }
        objMod.date = objMod.date.split('-').reverse().join('/');
        return objMod;
    }
    let interestRate = clientPayCheck.map(calculatorTaxes)

    function showAll(obj2) {
        let create = document.createElement('div')
        create.classList.add('register-column');
        let span1 = document.createElement('span')
        let span2 = document.createElement('span')
        let span3 = document.createElement('span')
        span1.innerHTML = obj2.name + " ";
        span2.innerHTML = obj2.date;
        span3.innerHTML = " R$" + obj2.purchase + " ";
        create.appendChild(span1);
        create.appendChild(span2);
        create.appendChild(span3);
        document.getElementById('account').appendChild(create);
    }
    interestRate.forEach(showAll)
}