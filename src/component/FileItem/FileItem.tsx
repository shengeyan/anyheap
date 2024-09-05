/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Rnd } from 'react-rnd'
import styles from './index.module.scss'
import { FileProps } from './type'

const FileItem: React.FC<FileProps> = ({ id, x, y }) => {
    const [position, setPosition] = useState({ x, y })
    const [size, setSize] = useState({ width: 80, height: 80 })

    // Stop drag Function
    const handleDragStop = (d: any) => {
        setPosition({ x: d.x, y: d.y })
    }

    // Size change Function
    const handleResizeStop = (ref: any) => {
        setSize({
            width: ref.offsetWidth,
            height: ref.offsetHeight,
        })
    }

    return (
        <Rnd
            className={styles.container}
            size={{ width: size.width, height: size.height }}
            position={{ x: position.x, y: position.y }}
            onDragStop={handleDragStop}
            onResizeStop={handleResizeStop}
            minWidth={60}
            minHeight={60}
            enableResizing={{
                top: false,
                right: true,
                bottom: true,
                left: false,
                topRight: false,
                bottomRight: true,
                bottomLeft: false,
                topLeft: false,
            }}
        >
            <div>File</div>
        </Rnd>
    )
}

export default FileItem
