import ReactDOM from 'react-dom/client'
import Routing from './app/Routing/Routing'
import './main-styles/reset-styles/normolize.css'
import './main-styles/reset-styles/reset.css'
import './main-styles/fonts.css'
import './main-styles/style.css'
import { Provider } from 'react-redux'
import store from './store'
import './db.js'
import './main-styles/theme/theme.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <Provider store={store}>
      <Routing />
    </Provider>
  // </React.StrictMode>
)
