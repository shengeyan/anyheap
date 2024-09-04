import React, { useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import styles from './index.module.scss'
import FileItem from '@/component/FileItem/FileItem'
import Menu from '@/component/Menu/Menu'
import type { FileItemProps } from './type'

const Overall: React.FC = () => {
    // 菜单信息
    const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 })
    const [items, setItems] = useState<FileItemProps[]>([])

    // 显示菜单
    const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        setMenu({
            visible: true,
            x: event.clientX,
            y: event.clientY,
        })
    }

    // 处理菜单项选择
    const handleMenuSelect = (action: string) => {
        switch (action) {
            case 'FileItem':
                setItems([...items, { type: 'fileItem', id: Date.now() }])
                break
            case 'TextItem':
                setItems([...items, { type: 'fileItem', id: Date.now() }])
                break
            case 'ImageItem':
                setItems([...items, { type: 'fileItem', id: Date.now() }])
                break
            default:
                alert('错误')
                break
        }
        handleCloseMenu()
    }

    // 关闭菜单
    const handleCloseMenu = () => {
        setMenu({ visible: false, x: 0, y: 0 })
    }

    return (
        <div className={styles.container} onContextMenu={handleContextMenu}>
            <DndContext>
                {items.map(
                    (item) =>
                        item.type === 'fileItem' && <FileItem key={item.id} />
                )}
                {menu.visible && (
                    <Menu
                        x={menu.x}
                        y={menu.y}
                        visible={menu.visible}
                        onClose={handleCloseMenu}
                        onSelect={handleMenuSelect}
                    />
                )}
            </DndContext>
        </div>
    )
}

export default Overall
