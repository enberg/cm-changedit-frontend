import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ActionFunctionArgs, RouterProvider, createBrowserRouter, redirect } from 'react-router-dom'
import Index, { loader as indexLoader } from './routes/Index.tsx'
import SignUp, { action as signUpAction } from './routes/SignUp.tsx'
import SignIn, { action as signInAction } from './routes/SignIn.tsx'
import auth from './lib/auth.ts'
import CreatePost, { action as createPostAction } from './routes/CreatePost.tsx'
import RequireAuth from './components/RequireAuth.tsx'
import ShowPost, { loader as showPostLoader } from './routes/ShowPost.tsx'
import { action as createCommentAction } from './components/CommentForm.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        loader: indexLoader,
        element: <Index />
      },
      {
        path: "/posts/:id",
        loader: showPostLoader,
        element: <ShowPost />
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
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "create-post",
            action: createPostAction,
            element: <CreatePost />
          },
          {
            path: "posts/:postId/comments",
            action: createCommentAction,
          },
          {
            path: "posts/:id/vote",
            action: async (args: ActionFunctionArgs) => {
              const { id } = args.params;
              const formData = await args.request.formData();

              const url = formData.get('vote') === 'up' ? '/posts/' + id + '/upvote' : '/posts/' + id + '/downvote';

              await fetch(import.meta.env.VITE_BACKEND_URL + url, {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + auth.getJWT(),
                },
                method: 'POST',
              });

              return redirect(formData.get('from')?.toString() || '/posts/' + id);
            },
          },
        ]
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
