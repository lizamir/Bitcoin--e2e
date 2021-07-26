
import { Component } from 'react'
import { Link } from 'react-router-dom'
import { TransferFund } from '../../cmps/TransferFund/'
import { connect } from 'react-redux'
import { setUser, addMove } from '../../store/actions/userActions';
import { getContactById, removeContact } from '../../store/actions/contactActions';
import { MoveList } from '../../cmps/MoveList/MoveList';
import './ContactDetails.scss'

class _ContactDetails extends Component {

  state = {
    amount: 0,
    contactMoves: null,
  }

  async componentDidMount() {
    await this.props.getContactById(this.props.match.params.id)

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.moves?.length !== this.props.user.moves?.length) {
      this.contactMoves();
    }

  }


  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    // this.setState((prevState) => ({ amount: { ...prevState.amount, [field]: value } }))
    this.setState((prevState) => ({ amount: value }))
  }

  onDeleteContact = async () => {
    await this.props.removeContact(this.props.contact._id)
    this.props.history.push('/contact');
  };

  onTransferCoins = async (ev) => {
    ev.preventDefault();
    this.props.addMove(this.props.contact, this.state.amount, this.props.user._id);
    // console.log(this.props);
  };

  contactMoves = () => {
    const { user, contact } = this.props;
    //  console.log(user.moves);
    const contactMoves = user.moves.filter((move) => move.toId === contact._id);
    this.setState({ contactMoves });
  }

  render() {
    const { contact } = this.props
    console.log(this.state.contactMoves);
    if (!contact) return <div>Loading Contact.....</div>
    return (
      <div className="flex column align-center justify-center main-layout contact-details">

        <img className="img-user" src={`https://i.pravatar.cc/150?u=${contact._id}`} alt="" />
        <p>Name: {contact.name}</p>
        <p>Phone: {contact.phone}</p>
        <p>E-mail: {contact.email}</p>

        <TransferFund contactName={contact.name} handleChange={this.handleChange} onTransferCoins={this.onTransferCoins} />
        {this.state.contactMoves && this.state.contactMoves.length > 0 && <MoveList contactMoves={this.state.contactMoves} />}

        <div className="flex space-between  menu-icoins">
          <Link to={'/contact/'}> <img src={require('../../assets/icons/back.svg').default} title="back" alt="Back" className="icon" /></Link>
          <button onClick={() => this.onDeleteContact()}><img src={require('../../assets/icons/delete.svg').default} title="delete-user" alt="delete" className="delete" /></button>
          <Link to={'/contact/edit/' + contact._id}><img src={require('../../assets/icons/edit.svg').default} title="edit-user" alt="edit" className="icon edit" /></Link>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  contact: state.contactReducer.currContact,
})

const mapDispatchToProps = {
  setUser,
  addMove,
  getContactById,
  removeContact
}

export const ContactDetails = connect(mapStateToProps, mapDispatchToProps)(_ContactDetails)
