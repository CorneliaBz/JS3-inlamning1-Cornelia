import React from "react";
import Deposit from "./components/deposit/Deposit";
import Withdraw from "./components/withdraw/withdraw";

export default class App extends React.Component {

  //Funktion som hämtar total Deposit och lägger till userinput
  getTotalDeposit = (totalDeposit) => {

    if (localStorage.getItem("totalDeposit")) {
      localStorage.setItem("totalDeposit", parseInt(localStorage.getItem("totalDeposit")) + totalDeposit)
    } else {
      localStorage.setItem("totalDeposit", totalDeposit)
    }
    //Updaterar Balance
    this.updateBalance(totalDeposit)
  }

  //Hämta array från localStorage
  array = localStorage.getItem("itemArray") ? JSON.parse(localStorage.getItem("itemArray")) : []

  //Funktion för Withdraw
  getTotalWithdraw = (withdrawTotal, itemName) => {
    console.log(withdrawTotal, itemName);
    //Kollar om itemName redan finns
    let check = false
    this.array.forEach(element => {
      if (element.item === itemName) {
        check = true
      }

    });
    //om check är true - skicka alert annars uppdatera balance
    if (check) {
      alert('Already exsists')
    } else {
      if (localStorage.getItem("newBalance")) {
        let balance = parseInt(localStorage.getItem("newBalance"))
        //Kollar om det finns tillräckligt med pengar
        if (withdrawTotal > balance) {
          alert("not enough money")
          return;
        }
      }
      //Withdraw total
      if (localStorage.getItem("withdrawTotal")) {
        localStorage.setItem("withdrawTotal", parseInt(localStorage.getItem("withdrawTotal")) + withdrawTotal)
      } else {
        localStorage.setItem("withdrawTotal", withdrawTotal)
      }
      //skapar obejct för produkt och amount
      const itemObject = {
        item: itemName,
        amount: withdrawTotal
      }
      //pushar objectet till array och lägger till local storage som string
      this.array.push(itemObject)
      localStorage.setItem("itemArray", JSON.stringify((this.array)))

      this.updateBalance(-withdrawTotal)
    }

  }
  //Uppdaterar Balance. Kollar om Balance finns och lägger till nytt amount till local storage
  updateBalance = (amount) => {
    if (localStorage.getItem("newBalance")) {
      localStorage.setItem("newBalance", parseInt(localStorage.getItem("newBalance")) + amount)
    } else {
      localStorage.setItem("newBalance", amount)
    }
    window.location.reload();
  }


  render() {
    const deposit = localStorage.getItem("totalDeposit") ? localStorage.getItem("totalDeposit") : 0;
    const withdraw = localStorage.getItem("withdrawTotal") ? localStorage.getItem("withdrawTotal") : 0;
    const balance = localStorage.getItem("newBalance") ? localStorage.getItem("newBalance") : 0;


    return (
      <section className="constructor">
        <div className="budgetInput">
          <h1>Budget details</h1>
          <Deposit getTotalDeposit={this.getTotalDeposit} />
          <Withdraw getTotalWithdraw={this.getTotalWithdraw} />
        </div>
        <div  className="budgetExpenses">
          <div>
            <h1>My Wallet</h1>
            <div className="myWallet">
              <p className="boldText">BUDGET:</p> <p id="pBudget">{deposit}</p>
              <p className="boldText">WITHDRAW:</p> <p id="pWithdraw">{withdraw}</p>
              <p className="boldText">BALANCE:</p> <p id="pBalance">{balance}</p>
            </div>
          </div>
          <div>
            <ul>
              <h1>Expenses Info</h1>
              <li className="liConstructor">
                <p className="boldText">NAME</p><p className="boldText">EXPENSE COST</p>
              </li>
              {this.array.map((value, index) => {
                return (
                  <li className="liConstructor" key={index}>
                    <p>{value.item}</p><p>{value.amount}</p>
                  </li>
                )
              })}
            </ul>
          </div>

        </div>

      </section>
    )
  }
}