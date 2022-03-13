import React, { FC } from 'react'
import { css } from 'linaria'
import { Router, Route, NotFound } from 'react-clean-router'
import usePath from 'react-use-path'
import HomePage from './pages/HomePage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Layout from './components/Layout'
import ApplyPage from './pages/ApplyPage'
import ReviewMaterialPage from './pages/ReviewMaterial'
import AdminPage from './pages/AdminPage'

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
            <Route match='/apply'>
                <ApplyPage />
            </Route>
            <Route match='/my-apply'>
                <ReviewMaterialPage mode='inspect' />
            </Route>
            <Route match='/reviews_<id>'>
                <ReviewMaterialPage mode='review' />
            </Route>
            <Route match='/admin'>
                <AdminPage />
            </Route>
        </Router>
    </Layout>
}

export default App
