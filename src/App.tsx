import React, { FC } from 'react'
import { css } from 'linaria'
import { Router, Route, NotFound } from 'react-clean-router'
import usePath from 'react-use-path'
import HomePage from './pages/homePage'
import SignIn from './pages/signIn'
import SignUp from './pages/signUp'
import Layout from './components/Layout'

const App: FC = () => {
    const [{ path }, setPath] = usePath()
    return <Layout>
        <Router path={path}>
            <Route match = ''>
                <HomePage />
            </Route>
            <Route match='/sign-in'>
                <SignIn />
            </Route>
            <Route match='/sign-up'>
                <SignUp />
            </Route>
        </Router>
    </Layout>
}

export default App
