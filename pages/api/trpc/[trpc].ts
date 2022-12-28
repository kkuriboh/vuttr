import { createNextApiHandler } from '@trpc/server/adapters/next'
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

import prisma from '../../../utils/prisma'

const t = initTRPC.create()

const app_router = t.router({
	get_tools: t.procedure
		.input(z.object({ user_id: z.string().cuid() }))
		.mutation(
			async ({ input }) =>
				await prisma.tool.findMany({
					where: {
						userId: input.user_id,
					},
				})
		),
	remove_tool: t.procedure
		.input(z.object({ tool_id: z.number() }))
		.mutation(async ({ input }) => {
			const res = await prisma.tool.delete({
				where: {
					id: input.tool_id,
				},
			})
			if (res) {
				return { code: 202 }
			}
			return { code: 500 }
		}),
	add_tool: t.procedure
		.input(
			z.object({
				title: z.string(),
				description: z.string(),
				link: z.string(),
				tags: z.string().array(),
				user_id: z.string().cuid(),
			})
		)
		.mutation(
			async ({ input: { title, description, link, tags, user_id } }) => {
				const res = await prisma.tool.create({
					data: {
						title,
						description,
						link,
						tags,
						userId: user_id,
					},
				})
				if (res) {
					return { code: 201 }
				}
				return { code: 500 }
			}
		),
})

export type AppRouter = typeof app_router

export default createNextApiHandler({
	router: app_router,
	createContext: () => ({}),
})
