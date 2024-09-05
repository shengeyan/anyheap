import React from 'react'
import styles from './index.module.scss'
import { MenuProps } from './type'

const Menu: React.FC<MenuProps> = ({ x, y, visible, onClose, onSelect }) => {
    if (!visible) return null

    return (
        <div
            className={styles.menu}
            style={{ top: y, left: x }}
            onMouseLeave={onClose}
        >
            <ul>
                <li onClick={() => onSelect('FileItem')}>
                    🗂️&nbsp; Add File Item
                </li>
                <li onClick={() => onSelect('TextItem')}>
                    🔠&nbsp; Add Text Item
                </li>
                <li onClick={() => onSelect('ImageItem')}>
                    🗺️&nbsp; Add Image Item
                </li>
            </ul>
        </div>
    )
}

export default Menu
