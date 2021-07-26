
import { Link } from 'react-router-dom'
import './ContactPreview.scss'

export function ContactPreview({ contact, onSelectContact }) {

  return (
    <Link to={'/contact/' + contact._id}>
      <div className="flex align-center space-between main-layout contact-preview">
        <img src={`https://i.pravatar.cc/150?u=${contact._id}`} alt="" />
        {/* <img src={`https://robohash.org/set_set4/${contact.name}?size=200x200`} alt="" /> */}
        <p>{contact.name}</p>
      </div>
    </Link>
  )

}
