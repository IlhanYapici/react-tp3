export interface IDrawerProps {
	children: React.ReactNode
	isOpen: boolean
	onClose: () => void
	position?: "left" | "right"
	onCloseFocusRef?: React.RefObject<HTMLElement>
}
