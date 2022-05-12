import React from 'react';
import {Link} from 'gatsby'

const Success = () => {
    return(
        <main>
            <h1>Success!</h1>
            <p> You are awesome for subscribing to my newsletter!</p>
            <p>You are almost done. Check your inbox for a confirmation email</p>
            <p>You can <Link to="/">go back </Link> to reading more posts now</p>
        </main>
    )
}

export default Success;