
import { Component } from 'react'
import { connect } from 'react-redux';
import { bitcoinService } from '../../services/bitcoinService'
import { setUser } from '../../store/actions/userActions';

import './BitconApp.scss'


class _BitconApp extends Component {

    state = {
        rate: null,
    }

    async componentDidMount() {
        console.log(this.props);
        await this.props.setUser();
        this.bitcoinRate();
    }

    bitcoinRate = async () => {
        const rate = await bitcoinService.getRate(this.props.user.coins)
        console.log(rate, 'bitcon');
        this.setState({ rate })
    }

    // async loadUser() {
    //     const user = await userService.getUserById('u101')
    //     // const bitcon = await bitcoinService.getRate(user.coins)
    //     this.setState({ user, bitcon })
    // }
    // onBack = () => {
    //     this.props.history.goBack()
    //     // this.props.history.push('/')
    // }

    render() {
        const { user } = this.props;
        if (!user) return <div>Loading user.....</div>
        return (
            <div className="flex align-center justify-center bitcon-app">
                <div className="flex column details-user">
                    <img className="img" src={`https://i.pravatar.cc/150?u=${user._id}`} alt="" />
                </div>
                <div className="flex align-center justify-center column coins">
                    <h1>Hello <span>{user.name}</span></h1>
                    <p><img src={require('../../assets/icons/coins.png').default} alt="" />  Coins : {user.coins} </p>
                    <p><img alt='' src={require('../../assets/icons/bitcoin.png').default} /> BTC : {this.state.rate} </p>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    user: state.userReducer.user
})

const mapDispatchToProps = {
    setUser
}

export const BitconApp = connect(mapStateToProps, mapDispatchToProps)(_BitconApp)
