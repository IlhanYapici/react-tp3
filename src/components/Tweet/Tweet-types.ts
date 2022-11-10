export interface ITweet {
	id: string
	author: string
	content: string
	tags: string[]
}

export interface ITweetProps {
	tweet: ITweet
	setEditedTweet: React.Dispatch<React.SetStateAction<ITweet | null>>
}
