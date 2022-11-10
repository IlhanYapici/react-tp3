import {
	FormControl,
	FormLabel,
	FormHelperText,
	Input,
	Button,
	Drawer,
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

export function CreateTweet({
	isOpen,
	onOpen,
	onClose,
	btnRef
}: {
	isOpen: boolean
	onOpen: () => void
	onClose: () => void
	btnRef: React.MutableRefObject<null>
}) {
	const authorRef = useRef<HTMLInputElement>(null)
	const titleRef = useRef<HTMLInputElement>(null)
	const contentRef = useRef<HTMLTextAreaElement>(null)
	const tagsRef = useRef<HTMLInputElement>(null)

	const toast = useToast()

	const handleSubmit = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault()

		const author = authorRef.current?.value
		const title = titleRef.current?.value
		const content = contentRef.current?.value
		const tags = tagsRef.current?.value

		if (author && title && content) {
			const tweet = {
				id: uuid(),
				author,
				authorId: uuid(),
				title,
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
		<Drawer
			isOpen={isOpen}
			onClose={onClose}
			placement="right"
			finalFocusRef={btnRef}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader>Créer un Tweet</DrawerHeader>

				<DrawerBody>
					<FormControl id="author" isRequired>
						<FormLabel>Utilisateur</FormLabel>
						<Input type="text" ref={authorRef} />
					</FormControl>

					<FormControl id="title" isRequired>
						<FormLabel>Titre</FormLabel>
						<Input type="text" ref={titleRef} />
					</FormControl>

					<FormControl id="content" isRequired>
						<FormLabel>Contenu</FormLabel>
						<Textarea ref={contentRef} />
					</FormControl>

					<FormControl id="tags">
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
					<Button variant="outline" mr={3} onClick={onClose}>
						Annuler
					</Button>
					<Button colorScheme="blue" onClick={handleSubmit}>
						Envoyer
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)
}
