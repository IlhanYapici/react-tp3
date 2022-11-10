import { Box, Button, Container, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState, useRef } from "react"

import { ITweet } from "./components/Tweet/Tweet-types"
import { Tweet } from "./components/Tweet/Tweet"

import "./App.css"
import { CreateTweet } from "./views/CreateTweet/CreateTweet"
import { Drawer } from "./components/Drawer/Drawer"
import { EditTweet } from "./views/EditTweet/EditTweet"

function App() {
	const [tweets, setTweets] = useState<ITweet[]>([])
	const [editedTweet, setEditedTweet] = useState<ITweet | null>(null)
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

	useEffect(() => {
		if (editedTweet) {
			onOpen()
		}
	}, [editedTweet])

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

			<Container
				mt="2rem"
				display="grid"
				gridTemplateColumns="1fr"
				gridAutoRows="1fr"
				gap="1.5rem"
			>
				{tweets.map((tweet, i) => (
					<Tweet key={i} tweet={tweet} setEditedTweet={setEditedTweet} />
				))}
			</Container>

			<Drawer isOpen={isOpen} onClose={onClose}>
				{editedTweet !== null ? (
					<EditTweet
						onClose={onClose}
						setEditedTweet={setEditedTweet}
						tweet={editedTweet}
					/>
				) : (
					<CreateTweet onClose={onClose} />
				)}
			</Drawer>

			<Button
				ref={btnRef}
				size="lg"
				position="absolute"
				bottom="1rem"
				left="1rem"
				colorScheme="twitter"
				onClick={onOpen}
			>
				Tweeter
			</Button>
		</div>
	)
}

export default App
