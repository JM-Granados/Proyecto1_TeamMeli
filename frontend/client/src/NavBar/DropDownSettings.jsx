import React from "react"
import './DropDownSettings.css'

const DropDownSettings = () => {
    return (
        <div className='flex flex-col dropDownSettings'>
            <ul className='flex flex-col gap-4'>
                <li>My datasets</li>
                <li>My votes</li>
                <li>Dataset notifications</li>
            </ul>
        </div>
    )
}

export default DropDownSettings;