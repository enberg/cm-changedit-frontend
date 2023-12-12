import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import Index from './routes/Index.tsx'
import SignUp, { action as signUpAction } from './routes/SignUp.tsx'
import SignIn, { action as signInAction } from './routes/SignIn.tsx'
import auth from './lib/auth.ts'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: "sign-in",
        action: signInAction,
        element: <SignIn />
      },
      {
        path: "sign-up",
        action: signUpAction,
        element: <SignUp />
      },
      {
        path: "sign-out",
        action: () => {
          auth.signOut();
          return redirect('/')
        }
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
