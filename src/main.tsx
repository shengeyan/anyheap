import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import router from '@/router/router.tsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
