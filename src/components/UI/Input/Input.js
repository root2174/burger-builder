import React from 'react';
import styled, { css } from 'styled-components';

const InputDiv = styled.div`
	width: 100%;
	padding: 10px;
	box-sizing: border-box;
`;
const InputElement = styled.input`
	outline: none;
	border: 1px solid #ccc;
	background-color: white;
	font: inherit;
	padding: 15px 10px;
	box-sizing: border-box;
	width: 60%;

	&:focus {
		outline: none;
		background-color: #ccc;
	}
	${(props) =>
		props.invalid &&
		props.touched &&
		css`
			border: 1px solid red;
			background-color: salmon;
		`}
`;
const Label = styled.label`
	font-weight: bold;
	display: block;
	margin-bottom: 8px;
`;

const Input = (props) => {
	let inputElement = null;
	switch (props.elementType) {
		case 'input':
			inputElement = (
				<InputElement
					{...props.elementConfig}
					value={props.value}
					onChange={props.onChange}
					invalid={props.invalid}
					touched={props.touched}
				/>
			);
			break;
		case 'textarea':
			inputElement = (
				<InputElement
					as="textarea"
					{...props.elementConfig}
					value={props.value}
					onChange={props.onChange}
					invalid={props.invalid}
					touched={props.touched}
				/>
			);
			break;
		case 'select':
			inputElement = (
				<InputElement
					InputElement
					as="select"
					value={props.value}
					onChange={props.onChange}
				>
					{props.elementConfig.options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</InputElement>
			);

			break;
		default:
			inputElement = (
				<InputElement {...props.elementConfig} value={props.value} />
			);
	}

	return (
		<InputDiv>
			<Label>{props.label}</Label>
			{inputElement}
		</InputDiv>
	);
};

export default Input;
