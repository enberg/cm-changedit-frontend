import { ActionFunctionArgs, redirect } from "react-router-dom";
import auth from "../lib/auth";

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();

    const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${auth.getJWT()}`,
        },
        body: formData
    });

    if (!response.ok) {
        const { message } = await response.json();

        return { message };
    }

    return redirect('/')
}