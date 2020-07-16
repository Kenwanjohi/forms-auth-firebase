import React, {useEffect} from 'react'
import { withRouter } from 'react-router-dom';
import {WithFirebase } from '../Firebase/firebase'
const AuthUserContext = React.createContext(null)

const withAuthorization = (Condition) => (Component) => {
    function WithAuthorization({firebase,...props}) {
        useEffect(() => {
           const listener = firebase.auth.onAuthStateChanged(
                authUser => {
                    if (!Condition(authUser)) {
                        props.history.push('/signin');
                        }
                }
            )
            return () => {
                listener()
            }
        })
        return(
            <AuthUserContext.Consumer>
                {authUser =>
                Condition(authUser) ? <Component {...props} /> : null
                }
            </AuthUserContext.Consumer>
        )
    }
    return withRouter(WithFirebase(WithAuthorization))
}
export { AuthUserContext, withAuthorization } 