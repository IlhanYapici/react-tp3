import { AiFillDelete as DeleteIcon } from "react-icons/ai"
import { v4 as uuid } from "uuid"
import { useRef } from "react"
import {
	Box,
	Button,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	IconButton,
	Input,
	FormControl,
	FormLabel,
	FormHelperText,
	Textarea,
	Tooltip,
	useToast
} from "@chakra-ui/react"

import { IEditTweetProps } from "./EditTweet-types"

export function EditTweet({ onClose, setEditedTweet, tweet }: IEditTweetProps) {
	const { id, author, content, tags } = tweet

	const authorRef = useRef<HTMLInputElement>(null)
	const contentRef = useRef<HTMLTextAreaElement>(null)
	const tagsRef = useRef<HTMLInputElement>(null)

	const toast = useToast()

	const deleteTweet = async () => {
		await fetch(`http://localhost:5000/tweets/${id}`, {
			method: "DELETE"
		})

		toast({
			description: "Your tweet has been deleted",
			status: "error",
			duration: 2000,
			isClosable: true
		})

		resetTweet()
	}

	const resetTweet = () => {
		setEditedTweet(null)
		onClose()
	}

	const editTweet = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()

		const author = authorRef.current?.value
		const content = contentRef.current?.value
		const tags = tagsRef.current?.value

		if (author && content) {
			const tweet = {
				id: uuid(),
				author,
				content,
				tags: tags ? tags?.replace(/\s/g, "").split(",") : []
			}

			await fetch(`http://localhost:5000/tweets/${id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(tweet)
			}).then(() => {
				resetTweet()
				toast({
					description: "Your tweet has been edited",
					status: "success",
					duration: 2000,
					isClosable: true
				})
			})
		}
	}

	return (
		<>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader>Éditer un Tweet</DrawerHeader>

				<DrawerBody>
					<FormControl id="author" mt="1rem" isRequired>
						<FormLabel>Utilisateur</FormLabel>
						<Input type="text" defaultValue={author} ref={authorRef} />
					</FormControl>

					<FormControl id="content" mt="1rem" isRequired>
						<FormLabel>Contenu</FormLabel>
						<Textarea defaultValue={content} ref={contentRef} />
					</FormControl>

					<FormControl id="tags" mt="1rem">
						<FormLabel>Tags</FormLabel>
						<Input
							type="text"
							defaultValue={tags.join(", ")}
							ref={tagsRef}
							placeholder="Ex: meme, discord, games"
						/>
						<FormHelperText>Séparez les tags par des virgules.</FormHelperText>
					</FormControl>
				</DrawerBody>

				<DrawerFooter display="flex">
					<Button colorScheme="blue" onClick={editTweet}>
						Sauvegarder
					</Button>
					<Tooltip label="Supprimer le Tweet">
						<IconButton
							aria-label="delete tweet"
							icon={<DeleteIcon />}
							colorScheme="red"
							variant="solid"
							onClick={deleteTweet}
							ml={4}
						/>
					</Tooltip>
					<Button variant="outline" ml="auto" onClick={resetTweet}>
						Annuler
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</>
	)
}
