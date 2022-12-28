import { useCallback, useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { Popover } from '@headlessui/react'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import { Tool as ToolType, User } from '@prisma/client'
import { getSession, signOut } from 'next-auth/react'
import Head from 'next/head'

import Tool from '../components/tool'

import prisma from '../utils/prisma'
import AddTool from '../components/add_tool'
import { trpc } from '../utils/trpc'

type props = {
	user: User & {
		tools: ToolType[]
	}
}

export default function Home({ user }: props) {
	const get_tools_mutation = trpc.get_tools.useMutation()

	const [tools, set_tools] = useState(user ? user.tools : [])
	const [filtered_tools, set_filtered_tools] = useState(tools)
	const [tags_only, set_tags_only] = useState(false)
	const [filter, set_filter] = useState('')

	useEffect(() => {
		if (!filter) {
			set_filtered_tools(tools)
			return
		}

		if (tags_only) {
			set_filtered_tools(
				tools.filter(
					(tool) =>
						tool.tags.filter((tag) => tag.includes(filter)).length >
						0
				)
			)
			return
		}

		set_filtered_tools(
			tools.filter((tool) => {
				let contains = false

				const check_key = (key: string) => {
					if (key.includes(filter)) {
						contains = true
					}
				}

				check_key(tool.title)
				check_key(tool.description)
				check_key(tool.link)
				tool.tags.forEach(check_key)

				return contains
			})
		)
	}, [filter, tags_only, tools])

	const query_tools_callback = async () =>
		set_tools(await get_tools_mutation.mutateAsync({ user_id: user.id }))

	return (
		<>
			<Head>
				<title>VUTTR</title>
				<meta
					name="description"
					content="VUTTR or Very useful tools to remember, is a website with the intent to remember useful tools."
				/>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="grid place-items-center py-12 bg-zinc-100">
				<header className="grid gap-4 text-left w-[90vw] md:w-[80vw] lg:w-[60vw]">
					<div className="flex justify-between items-center">
						<div>
							<h1 className="text-6xl">VUTTR</h1>
							<h2 className="text-2xl">
								Very Useful Tools to Remember
							</h2>
						</div>
						<button
							className="text-blue-500 hover:underline transition-all"
							onClick={() => signOut()}
						>
							logoff
						</button>
					</div>
					<div className="flex justify-between items-center my-4">
						<div className="flex items-center">
							<label
								htmlFor="search"
								className="flex items-center border-[3px] border-zinc-900 px-2 rounded-sm mr-4 cursor-text text-lg"
							>
								<MagnifyingGlassIcon className="text-zinc-900 stroke-2 stroke-zinc-900 w-4 h-4 mr-2" />
								<input
									type="text"
									placeholder="search"
									id="search"
									className="focus:outline-none"
									value={filter}
									onChange={(e) => set_filter(e.target.value)}
								/>
							</label>
							<input
								type="checkbox"
								name="tags_only"
								id="tags_only"
								className="mr-2"
								onClick={() => set_tags_only(!tags_only)}
							/>
							<label htmlFor="tags_oly">
								search in tags only
							</label>
						</div>
						<Popover>
							<Popover.Button className="flex bg-zinc-100 border-2 border-zinc-900 py-1 px-6 btn-shadow">
								<PlusIcon className="text-zinc-900 stroke-2 stroke-zinc-900 w-6 h-6" />
								Add
							</Popover.Button>
							{user && (
								<AddTool
									user_id={user.id}
									query_tools_callback={query_tools_callback}
								/>
							)}
						</Popover>
					</div>
				</header>
				<div className="flex flex-col gap-4">
					{filtered_tools.map((tool, index) => (
						<Tool
							key={index}
							{...tool}
							query_tools_callback={query_tools_callback}
						/>
					))}
				</div>
			</main>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getSession(context)

	if (!session || !session.user?.email)
		return {
			redirect: { destination: '/login', permanent: false },
		}

	const user = await prisma.user.findUnique({
		where: {
			email: session.user.email,
		},
		include: {
			tools: true,
		},
	})

	if (!user)
		return {
			redirect: { destination: '/login', permanent: false },
		}

	return {
		props: {
			user,
		},
	}
}
