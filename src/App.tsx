import React, { FC } from 'react'
import { Router, Route } from 'react-clean-router'
import usePath from 'react-use-path'
import Layout from './components/Layout'
import ApplyPage from './pages/ApplyPage'
import ReviewMaterialPage from './pages/ReviewMaterial'
import AdminPage from './pages/AdminPage'
import useSession from './hooks/useSession'
import UsersPage from './pages/UsersPage'
import UserPage from './pages/UserPage'
import UserForm from './pages/UserForm'
import HousesPage from './pages/HousesPage'
import HomePage from './pages/HomePage'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import HouseForm from './pages/HouseForm'
import AdminHousePage from './pages/AdminHousePage'
import Houses from './pages/Houses'
import House from './pages/House'

const App: FC = () => {
    const [{ path }] = usePath()
    const [session] = useSession()
    console.log(session)
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
                <ApplyPage mode='create' />
            </Route>
            <Route match='/apply-update'>
                <ApplyPage mode='update' />
            </Route>
            <Route match='/my-apply'>
                <ReviewMaterialPage mode='inspect' />
            </Route>
            <Route match='/reviews-apply_<id>'>
                <ReviewMaterialPage mode='review' />
            </Route>
            <Route match='/reviews_<id>'>
                <ReviewMaterialPage mode='review' />
            </Route>
            <Route match='/admin'>
                <AdminPage />
            </Route>
            <Route match='/users'>
                <UsersPage />
            </Route>
            <Route match='/users_<id>'>
                <UserPage />
            </Route>
            <Route match='/users-update_<id>'>
                <UserForm />
            </Route>
            <Route match='/houses'>
                <HousesPage />
            </Route>
            <Route match='/home-houses'>
                <Houses />
            </Route>
            <Route match='/home-houses_<id>'>
                <House />
            </Route>
            <Route match='/adminhouses_<id>'>
                <AdminHousePage />
            </Route>
            <Route match='/houses-create'>
                <HouseForm mode='create' />
            </Route>
            <Route match='/houses-update_<id>'>
                <HouseForm mode='update' />
            </Route>
        </Router>
    </Layout>
}

export default App
