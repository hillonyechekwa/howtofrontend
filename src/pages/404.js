import * as React from "react"
import { Link } from "gatsby"
import "../styles/notfound.scss"

// markup
const NotFoundPage = () => {
  return (
    <main className="notfound-wrapper">
      <h1 className="heading-404">oopsie! something didn't go right</h1>
      <p className="content-404">
        Sorry{" "}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{" "}
        we couldn’t find what you were looking for.
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </main>
  )
}

export default NotFoundPage
