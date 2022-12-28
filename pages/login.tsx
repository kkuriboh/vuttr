import { signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Login: React.FC = () => {
	const session = useSession()
	const router = useRouter()
	useEffect(() => {
		if (session.status === 'authenticated') router.push('/')
	}, [session])

	return (
		<>
			<Head>
				<title>Login</title>
				<meta name="description" content="VUTTR login page" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className="flex flex-col justify-center items-center gap-4 h-screen">
				{/* TODO: figure out why those two options don't work */}
				{/* <button
					className="border-2 border-zinc-900 rounded-sm p-2"
					onClick={() => signIn('google')}
				>
					Login With Google
				</button> */}
				{/* <button
					className="border-2 border-zinc-900 rounded-sm p-2"
					onClick={() => signIn('twitch')}
				>
					Login With Twitch
				</button> */}
				<button
					className="border-2 border-zinc-900 rounded-sm p-2"
					onClick={() => signIn('github')}
				>
					Login With GitHub
				</button>
			</main>
		</>
	)
}

export default Login
