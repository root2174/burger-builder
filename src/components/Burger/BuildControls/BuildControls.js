import React from 'react'
import BuildControls from '../../styled/styled-build-controls'
import BuildControl from './BuildControl/BuildControl'
import Button from '../../UI/Button/Button'

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' }
]

const buildControls = (props) => {
	return (
		<BuildControls>
			<p>
				Current Price: <strong>${props.price.toFixed(2)}</strong>
			</p>
			{controls.map((ctrl) => (
				<BuildControl
					key={ctrl.label}
					label={ctrl.label}
					addIngredient={() => props.addIngredient(ctrl.type)}
					removeIngredient={() => props.removeIngredient(ctrl.type)}
					disabled={props.disabled[ctrl.type]}
				/>
			))}
			<Button
				order={true}
				disabled={!props.purchasable}
				onClick={props.ordered}
			>
				{props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
			</Button>
		</BuildControls>
	)
}

export default buildControls
