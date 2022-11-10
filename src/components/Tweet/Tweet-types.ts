export interface ITweet {
	id: string
	author: string
	authorId: string
	content: string
	tags: string[]
}

export interface ITweetProps {
	tweet: ITweet
}
