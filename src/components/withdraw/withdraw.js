import React from "react";

export default class Withdraw extends React.Component {
    inputWithdrawAmount = 0;
    inputItemName = ""

    getWithdrawAmount = (e) => {
        this.inputWithdrawAmount = parseInt(e.target.value);
    }

    getWithdrawName = (e) => {
        this.inputItemName = e.target.value;
    }

    onSubmitHanlder = (e) => {
        e.preventDefault();
        this.props.getTotalWithdraw(this.inputWithdrawAmount, this.inputItemName);
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHanlder}>
                <label for="Expenses">Expenses</label>
                <input placeholder="Expense-name" type="text" name="Expenses" required onChange={this.getWithdrawName}></input>
                <input placeholder="Expense cost" type="number" name="withdraw" onChange={this.getWithdrawAmount}></input>
                <input type="submit" value="WITHDRAW" className="btnWithdrawn"></input>
            </form>
        )
    }
}