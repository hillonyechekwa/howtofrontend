import React from 'react';
import {Link} from 'gatsby'

const Success = ({location}) => {
    return(
        <main>
            <h1>Success!</h1>
            <p>{location.state.name} You are awesome for subscribing to my newsletter!</p>
            <p>You can <Link to="/">go back </Link> to reading more posts now</p>
        </main>
    )
}

export default Success;