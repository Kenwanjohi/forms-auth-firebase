import React from 'react'
import {withAuthorization} from '../Session'

const Home = () => {
    return(
        <div>Home</div>
    )
}

const condition = authUser => !!authUser
export default withAuthorization(condition)(Home)
