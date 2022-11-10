import { Box, Text, Tag, Tooltip, Button } from "@chakra-ui/react"

import { ITweetProps } from "./Tweet-types"

export function Tweet({ tweet }: ITweetProps) {
	const { id, author, authorId, content, tags } = tweet

	const deleteTweet = async () => {
		await fetch(`http://localhost:5000/tweets/${id}`, {
			method: "DELETE"
		})
	}

	return (
		<Box
			key={id}
			position="relative"
			backgroundColor="gray.50"
			textColor="black"
			w="300px"
			p="1rem"
		>
			<Button
				position="absolute"
				top="0.5rem"
				right="0.5rem"
				onClick={deleteTweet}
				size="xs"
				variant="ghost"
				colorScheme="red"
			>
				Delete
			</Button>
			<Tooltip label={authorId}>
				<Text fontWeight="bold" fontSize="1.1rem">
					{author}
				</Text>
			</Tooltip>
			<Box>
				<Text>{content}</Text>
			</Box>
			<Box>
				{tags.map((tag) => (
					<Tag size="sm" key={tag}>
						{tag}
					</Tag>
				))}
			</Box>
		</Box>
	)
}
