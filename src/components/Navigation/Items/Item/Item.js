import React from 'react'
import {NavList, NavLink} from '../../../UI/Navigation/Items/Item/Item'

const Item = (props) => {
    return (
        <div>
            <NavList>
                <NavLink 
                    href={props.link} 
                    active={props.active}>
                        {props.children}
                </NavLink>
            </NavList>
        </div>
    )
}

export default Item
