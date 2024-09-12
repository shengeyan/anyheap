// Overall.tsx
import React, { useState } from 'react'
import styles from './index.module.scss'
import FileItem from '@/component/FileItem/FileItem'
import Menu from '@/component/Menu/Menu'
import SGYModal from '@/component/SGYModal.tsx/SGYModal'
import type { ItemProps } from './type'

const Overall: React.FC = () => {
    const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 })
    const [items, setItems] = useState<ItemProps[]>([])
    const [modal, setModal] = useState(false)
    const [finishCreate, setFinishCreate] = useState(false)

    // Data Upload Change Function
    const onModalClick = (flag: boolean) => {
        if (flag) {
            setFinishCreate(true)
        }
        setModal(false)
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
        setModal(true)

        switch (action) {
            case 'FileItem':
                if (!finishCreate) return
                setItems([...items, { type: 'fileItem', id: Date.now(), x, y }])
                break
            case 'TextItem':
                if (!finishCreate) return
                setItems([...items, { type: 'textItem', id: Date.now(), x, y }])
                break
            case 'ImageItem':
                if (!finishCreate) return
                setItems([
                    ...items,
                    { type: 'imageItem', id: Date.now(), x, y },
                ])
                break
            default:
                alert('错误')
                break
        }
        handleCloseMenu()
    }

    // close menu Function
    const handleCloseMenu = () => {
        setMenu({ visible: false, x: 0, y: 0 })
    }

    return (
        <div className={styles.container} onContextMenu={handleContextMenu}>
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
                            <div
                                key={item.id}
                                style={{
                                    position: 'absolute',
                                    transform: `translate3d(${item.x}px, ${item.y}px, 0)`,
                                }}
                            >
                                Text Item {item.id}
                            </div>
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
