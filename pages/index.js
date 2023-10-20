import Head from 'next/head'
import { useEffect, useState } from 'react'
import {db} from '../utils/firebase'
import { doc, getDoc, collection, getDocs, query, where, orderBy, limit } from "firebase/firestore"
import StoryBlock from '../components/StoryBlock'
import PolaroidBlock from '../components/PolaroidBlock'
import Footer from '../components/Footer'

const returnStoryText = (contentRaw) => {
	let parser = new DOMParser();
    const documentToFilter = parser.parseFromString(contentRaw, 'text/html')
    let texts = documentToFilter.getElementsByTagName('p')
	let finalText = texts[0].textContent

	return finalText
}

export default function Home() {
	const [width, setWidth] = useState(0)
	const [storiesRecommended, updateStoriesRecommended] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			// Reference
			const storiesRef = collection(db, "stories")

			// Recommendations
			const recentStoriesQuery = query(storiesRef, orderBy("timestamp", "desc"), limit(9))
			let storiesRecommendedArray = []
			let storiesRecommendedIDsArray = []

			const recentStoriesQuerySnapshot = await getDocs(recentStoriesQuery)

			recentStoriesQuerySnapshot.forEach((doc) => {
				if(!storiesRecommendedIDsArray.includes(doc.id)){
					storiesRecommendedArray.push({id: doc.id, data: doc.data()})
					storiesRecommendedIDsArray.push(doc.id)
				}
			})

			updateStoriesRecommended(storiesRecommendedArray)
		}

		setWidth(document.documentElement.clientWidth)
		fetchData()
	}, [])

	return (
		<div className='min-h-screen bg-pine-road overflow-x-hidden overflow-y-hidden bg-cover md:bg-cover bg-center scroll-smooth'>
			<Head>
        		<title>The Nomad</title>
				<meta name="description" content="To travel is to know the world, to change is to truly know yourself." />
        		<meta charSet='UTF-8'/>
				<meta name = "author" content='Matheus Silva'/>
				
				<meta name = "og:title" content='The nomad'/>
				<meta name = "og:image" content = "https://i.imgur.com/n9j8hh5.png"/>
				<meta name = "og:description" content = "To travel is to know the world, to change is to truly know yourself."/>
				<meta name = "og:image:width" content = "400"/>
				<meta name = "og:image:heigth" content = "400"/>
				<meta name = "og:image:alt" content = "Text Nomad with arrows both sides"/>
				
				<link rel="icon" href="/favicon.ico" />
				<script src="https://kit.fontawesome.com/ea4f34c943.js" crossOrigin="anonymous"></script>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet" />
				<link href="https://fonts.googleapis.com/css2?family=Mynerve&display=swap" rel="stylesheet" />

				<script data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="thenomad" data-description="Support me on Buy me a coffee!" data-message="" data-color="#A38568" data-position="Right" data-x_margin="18" data-y_margin="18"></script>
				<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3359298419174075" crossorigin="anonymous"></script>
      		</Head>

			<div className='text-center text-secondary pt-12' id="intro">
				<img src="/The Nomad Official Logo Dark.png"  className='mx-auto w-64 pr-1 max-w-full' alt = "Nomad Official Logo" />
				<p className='font-sketch text-2xl text-black'>To travel is to know the world.<br/>To change is to truly know yourself.</p>

				<div className='mt-32 sm:mt-44 transition ease-in-out delay-100 hover:translate-y-2 duration-100'>
					<a href="#new" className='text-black'>
						<p className='font-sketch text-xl mx-32 sm:mx-auto'>Scroll down</p>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 mx-auto">
							<path fillRule="evenodd" d="M20.03 4.72a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 11.69l6.97-6.97a.75.75 0 011.06 0zm0 6a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06L12 17.69l6.97-6.97a.75.75 0 011.06 0z" clipRule="evenodd" />
						</svg>
					</a>
				</div>
			</div>

			<div className='flex flex-col items-center md:flex-row mt-36 pb-20' id="new">
				<article className='prose prose-xl mx-auto font-writer mb-8 text-secondary'>
					<h1 className='text-center md:text-left text-black md:text-white'>New story!</h1>
					<p className='text-center md:text-left text-black md:text-white'>A new story just popped out:</p>
				</article>
				<div className='mx-auto'>
					{
						storiesRecommended.length > 0 ?
							<StoryBlock imgRight title={storiesRecommended[0].data.title} desc={`${returnStoryText(storiesRecommended[0].data.content).slice(0, 101)}${returnStoryText(storiesRecommended[0].data.content).length > 100 ? '...' : ''}`} img={storiesRecommended[0].data.image} url={`/${storiesRecommended[0].id}`} timestampRaw={storiesRecommended[0].data.timestamp.toDate()} />
						:
							<></>
					}
				</div>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-4 gap-10 pb-5 mx-auto' id="stories">
					{
						storiesRecommended.length > 0 ? 
							storiesRecommended.map((story) => {
								return storiesRecommended.indexOf(story) != 0 ? <PolaroidBlock link rotate={Math.random() > 0.5 ? Math.floor(Math.random()*5)+2 : -Math.abs(Math.floor(Math.random()*5)+2)} url={`/${story.id}`} img={story.data.image} caption={story.data.title} timestampRaw={story.data.timestamp.toDate()} /> : <></>
							})
						:
							<></>
					}
					<a href="/stories" className='flex mx-auto text-black md:pl-12 md:mx-1 gap-2 font-sketch self-center text-2xl md:text-white transition ease-in-out delay-100 hover:translate-x-2 duration-100'>
						<p>More stories</p>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-1">
							<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
						</svg>
					</a>
			</div>

			<div className='bg-secondary pb-12' id="about-me">
				<article className='mx-auto text-center prose prose-lg font-writer text-primary p-12 mt-12'>
					<h1>About me</h1>
				</article>
				<div className='grid md:grid-cols-2'>
					<div className="md:justify-self-end md:mr-12 mx-auto">
						<PolaroidBlock rotate={5} img="https://avatars.githubusercontent.com/u/54675543?v=4" caption="Matheus Silva, 18" />
					</div>
					<article className='prose prose-lg font-primary font-writer text-center md:text-left mx-5 md:justify-self-start md:mr-60'>
						<p className="font-sketch mt-5 text-2xl font-bold text-primary">Hi! :)</p>
						<p className='text-xl text-primary font-writer'>Aspiring writer, web developer, one of the biggest, if not the biggest, indie-folk fan in history (I still have to decide which of my 47 playlists is the best), and maybe in the near future, a nomad. This is me, I mean... summarized in a few words here and there, but yes, this is me, and here I share my ideas, my projects, my things, my world. Welcome to Nomad, I try to write regularly, but that can depend a lot on whether I still have tea at home, by the way... I'll check that now, I'll be back soon, enjoy the blog!</p>
					</article>
				</div>
			</div>

			<Footer />
		</div>
  	)
}
