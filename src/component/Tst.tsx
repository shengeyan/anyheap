import React, { useState } from 'react'
import { DndContext, useDraggable, DragOverlay } from '@dnd-kit/core'

function DraggableItem({ id, style }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useDraggable({
            id,
        })

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                ...style,
                transform: transform
                    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
                    : undefined,
                transition,
                position: 'absolute',
            }}
        >
            Drag me
        </div>
    )
}

function App() {
    const [activeId, setActiveId] = useState(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleDragStart = (event) => {
        setActiveId(event.active.id)
    }

    const handleDragEnd = (event) => {
        setActiveId(null)

        // Calculate new position based on the dragged offset
        const delta = event.delta
        setPosition((prevPosition) => ({
            x: prevPosition.x + delta.x,
            y: prevPosition.y + delta.y,
        }))
    }

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <DraggableItem
                id="draggable-item"
                style={{
                    top: position.y,
                    left: position.x,
                    width: '100px',
                    height: '100px',
                    backgroundColor: 'lightblue',
                }}
            />
            <DragOverlay>
                {activeId ? (
                    <DraggableItem
                        id={activeId}
                        style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: 'lightblue',
                        }}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}

export default App
