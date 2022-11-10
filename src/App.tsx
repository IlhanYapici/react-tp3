import { Box, Button, Container, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState, useRef } from "react"

import { ITweet } from "./components/Tweet/Tweet-types"
import { Tweet } from "./components/Tweet/Tweet"

import "./App.css"
import { CreateTweet } from "./views/CreateTweet/CreateTweet"

function App() {
	const [tweets, setTweets] = useState<ITweet[]>([])
	const btnRef = useRef(null)
	const { isOpen, onOpen, onClose } = useDisclosure()

	useEffect(() => {
		const fetchTweets = async () => {
			const response = await fetch("http://localhost:5000/tweets")
			const data = await response.json()
			setTweets(data)
		}

		fetchTweets()
	}, [isOpen])

	return (
		<div className="App">
			<Box width="100%" backgroundColor="gray.50" padding="0.5rem 0">
				<Box
					display="flex"
					gap="0.5rem"
					flexDir="column"
					alignItems="center"
					margin="0 auto"
					width="fit-content"
				>
					<Text
						color="black"
						margin={0}
						fontSize="2rem"
						fontWeight="bold"
						textColor="#1a8cd8"
					>
						Twitter
					</Text>
					<Text color="black" margin={0} fontSize="1rem">
						(Wish Edition)
					</Text>
				</Box>
			</Box>

			<Container mt="2rem" display="grid" gridAutoRows="1fr" gap="1.5rem">
				{tweets.map((tweet) => (
					<Tweet tweet={tweet} />
				))}
			</Container>

			<CreateTweet
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				btnRef={btnRef}
			/>

			<Button
				ref={btnRef}
				size="lg"
				position="absolute"
				bottom="1rem"
				left="1rem"
				colorScheme="twitter"
				onClick={onOpen}
			>
				Tweet
			</Button>
		</div>
	)
}

export default App
