import React from 'react';
import { Link } from "react-router-dom";


const OneCardMini = (props) => {
    return (
        <div className="OneCardMini" key={props.card.id}>
        <p><Link to={"/cards/" + props.card.id}>{props.card.name}</Link></p>   
        </div>
    )
}

export default OneCardMini
