import React, { FC } from 'react'
import { api } from "./api"
import { useForm, SubmitHandler } from "react-hook-form"
import SignIn from './pages/signIn'

const App: FC = () => {
    return <div>
        {api.session.hasSession() ? <SignIn /> : <HomePage />}
    </div>
}

export default App
