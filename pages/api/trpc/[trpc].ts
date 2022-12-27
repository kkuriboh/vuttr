import { createNextApiHandler } from '@trpc/server/adapters/next'
import { initTRPC } from '@trpc/server'
import { z } from 'zod'

const t = initTRPC.create()

type AddPostReturn = { error?: string; status: number }

const app_router = t.router({
	get_tools: t.procedure.query(() => {}),
	add_tool: t.procedure.input(z.object({})).mutation(() => {}),
})

export type AppRouter = typeof app_router

export default createNextApiHandler({
	router: app_router,
	createContext: () => ({}),
})
