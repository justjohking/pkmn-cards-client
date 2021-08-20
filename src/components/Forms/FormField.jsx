import React from 'react'

const FormField = (props) => {
    return (
        <div className="FormField">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
        </div>
    )
}

export default FormField
