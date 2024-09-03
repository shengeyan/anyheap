import { createBrowserRouter } from 'react-router-dom'

import Overall from '@/component/Overall/Overall'
import TST from '@/component/Tst'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Overall></Overall>,
    },
    {
        path: '/tst',
        element: <TST></TST>,
    },
])

export default router
