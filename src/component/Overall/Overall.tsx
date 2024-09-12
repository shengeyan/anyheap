// Overall.tsx
import React, { useState } from 'react'
import styles from './index.module.scss'
import FileItem from '@/component/FileItem/FileItem'
import TextItem from '@/component/TextItem/TextItem'
import Menu from '@/component/Menu/Menu'
import SGYModal from '@/component/SGYModal.tsx/SGYModal'
import type { ItemProps } from './type'

const Overall: React.FC = () => {
    const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 })
    const [items, setItems] = useState<ItemProps[]>([])
    const [modal, setModal] = useState(false)
    const [itemType, setItemType] = useState<string>('')
    const [savedPosition, setSavedPosition] = useState({ x: 0, y: 0 })

    // Data Upload Change Function
    const onModalClick = (flag: boolean) => {
        const { x, y } = savedPosition
        if (flag) {
            switch (itemType) {
                case 'FileItem':
                    setItems([
                        ...items,
                        { type: 'fileItem', id: Date.now(), x, y },
                    ])
                    break
                case 'TextItem':
                    setItems([
                        ...items,
                        { type: 'textItem', id: Date.now(), x, y },
                    ])
                    break
                case 'ImageItem':
                    setItems([
                        ...items,
                        { type: 'imageItem', id: Date.now(), x, y },
                    ])
                    break
                default:
                    alert('错误')
                    break
            }
        }
        setModal(false)
        handleCloseMenu()
    }

    // Arousal menu Function
    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        if (modal) {
            return
        }
        const x = event.pageX
        const y = event.pageY

        setMenu({
            visible: true,
            x,
            y,
        })
    }

    // Select menu  Function
    const handleMenuSelect = (action: string) => {
        const { x, y } = menu
        setSavedPosition({ x, y })
        setItemType(action)

        if (itemType == 'TextItem') {
            setItems([...items, { type: 'textItem', id: Date.now(), x, y }])
            handleCloseMenu()
            return
        }
        setModal(true)
    }

    // close menu Function
    const handleCloseMenu = () => {
        setMenu({ visible: false, x: 0, y: 0 })
    }

    // Create TextItem Function
    const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const x = event.pageX
        const y = event.pageY
        setItems([...items, { type: 'textItem', id: Date.now(), x, y }])
    }

    return (
        <div
            className={styles.container}
            onContextMenu={handleContextMenu}
            onDoubleClick={handleDoubleClick}
        >
            {/* Render Item */}
            {items.map((item) => {
                switch (item.type) {
                    case 'fileItem':
                        return (
                            <FileItem
                                key={item.id}
                                id={item.id}
                                x={item.x}
                                y={item.y}
                            />
                        )
                    case 'textItem':
                        return (
                            <TextItem
                                key={item.id}
                                id={item.id}
                                x={item.x}
                                y={item.y}
                            />
                        )
                    case 'imageItem':
                        return (
                            <div
                                key={item.id}
                                style={{
                                    position: 'absolute',
                                    transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
                                }}
                            >
                                Image Item {item.id}
                            </div>
                        )
                    default:
                        return null
                }
            })}
            {/* Menu Select */}
            {menu.visible && (
                <Menu
                    x={menu.x}
                    y={menu.y}
                    visible={menu.visible}
                    onClose={handleCloseMenu}
                    onSelect={handleMenuSelect}
                />
            )}
            {/* Modal */}
            {modal && <SGYModal onModalClick={onModalClick} />}
        </div>
    )
}

export default Overall
