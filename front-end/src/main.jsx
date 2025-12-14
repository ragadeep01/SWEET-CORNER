import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import {store} from './redux/store.js'
// import { Provider } from 'react-redux'
// import {Route, RouteProvider,createRoutesFromElements} from 'react-router'
import { createBrowserRouter } from 'react-router-dom'

//auth

//restricted

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       {/* Define your routes here */}
//     </Route>  
//   )
// )
// ReactDOM.
createRoot(document.getElementById('root')).render(
  <StrictMode>
  {/* <Provider store={store}>
    <RouteProvider router={router} />
  </Provider>, */}
    <App />
 </StrictMode>,
)
