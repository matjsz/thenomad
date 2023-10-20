import Head from 'next/head'
import NomadEditor from '../components/NomadEditor'
import { db, auth } from '../utils/firebase';
import TitleBanner from '../components/TitleBanner'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';

const provider = new GoogleAuthProvider()

export default function Editor() {
	const [isLoading, updateLoadState] = useState(true)
	const [isSignedIn, updateSignedInState] = useState(false)
	const [email, updateEmail] = useState('')
	const [password, updatePassword] = useState('')
	const [rememberMe, updateRememberMe] = useState(false)
	const [gotError, updateErrorState] = useState(false) 
	const [userUID, updateUserUID] = useState("unknown")
	const [userData, changeUserData] = useState({})

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				if(user.uid == NOMAD_UID){
					updateSignedInState(true)
					updateLoadState(false)
				} else{
					updateSignedInState(false)
					updateLoadState(false)
					updateUserUID(user.uid)
				}
			} else{
				updateSignedInState(false)
				updateLoadState(false)
			}
		});
	})

	const signInWithGoogleCallback = async () => {
		const result = await signInWithPopup(auth, provider)
		const credential = GoogleAuthProvider.credentialFromResult(result)
		const token = credential.accessToken
		const user = result.user



		updateUserUID(user.uid)
		changeUserData(user)
	}
    
	return (
		<>
		{
			isLoading ?
				<></>
			:
			isSignedIn ?
			<div className='bg-pine-road bg-cover min-h-screen overflow-x-hidden'>
				<Head>
					<title>The Nomad | Editor</title>
					<meta name="description" content="To travel is to know the world, to change is to truly know yourself." />
					<link rel="icon" href="/favicon.ico" />
					<script src="https://kit.fontawesome.com/ea4f34c943.js" crossorigin="anonymous"></script>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
					<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
					<link href="https://fonts.googleapis.com/css2?family=Mynerve&display=swap" rel="stylesheet" />
				</Head>

				<a href="/">
					<img src="/The Nomad Official Logo Dark.png" className='w-36 mx-auto'></img>
				</a>

				<div className='bg-white container min-h-screen mx-auto my-8 p-6 rounded-md'>
					<NomadEditor isSignedIn={isSignedIn}></NomadEditor>
				</div>
			</div>
		:
			<div className='bg-pine-road bg-cover min-h-screen overflow-x-hidden'>
				<Head>
					<title>The Nomad | Editor</title>
					<meta name="description" content="To travel is to know the world, to change is to truly know yourself." />
					<link rel="icon" href="/favicon.ico" />
					<script src="https://kit.fontawesome.com/ea4f34c943.js" crossorigin="anonymous"></script>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
					<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
					<link href="https://fonts.googleapis.com/css2?family=Mynerve&display=swap" rel="stylesheet" />
				</Head>

				<a href="/">
					<img src="/The Nomad Official Logo Dark.png" className='w-36 mx-auto'></img>
				</a>

				<div className="paper-card mx-[1rem] md:mx-[24rem] my-5">
					<div className='p-8'>
					{
						gotError ?
							<div class="p-4 text-sm text-red-800 rounded-lg bg-red-200" role="alert">
								<span class="font-medium">Oops!</span> It seems that your credentials are incorrect.
							</div>
						:
							<></>
					}
					{
						userUID == "unknown" ?
							<>
							<p className="text-2xl text-center mb-6 font-sketch">Let's write something :)</p>
							<center>
							<button onClick={signInWithGoogleCallback} type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium sm:w-auto rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ml-2">
								<svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
								Sign in with Google
							</button>
							</center>
							</>
						:
							<>
							<div class="p-4 text-sm text-yellow-800 mb-8 rounded-lg bg-yellow-200" role="alert">
								<span class="font-medium">Oops!</span> It seems that you are not <strong>The Nomad</strong> 🤔
							</div>
							<center>
							<a href="/" class="text-white bg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Go back to the blog</a>
							</center>
							<p className="font-sketch mt-6 text-center">How did you found this, by the way?</p>
							</>
					}
					</div>
				</div>
			</div>
		}
		</>
  	)
}
