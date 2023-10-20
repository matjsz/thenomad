import Head from 'next/head'
import { useEffect, useState } from 'react'
import {db} from '../utils/firebase'
import { doc, getDoc, collection, getDocs, query, where, orderBy, limit } from "firebase/firestore"
import PolaroidBlock from '../components/PolaroidBlock'
import StoryBlock from '../components/StoryBlock'
import Footer from '../components/Footer'

export default function Posts() {
	const [width, setWidth] = useState(0)
	const [storiesRecommended, updateStoriesRecommended] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			// Reference
			const storiesRef = collection(db, "stories")

			// Recommendations
			const recentStoriesQuery = query(storiesRef, orderBy("timestamp", "desc"))
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
        		<title>The Nomad | Stories</title>
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

			{
				width > 640 ?
					<a href="/">
						<img src="/The Nomad Official Logo White.png" className='w-36 mx-auto'></img>
					</a>
				:
					<a href="/">
						<img src="/The Nomad Official Logo Dark.png" className='w-36 mx-auto'></img>
					</a>
			}

			<article className='prose prose-xl mt-8 mx-auto font-writer mb-12 text-secondary'>
				<h1 className='text-center md:text-left text-black md:text-white'>My Stories</h1>
				<p className='text-center font-sketch md:text-left text-black md:text-white'>All my thougts, my monologues, my adventures, well... my stories.</p>
			</article>

			<div className='grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 pb-5 mx-16' id="stories">
				{
					storiesRecommended.length > 0 ? 
						storiesRecommended.map((story) => {
							return <PolaroidBlock link rotate={Math.random() > 0.5 ? Math.floor(Math.random()*5)+2 : -Math.abs(Math.floor(Math.random()*5)+2)} url={`/${story.id}`} img={story.data.image} caption={story.data.title} timestampRaw={story.data.timestamp.toDate()} />
						})
					:
						<></>
				}
			</div>

			<Footer />
		</div>
  	)
}
