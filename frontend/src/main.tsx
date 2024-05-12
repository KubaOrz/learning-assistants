import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routing/RoutingConfig.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Flowbite } from 'flowbite-react'
import theme from './config/FlowbiteConfig.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Flowbite theme={{ theme: theme }}>
        <RouterProvider router={routes} />
      </Flowbite>
    </Provider>
  </React.StrictMode>,
)
