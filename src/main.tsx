import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store'
import '@radix-ui/themes/styles.css'
import './styles/radix-theme.scss'
import './styles/index.scss'
import App from './App.tsx'
import { Theme } from '@radix-ui/themes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Theme accentColor="blue" grayColor="gray" radius="medium" scaling="100%">
        <App />
      </Theme>
    </Provider>
  </StrictMode>,  
)
