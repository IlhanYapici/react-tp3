import {
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	Button,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	Textarea,
	useToast
} from "@chakra-ui/react"
import { useRef } from "react"
import { v4 as uuid } from "uuid"

export function CreateTweet({ onClose }: { onClose: () => void }) {
	const authorRef = useRef<HTMLInputElement>(null)
	const contentRef = useRef<HTMLTextAreaElement>(null)
	const tagsRef = useRef<HTMLInputElement>(null)

	const toast = useToast()

	const createTweet = async (
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

			await fetch("http://localhost:5000/tweets", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(tweet)
			}).then(() => {
				onClose()
				toast({
					description: "Your tweet has been created",
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
				<DrawerHeader>Créer un Tweet</DrawerHeader>

				<DrawerBody>
					<FormControl id="author" mt="1rem" isRequired>
						<FormLabel>Utilisateur</FormLabel>
						<Input type="text" ref={authorRef} />
					</FormControl>

					<FormControl id="content" mt="1rem" isRequired>
						<FormLabel>Contenu</FormLabel>
						<Textarea ref={contentRef} />
					</FormControl>

					<FormControl id="tags" mt="1rem">
						<FormLabel>Tags</FormLabel>
						<Input
							type="text"
							ref={tagsRef}
							placeholder="Ex: meme, discord, games"
						/>
						<FormHelperText>Séparez les tags par des virgules.</FormHelperText>
					</FormControl>
				</DrawerBody>

				<DrawerFooter>
					<Button colorScheme="blue" mr={4} onClick={createTweet}>
						Envoyer
					</Button>
					<Button variant="outline" mr="auto" onClick={onClose}>
						Annuler
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</>
	)
}
