
import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="container">
      <h2 className="section-title">404 - Page Not Found</h2>

      <p>Sorry, the page you are looking for does not exist.</p>

      <Link to="/" className="btn">
        Back to Home
      </Link>
    </main>
  )
}

export default NotFoundPage
