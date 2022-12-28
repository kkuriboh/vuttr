import { Popover } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/solid'
import { FormEvent, useState } from 'react'
import { trpc } from '../utils/trpc'
import Button from './button'

type props = {
	user_id: string
	query_tools_callback: () => Promise<void>
}

const AddTool: React.FC<props> = ({ user_id, query_tools_callback }) => {
	const add_tool_mutation = trpc.add_tool.useMutation()
	const [name, set_name] = useState('')
	const [link, set_link] = useState('')
	const [description, set_description] = useState('')
	const [tags, set_tags] = useState('')

	const handle_submit = async (e: FormEvent) => {
		e.preventDefault()
		const res = await add_tool_mutation.mutateAsync({
			title: name,
			link,
			description,
			tags: tags.split(' ').map((tag) => {
				if (tag.startsWith('#')) {
					return tag.slice(1)
				}
				return tag
			}),
			user_id,
		})

		if (res.code !== 201) {
			alert('Something went wrong, try again!')
		}

		await query_tools_callback()
	}

	return (
		<Popover.Panel className="grid place-items-center absolute z-10 w-screen h-full top-0 left-0 bg-opacity-60 bg-zinc-900">
			{({ close }) => (
				<div className="flex flex-col items-center justify-center p-4 w-[50vw] bg-zinc-100 border-[3px] border-zinc-900">
					<header className="flex justify-between items-center w-full">
						<h3 className="flex text-lg items-center">
							<PlusIcon className="text-zinc-900 stroke-2 stroke-zinc-900 w-6 h-6 mr-4" />
							Add new tool
						</h3>
						<button
							className="hover:underline transition-all"
							onClick={() => close()}
						>
							exit
						</button>
					</header>
					<form
						className="grid w-full p-4 gap-2"
						onSubmit={async (e) => {
							await handle_submit(e)
							close()
						}}
					>
						<label htmlFor="name">Tool Name</label>
						<input
							className="rounded border-2 border-zinc-900 px-2"
							placeholder="nodejs"
							type="text"
							id="name"
							value={name}
							onChange={(e) => set_name(e.target.value)}
						/>
						<label htmlFor="link">Tool Link</label>
						<input
							className="rounded border-2 border-zinc-900 px-2"
							placeholder="https://nodejs.org/"
							type="text"
							id="link"
							value={link}
							onChange={(e) => set_link(e.target.value)}
						/>
						<label htmlFor="description">Tool Description</label>
						<textarea
							name="description"
							id="description"
							className="rounded border-2 border-zinc-900 px-2"
							placeholder="cool description..."
							cols={30}
							rows={8}
							value={description}
							onChange={(e) => set_description(e.target.value)}
						/>
						<label htmlFor="tags">Tags</label>
						<input
							className="rounded border-2 border-zinc-900 px-2"
							type="text"
							id="tags"
							value={tags}
							onChange={(e) => set_tags(e.target.value)}
							placeholder="backend javascript websockets filesystem"
						/>
						<Button className="mt-4 ml-auto">Add tool</Button>
					</form>
				</div>
			)}
		</Popover.Panel>
	)
}

export default AddTool
