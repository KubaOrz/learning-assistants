import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routing/RoutingConfig.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { Flowbite } from 'flowbite-react'
import theme from './config/FlowbiteConfig.ts'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Flowbite theme={{ theme: theme }}>
        <DndProvider backend={HTML5Backend}>
          <RouterProvider router={routes} />
        </DndProvider>
      </Flowbite>
    </Provider>
  </React.StrictMode>,
)
