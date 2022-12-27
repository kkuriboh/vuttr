import { GetStaticProps } from 'next'
import Head from 'next/head'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'

import Tool from '../components/tool'

import { tool } from '../types/tool'
import prisma from '../utils/prisma'

type props = {
	tools: tool[]
}

export default function Home({ tools }: props) {
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
					<h1 className="text-6xl">VUTTR</h1>
					<h2 className="text-2xl">Very Useful Tools to Remember</h2>
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
								/>
							</label>
							<input
								type="checkbox"
								name="tags_only"
								id="tags_only"
								className="mr-2"
							/>
							<label htmlFor="tags_oly">
								search in tags only
							</label>
						</div>
						<button className="flex bg-zinc-100 border-2 border-zinc-900 py-1 px-6 btn-shadow">
							<PlusIcon className="text-zinc-900 stroke-2 stroke-zinc-900 w-6 h-6" />
							Add
						</button>
					</div>
				</header>
				<div className="flex flex-col gap-4">
					{tools.map((tool) => (
						<Tool {...tool} />
					))}
				</div>
			</main>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => ({
	// props: {
	// 	tools: await prisma.tool.findMany(),
	// },
	props: {
		tools: [
			{
				id: 1,
				title: 'Notion',
				link: 'https://notion.so',
				description:
					'All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ',
				tags: [
					'organization',
					'planning',
					'collaboration',
					'writing',
					'calendar',
				],
			},
			{
				id: 2,
				title: 'json-server',
				link: 'https://github.com/typicode/json-server',
				description:
					'Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.',
				tags: ['api', 'json', 'schema', 'node', 'github', 'rest'],
			},
			{
				id: 3,
				title: 'fastify',
				link: 'https://www.fastify.io/',
				description:
					'Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.',
				tags: [
					'web',
					'framework',
					'node',
					'http2',
					'https',
					'localhost',
				],
			},
			{
				title: 'test-tool',
				description: 'test-tool description wow',
				tags: ['test', 'tool', 'wow', 'such'],
				id: 5,
			},
		],
	},
})
