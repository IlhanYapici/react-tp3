import { Avatar, Box, IconButton, Tag, Text, Tooltip } from "@chakra-ui/react"
import { BiEditAlt as EditIcon } from "react-icons/bi"

import { ITweetProps } from "./Tweet-types"

export function Tweet({ tweet, setEditedTweet }: ITweetProps) {
	const { id, author, content, tags } = tweet

	return (
		<Box
			key={id}
			mt="1rem"
			display="flex"
			position="relative"
			flexDirection="column"
			justifyContent="space-between"
			backgroundColor="gray.50"
			textColor="black"
			minW="300px"
			w="90%"
			p="1rem"
			justifySelf="center"
		>
			<Box display="flex" flexDir="row" gap="0.4rem" alignItems="center">
				<Avatar name={author} />
				<Text fontWeight="bold" fontSize="1.2rem" w="fit-content">
					@{author}
				</Text>
				<Tooltip label="Éditer" placement="top">
					<IconButton
						w="fit-content"
						ml="auto"
						size="sm"
						aria-label="edit tweet"
						icon={<EditIcon />}
						variant="solid"
						onClick={() => setEditedTweet(tweet)}
					/>
				</Tooltip>
			</Box>

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
