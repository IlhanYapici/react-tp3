import { Drawer as ChDrawer } from "@chakra-ui/react"

import { IDrawerProps } from "./Drawer-types"

export function Drawer({
	isOpen,
	onClose,
	onCloseFocusRef,
	position = "right",
	children
}: IDrawerProps) {
	return (
		<ChDrawer
			isOpen={isOpen}
			onClose={onClose}
			finalFocusRef={onCloseFocusRef}
			closeOnOverlayClick={false}
			closeOnEsc={false}
			placement={position}
			size="sm"
		>
			{children}
		</ChDrawer>
	)
}
