import React from 'react'
import { DndContext } from '@dnd-kit/core'
import styles from './index.module.scss'

const Overall: React.FC = () => {
    return (
        <div className={styles.container}>
            <DndContext>9</DndContext>
        </div>
    )
}

export default Overall
