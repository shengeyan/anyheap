import React, { useState } from 'react'
import styles from './index.module.scss'
import { TextItemProps } from './type'
import { Rnd } from 'react-rnd'

const TextItem: React.FC<TextItemProps> = ({ id, x, y, initialText }) => {
    const [text, setText] = useState(initialText || null)
    const [isEditing, setIsEditing] = useState(false)

    // 切换到编辑模式
    const handleDoubleClick = () => {
        setIsEditing(true)
    }

    // 处理输入内容的变化
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value)
    }

    // 处理按下回车键，退出编辑模式
    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            setIsEditing(false) // 退出编辑模式
            event.preventDefault() // 防止回车导致换行
        }
    }

    // 当用户点击其他地方时，保存并退出编辑模式
    const handleBlur = () => {
        setIsEditing(false)
    }

    return (
        <Rnd
            className={styles.container}
            // size={{ width: size.width, height: size.height }}
            // position={{ x: position.x, y: position.y }}
            // onDragStop={handleDragStop}
            // onResizeStop={handleResizeStop}
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
            <div className={styles.textItemContainer}>
                {isEditing ? (
                    <textarea
                        className={styles.textArea}
                        value={text}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} // 按下回车保存并退出编辑模式
                        onBlur={handleBlur} // 失去焦点时保存并退出编辑模式
                        autoFocus // 自动聚焦输入框
                    />
                ) : (
                    <div
                        onDoubleClick={handleDoubleClick}
                        className={styles.textDisplay}
                    >
                        {text || '双击开始编辑...'}{' '}
                        {/* 如果没有内容，提示用户 */}
                    </div>
                )}
            </div>
        </Rnd>
    )
}

export default TextItem
