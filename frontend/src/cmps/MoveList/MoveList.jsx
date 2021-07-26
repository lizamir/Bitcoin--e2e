import { MovePreview } from '../MovePreview';
import './MoveList.scss'

export const MoveList = ({ contactMoves }) => {
    return (
        <div>
            <h3>Your last moves:</h3>
            <ul>
                {contactMoves.map((move, idx) => (
                    <MovePreview move={move} key={idx} />
                ))}
            </ul>
        </div>
    )
}

