import React, { useState } from 'react'
import styles from './index.module.scss'

interface TextItemProps {
    initialText?: string // 父组件可以传递的初始文本
}

const TextItem: React.FC<TextItemProps> = ({ initialText = '' }) => {
    const [text, setText] = useState(initialText) // 用户输入的文本内容
    const [isEditing, setIsEditing] = useState(false) // 是否处于编辑模式

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
                    {text || '双击开始编辑...'} {/* 如果没有内容，提示用户 */}
                </div>
            )}
        </div>
    )
}

export default TextItem
