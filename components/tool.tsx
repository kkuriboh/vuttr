import { XMarkIcon } from '@heroicons/react/24/solid'
import { Tool } from '@prisma/client'
import { Dialog } from '@headlessui/react'

import { trpc } from '../utils/trpc'
import { useState } from 'react'
import Button from './button'

type props = Tool & {
	query_tools_callback: () => Promise<void>
}

const Tool: React.FC<props> = ({
	title,
	link,
	description,
	tags,
	id,
	query_tools_callback,
}) => {
	const [dialog_open, set_dialog_open] = useState(false)
	const remove_tool_mutation = trpc.remove_tool.useMutation()

	const remove = async () => {
		await remove_tool_mutation.mutateAsync({
			tool_id: id,
		})
		await query_tools_callback()
	}

	return (
		<>
			<Dialog open={dialog_open} onClose={() => set_dialog_open(false)}>
				<div className="flex absolute top-0 left-0 h-full w-full justify-center items-center bg-opacity-60 bg-zinc-900">
					<Dialog.Panel className="bg-zinc-100 p-8 grid gap-4 border-2 border-zinc-900 w-[40vw]">
						<Dialog.Title className="flex items-center gap-4 text-2xl">
							<XMarkIcon className="text-zinc-900 w-5 h-5 stroke-zinc-900 stroke-[4]" />
							Remove Tool
						</Dialog.Title>
						<p>
							Are you sure you want to remove{' '}
							<strong>{title}</strong>?
						</p>
						<div className="flex gap-2 ml-auto">
							<Button onClick={() => set_dialog_open(false)}>
								Cancel
							</Button>
							<Button
								onClick={async () => {
									await remove()
									set_dialog_open(false)
								}}
							>
								Yes, remove
							</Button>
						</div>
					</Dialog.Panel>
				</div>
			</Dialog>
			<div className="flex flex-col gap-2 border-[3px] rounded border-zinc-900 p-4 w-[90vw] md:w-[80vw] lg:w-[60vw]">
				<header className="flex items-center justify-between">
					<h3>
						<a
							target="_blank"
							href={link}
							className="text-blue-500 underline text-2xl"
						>
							{title}
						</a>
					</h3>
					<button
						className="text-lg flex items-center"
						onClick={() => set_dialog_open(true)}
					>
						<XMarkIcon className="text-zinc-900 w-5 h-5 stroke-zinc-900 stroke-[4]" />
						remove
					</button>
				</header>
				<p>{description}</p>
				{tags.length !== 0 && (
					<footer className="flex gap-2 flex-wrap">
						{tags.map((tag, index) => (
							<span
								key={index * 13}
								className="font-bold"
							>{` #${tag} `}</span>
						))}
					</footer>
				)}
			</div>
		</>
	)
}

export default Tool
