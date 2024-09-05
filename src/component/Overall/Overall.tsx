// Overall.tsx
import React, { useState } from 'react'
import styles from './index.module.scss'
import FileItem from '@/component/FileItem/FileItem'
import Menu from '@/component/Menu/Menu'
import type { ItemProps } from './type'

const Overall: React.FC = () => {
    const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 })
    const [items, setItems] = useState<ItemProps[]>([])

    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        const x = event.pageX
        const y = event.pageY

        setMenu({
            visible: true,
            x,
            y,
        })
    }

    const handleMenuSelect = (action: string) => {
        const { x, y } = menu
        switch (action) {
            case 'FileItem':
                setItems([...items, { type: 'fileItem', id: Date.now(), x, y }])
                break
            case 'TextItem':
                setItems([...items, { type: 'textItem', id: Date.now(), x, y }])
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
        handleCloseMenu()
    }

    const handleCloseMenu = () => {
        setMenu({ visible: false, x: 0, y: 0 })
    }

    return (
        <div className={styles.container} onContextMenu={handleContextMenu}>
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
            {menu.visible && (
                <Menu
                    x={menu.x}
                    y={menu.y}
                    visible={menu.visible}
                    onClose={handleCloseMenu}
                    onSelect={handleMenuSelect}
                />
            )}
        </div>
    )
}

export default Overall
