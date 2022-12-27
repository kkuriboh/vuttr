import { XMarkIcon } from '@heroicons/react/24/solid'

import { tool } from '../types/tool'

type props = tool & {}

const Tool: React.FC<props> = ({ title, link, description, tags }) => {
	return (
		<div className="flex flex-col gap-2 border-[3px] rounded border-zinc-900 p-4 w-[90vw] md:w-[80vw] lg:w-[60vw]">
			<header className="flex items-center justify-between">
				<h3>
					<a href={link} className="text-blue-500 underline text-2xl">
						{title}
					</a>
				</h3>
				<button className="text-lg flex items-center">
					<XMarkIcon className="text-zinc-900 w-5 h-5 stroke-zinc-900 stroke-[4]" />
					remove
				</button>
			</header>
			<p>{description}</p>
			{tags.length !== 0 && (
				<footer className="flex gap-2 flex-wrap">
					{tags.map((tag) => (
						<span className="font-bold">{` #${tag} `}</span>
					))}
				</footer>
			)}
		</div>
	)
}

export default Tool
