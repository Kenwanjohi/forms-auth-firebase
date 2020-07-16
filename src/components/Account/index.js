import React from 'react'
import PasswordChange from '../PasswordChange'
import PasswordForget from '../PasswordForget'
import {AuthUserContext, withAuthorization} from '../Session'

const Account = () => {
    return(
        <AuthUserContext.Consumer>
        {authUser => (
        <div>
            <h1>Account: {authUser.email}</h1>
            <PasswordForget/>
            <PasswordChange/>
        </div>
        )}
        </AuthUserContext.Consumer>
    )
}
const condition = authUser => !!authUser
export default withAuthorization(condition)(Account)
