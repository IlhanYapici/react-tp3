import { ITweet } from "../../components/Tweet/Tweet-types"

export interface IEditTweetProps {
	onClose: () => void
	setEditedTweet: React.Dispatch<React.SetStateAction<ITweet | null>>
	tweet: ITweet
}
