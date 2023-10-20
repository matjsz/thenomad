import Head from 'next/head'
import { useEffect, useState } from 'react'
import { db, auth } from '../utils/firebase'
import { doc, getDoc, collection, getDocs, query, where, orderBy, limit, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore"
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateCurrentUser, signOut } from "firebase/auth"
import { useRouter } from 'next/router'
import PolaroidBlock from '../components/PolaroidBlock'
import Footer from '../components/Footer'
import HeartInteraction from '../components/HeartInteraction'
import BuyMeACoffe from '../components/BuyMeACoffee'

const provider = new GoogleAuthProvider()

const setupStoryHTML = (string) => {
	try{
		document.getElementById('storyContainer').insertAdjacentHTML('afterbegin', string)
	} catch(e) {}
}

const shareSomeLove = async (alreadyShared, storyID, userID, heartInteractionCallback, heartCount) => {
	const storyRef = doc(db, "stories", storyID)

	if(alreadyShared){
		heartInteractionCallback(heartCount-1)
		await updateDoc(storyRef, {
			hearts: arrayRemove(userID)
		})
	} else{	
		heartInteractionCallback(heartCount+1)
		await updateDoc(storyRef, {
			hearts: arrayUnion(userID)
		})
	}
}

const categories = {
	'general': 'General',
	'coding': 'Coding'
}

const categoriesBgColor = {
	'general': 'bg-green-300',
	'coding': 'bg-purple-300'
}

const categoriesTextColor = {
	'general': 'text-green-800',
	'coding': 'text-purple-800'
}

