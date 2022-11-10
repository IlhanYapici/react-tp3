import { Box, Text, Tag, Tooltip, Button } from "@chakra-ui/react"

import { ITweetProps } from "./Tweet-types"

export function Tweet({ tweet }: ITweetProps) {
	const { id, author, authorId, content, tags } = tweet

	const deleteTweet = async () => {
		await fetch(`http://localhost:5000/tweets/${id}`, {
			method: "DELETE"
		})
		window.location.reload()
	}

	return (
		<Box
			key={id}
			mt="1rem"
			position="relative"
			display="flex"
			flexDirection="column"
			justifyContent="space-between"
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
				<Text fontWeight="bold" fontSize="1.1rem" w="fit-content">
					{author}
				</Text>
			</Tooltip>

			<Text mt="0.5rem" pl="0.75rem">
				{content}
			</Text>

			{tags && (
				<Box mt="1rem" display="flex" gap="0.25rem">
					{tags.map((tag) => (
						<Tag size="sm" key={tag}>
							{tag}
						</Tag>
					))}
				</Box>
			)}
		</Box>
	)
}
