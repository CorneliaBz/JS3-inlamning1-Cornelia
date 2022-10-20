import React from "react";

export default class Deposit extends React.Component{
    inputDepositAmount = 0;
    totalDeposit = 0;

    getDepositAmount = (e) => {
        this.inputDepositAmount = parseInt(e.target.value);
    }

    onSubmitHanlder = (e) => {
        e.preventDefault();
        this.totalDeposit = this.totalDeposit + this.inputDepositAmount;
        this.props.getTotalDeposit(this.totalDeposit);
    }

    render() {
        return(
            <form onSubmit={this.onSubmitHanlder}>
                <label for="deposit">Income</label>
                <input placeholder="Set your budget" type="number" name="Income" onChange={this.getDepositAmount}></input>
                <input type="submit" value="DEPOSIT" className="btnDeposit"></input>
            </form>
        )
    }
}