export default function Post() {
	const router = useRouter()
	const { storyid } = router.query

	const [isLoading, updateLoadingState] = useState(true)
	const [initialUI, updateInitialUI] = useState([0, 1, 2])
	const [userID, changeUserID] = useState('')
	const [userData, changeUserData] = useState({})
	const [cooldown, updateCooldown] = useState(0)
	const [cooldownActive, updateCooldownState] = useState(false)
	const [storyLoaded, updateStoryLoaded] = useState(false)
	const [storiesRecommended, updateStoriesRecommended] = useState([])
	const [storyTitle, updateStoryTitle] = useState('')
	const [storyHearts, updateStoryHearts] = useState(0)
	const [storyContent, updateStoryContent] = useState('')
	const [storyCategory, updateStoryCategory] = useState('')
	const [storyAuthor, updateStoryAuthor] = useState('')
	const [storyAuthorAvatar, updateStoryAuthorAvatar] = useState('')
	const [storyTimestamp, updateStoryTimestamp] = useState('')
	const [alreadyLoved, updateLoveState] = useState(false)
	const [storyExists, updateStoryExists] = useState(true)

	const toggleHeartInteraction = () => {
		if(!cooldownActive){
			if(!alreadyLoved){
				shareSomeLove(false, storyid, userID, updateStoryHearts, storyHearts)
				updateLoveState(true)
				updateCooldown(8)
				updateCooldownState(true)
			} else{
				shareSomeLove(true, storyid, userID, updateStoryHearts, storyHearts)
				updateLoveState(false)
			}
		} else{
			alert("Hey, stop spamming!")
		}
	}

	const signInWithGoogleCallback = async () => {
		const result = await signInWithPopup(auth, provider)
		const credential = GoogleAuthProvider.credentialFromResult(result)
		const token = credential.accessToken
		const user = result.user

		changeUserID(user.uid)
		changeUserData(user)
	}

	const signOutFromAccount = async () => {
		const result = await signOut(auth)
		
		changeUserID("")
		changeUserData({})
	}

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				changeUserID(user.uid)
				changeUserData(user)
			}
		});

		if(cooldownActive){
			setTimeout(() => {
				if(cooldown > 0){
					updateCooldown(cooldown-1)
				} else{
					updateCooldownState(false)
				}
			}, 1000)
		}

		if(storyid != undefined || storyid != null){
			if(!storyLoaded){
				const fetchData = async () => {
					try{
						// Database References
						const storyRef = doc(db, "stories", storyid)
						const storiesRef = collection(db, "stories")

						// Story Data
						const storySnap = await getDoc(storyRef)

						const storyData = storySnap.data()
						const timestampRaw = storyData.timestamp.toDate()
						const timestamp = `${timestampRaw.toLocaleDateString()} at ${timestampRaw.toLocaleTimeString().slice(0, 5).charAt(4) == ":" ? timestampRaw.toLocaleTimeString().slice(0, 4) : timestampRaw.toLocaleTimeString().slice(0, 5)} ${timestampRaw.toLocaleTimeString().slice(8).length == 2 ? timestampRaw.toLocaleTimeString().slice(8) : timestampRaw.toLocaleTimeString().slice(9)}`

						updateStoryTitle(storyData.title)
						updateStoryHearts(storyData.hearts.length)
						updateStoryContent(storyData.content)
						updateStoryCategory(storyData.category)
						updateStoryAuthor(storyData.author)
						updateStoryAuthorAvatar(storyData.authorAvatar)
						updateStoryTimestamp(timestamp)

						if(storyData.hearts.includes(userID)){
							updateLoveState(true)
						}

						// Recommendations
						const categoriesQuery = query(storiesRef, where("category", "==", storyCategory))
						const recentStoriesQuery = query(storiesRef, orderBy("timestamp", "desc"), limit(10))
						let storiesRecommendedArray = []
						let storiesRecommendedIDsArray = []

						const categoriesQuerySnapshot = await getDocs(categoriesQuery)
						const recentStoriesQuerySnapshot = await getDocs(recentStoriesQuery)

						categoriesQuerySnapshot.forEach((doc) => {
							if(doc.id != storySnap.id){
								storiesRecommendedArray.push({id: doc.id, data: doc.data()})
								storiesRecommendedIDsArray.push(doc.id)
							}
						})
						recentStoriesQuerySnapshot.forEach((doc) => {
							if(doc.id != storySnap.id){
								if(!storiesRecommendedIDsArray.includes(doc.id)){
									storiesRecommendedArray.push({id: doc.id, data: doc.data()})
									storiesRecommendedIDsArray.push(doc.id)
								}
							}
						})

						console.log(storiesRecommendedArray)

						updateStoriesRecommended(storiesRecommendedArray.slice(0, 3))

						setupStoryHTML(storyContent)

						try {
							const authorTab = `
							<div class="grid grid-cols-2">
								<div class="flex items-center space-x-4">
									<img class="w-10 h-10 rounded-full" src="${storyAuthorAvatar}" alt="">
									<div class="text-sm md:text-md font-medium font-writer">
										<div>${storyAuthor}</div>
										<div class="text-sm font-bold font-sketch text-gray-700">The nomad</div>
									</div>
								</div>
								<div class="flex items-center justify-self-end md:mr-3 space-x-4">
									<div><span class="${categoriesBgColor[storyCategory]} ${categoriesTextColor[storyCategory]} text-xs font-medium mr-2 px-2.5 py-0.5 rounded font-sketch font-bold">${categories[storyCategory]}</span></div>
									<div class="text-sm md:text-md font-medium font-writer">
										<div>${storyTimestamp}</div>
									</div>
								</div>
							</div>
							`

							const documentToFilter = document.getElementById('storyContainer')
							let titles = documentToFilter.getElementsByTagName('h1')
							let images = documentToFilter.getElementsByTagName('img')
							titles[0].style.textAlign = "center"
							titles[0].style.marginBottom = '0px'
							images[0].style.marginTop = '0px'
							titles[0].insertAdjacentHTML('afterend', authorTab)
						} catch (error) {
						}

						updateStoryLoaded(true)
						updateLoadingState(false)
					} catch(e) {
						updateStoryTitle('Not Found')
						updateStoryExists(false)
					}
				}

				fetchData()
			}
		}
	})

	return (
		<>
			<div>
				<Head>
					<title>The Nomad | {storyTitle}</title>
					<meta name="description" content="To travel is to know the world, to change is to truly know yourself." />
					<link rel="icon" href="/favicon.ico" />
					<script src="https://kit.fontawesome.com/ea4f34c943.js" crossorigin="anonymous"></script>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
					<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
					<link href="https://fonts.googleapis.com/css2?family=Mynerve&display=swap" rel="stylesheet" />

					<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="thenomad" data-description="Support me on Buy me a coffee!" data-message="" data-color="#A38568" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
					<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3359298419174075" crossorigin="anonymous"></script>
				</Head>

				{
					storyExists ?
						<div className='bg-pine-road bg-cover bg-center min-h-screen overflow-x-hidden'>
							<a href="/">
								<img src="/The Nomad Official Logo Dark.png" className='w-36 mx-auto'></img>
							</a>

							<div className="bg-white text-primary px-5 py-3 max-w-[45rem] mx-auto rounded-t-lg mt-5">
								<article className='prose prose-xl font-writer mx-auto pt-5' id="storyContainer">
									{!storyLoaded ? 
										<div>
											<div role="status" className="max-w-full animate-pulse">
											<div class="h-12 bg-gray-200 rounded-sm max-w mb-2.5"></div>
											</div>

											<div role="status" class="space-y-8 my-5 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
												<div class="flex items-center justify-center w-full h-96 bg-gray-300 rounded">
													<svg class="w-full h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
												</div>
											</div>

											<div role="status" class="max-w-full animate-pulse">
												<div class="h-2.5 bg-gray-200 rounded-full mb-4"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w"></div>
												<div class="h-2.5 bg-gray-200 rounded-full mb-4"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
												<div class="h-2.5 bg-gray-200 rounded-full mb-4"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w"></div>
												<div class="h-2.5 bg-gray-200 rounded-full mb-4"></div>
												<div class="h-2 bg-gray-200 rounded-full max-w mb-2.5"></div>
												<div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
												<span class="sr-only">Loading...</span>
											</div>
										</div>
										:
										<></>	
									}
								</article>
								
								<hr className="mt-5" />

								{
									storyLoaded ?
										<>
										
										<div className='flex items-center mt-10 mb-3 justify-center align-center'>
											
										</div>

										<div className='text-center'>
											{
												userID == "" ? 
												<>
													<p className='font-sketch text-2xl mb-2'>Sign In to share some love!</p>
													<button onClick={signInWithGoogleCallback} type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 mb-2">
														<svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
														Sign in with Google
													</button>
												</>
												:
												<div>
													<div className="mb-5">
														<img className='rounded-full mx-auto' src={userData.photoURL}></img>
														<p className='font-bold mt-2 text-xl font-sketch'>{userData.displayName}</p>
														<p className=''>Not you? <button onClick={signOutFromAccount} className='underline'>Log out</button></p>
													</div>
													<p className='font-sketch text-2xl'>Share some love!</p>
												</div>
											}

										</div>
										<div className='flex items-center justify-center align-center mb-5'>
											<button disabled={userID == "" ? true : false} onClick={toggleHeartInteraction} type="button" className={`text-${userID == "" ? "gray" : "red"}-500 bg-transparent font-medium text-lg pl-2.5 pb-2.5 pr-1 text-center inline-flex items-center`}>
												<HeartInteraction active={alreadyLoved} />
												<span class="sr-only">Like this story</span>
											</button>
											<p className='pb-2.5 text-2xl'>{storyHearts}</p>
										</div>
										
										<div className="text-center mb-5">
											<p className="font-sketch text-2xl mb-2">Or you could also...</p>
											<a className='flex items-center justify-center align-center' href="https://www.buymeacoffee.com/thenomad"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=thenomad&button_colour=2e261b&font_colour=ffffff&font_family=Bree&outline_colour=ffffff&coffee_colour=A38568" /></a>
										</div>
										</>
									:
										<></>
								}
							</div>
							<div className="text-primary bg-white font-writer px-5 py-3 max-w-[45rem] mb-5 mx-auto rounded-b-lg mt-2">
								{
									storyLoaded ? 
										<p className='text-2xl font-sketch text-center py-2'>More stories</p>
									:
										<div class="h-2.5 bg-gray-200 rounded-full mx-auto mt-4 w-32 mb-4"></div>
								}
								<div className="flex gap-3 p-3 overflow-x-scroll md:overflow-x-hidden">
									{
										storiesRecommended.length > 0 ? 
											storiesRecommended.map((story) => {
												return <PolaroidBlock link rotate={0} url={`/${story.id}`} img={story.data.image} caption={story.data.title} timestampRaw={story.data.timestamp.toDate()} />
											})
										:
											initialUI.map((n) => {
												return <div role="status" class="animate-pulse polaroid-big">
															<div class="flex items-center justify-center h-32 mb-4 bg-gray-300">
																<svg class="w-12 h-12 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
															</div>
															<div class="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
															<span class="sr-only">Loading...</span>
														</div>
											})
									}
								</div>
							</div>

							<Footer />
						</div>
					:
						<div className='bg-pine-road bg-cover min-h-screen overflow-x-hidden'>
							<a href="/">
								<img src="/The Nomad Official Logo Dark.png" className='w-36 mx-auto'></img>
							</a>
			
							<div className="paper-card mx-[24rem] my-5">
								<div className='p-8'>
								<div class="p-4 mb-2 text-sm text-yellow-800 mb-8 rounded-lg bg-yellow-200" role="alert">
									<span class="font-medium">Oops!</span> It seems that this story hasn't been told yet. 🤔
								</div>
								</div>
							</div>
						</div>
				}
			</div>
		</>
  	)
}
