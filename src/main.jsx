import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App.jsx'

import userReducer from './reducer/userReducer.jsx'
import quoteReducer from './reducer/quoteReducer.jsx'

import './index.css'

const store = configureStore({
  reducer: {
    user: userReducer,
    quote: quoteReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
