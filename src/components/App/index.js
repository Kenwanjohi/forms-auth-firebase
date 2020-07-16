import React, { useState, useEffect } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import SignOutButton from '../SignOut';
import { WithFirebase } from '../Firebase/firebase'
import { AuthUserContext } from '../Session';
import Styles from './app.module.css'
const App = ({firebase}) => {
    const [authUser, setauthUser] = useState(null)

    useEffect(() => {
    const listener =firebase.auth.onAuthStateChanged(authUser => {
        authUser ? setauthUser(authUser) : setauthUser(null)
    }
    )
    console.log(listener)
        return () => {
            listener()
        }
    })
return (
    <AuthUserContext.Provider value={authUser}>
    <Router>
    <div>
        <div className={Styles.card}>
            <nav className={Styles.nav}>
            {authUser ?
                <ul className={Styles.items}>
                    <li>
                    <Link className={Styles.items} to='/home'>Home</Link>
                    </li>
                    <li>
                    <Link className={Styles.items} to='/account'>Account</Link>
                    </li>
                    <li>
                    <Link className={Styles.items} to='/admin'>Admin</Link>
                    </li>
                    <li className={Styles.item}>
                    <SignOutButton/>
                    </li>
                </ul> :
                <>
                <Link className={`${Styles.home}`} to='/'>barter</Link>
                <ul className={Styles.items}>
                    <li className={Styles.item}>
                    <Link className={Styles.link} to='#'>Careers</Link>
                    </li>
                    <li className={Styles.item}>
                    <Link className={Styles.link} to='#'>Support</Link>
                    </li>
                    <li className={Styles.item}>
                    <Link className={Styles.link} to='/signin'>Sign In</Link>
                    </li>
                    <li className={Styles.item}>
                    <Link className={Styles.link} to='/signup'>create your account</Link>
                    </li>
                </ul>
                </>
            }
            </nav>
        </div>
        <Route exact path='/' component={LandingPage} />
        <Route path='/signup' component={SignUpPage} />
        <Route path='/signin' component={SignInPage} />
        <Route path='/forgot-pw' component={PasswordForgetPage} />
        <Route path='/home' component={HomePage} />
        <Route path='/account' component={AccountPage} />
        <Route path='/admin' component={AdminPage} />
    </div>
    </Router>
    </AuthUserContext.Provider>
)};
export default WithFirebase(App)