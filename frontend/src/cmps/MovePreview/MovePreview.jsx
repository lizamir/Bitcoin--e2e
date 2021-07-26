

import './MovePreview.scss'

export const MovePreview = ({ move }) => {

    return (

        <li className="clean-list moves-preview">
            <p>At : {new Date(move.at).toLocaleString()} </p>
            <p>Amount: {move.amount} coins</p> <hr/>
        </li>

    )
}

