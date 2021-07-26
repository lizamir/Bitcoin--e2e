
import { Component } from 'react'
// import { Charts } from '../../cmps/Charts'
import {bitcoinService} from '../../services/bitcoinService'

import './StatisticPage.scss'

export class StatisticPage extends Component {

    state = {
        marketPrice: null,
    };

    async componentDidMount() {
        const data = await bitcoinService.getMarketPrice();
        const marketPrice = data.map((coord) => coord.y);
        const dataTransactions = require('../../data/transactions.json');
        const confirmedTransactions= dataTransactions.values.map((coord) => coord.y)
        this.setState({ marketPrice , confirmedTransactions });
    }


    render() {
        const {marketPrice , confirmedTransactions} = this.state
        return  (
            <div>
                <h1>statisic page</h1>
                {/* {marketPrice && <Charts data={marketPrice } title="Market Price" />} */}

                {/* {confirmedTransactions && <Charts data={confirmedTransactions } title="confirmed Transactions"  />} */}
            </div>
        )
    }
}
