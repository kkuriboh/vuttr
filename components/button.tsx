import { ButtonHTMLAttributes } from 'react'

const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
	children,
	...props
}) => (
	<button
		{...props}
		className={`px-2 border-2 border-zinc-900 btn-shadow ${props.className}`}
	>
		{children}
	</button>
)

export default Button
