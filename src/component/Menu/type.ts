export interface MenuProps {
    x: number
    y: number
    visible: boolean
    onClose: () => void
    onSelect: (action: string) => void
}
