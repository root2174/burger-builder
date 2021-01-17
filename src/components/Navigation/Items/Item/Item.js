import React from 'react'
import {NavList, Link} from '../../../UI/Navigation/Items/Item/Item'

const Item = (props) => {
    return (
        <div>
            <NavList>
                <Link 
                    to={props.link}
                    exact={props.exact}
                >
                        
                        {props.children}
                </Link>
            </NavList>
        </div>
    )
}

export default Item
