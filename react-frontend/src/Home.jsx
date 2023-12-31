import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <nav>
        <ul>
          <Link to='/'>
            <li>Home</li>
          </Link>
          <Link to='/About'>
            <li>About</li>
          </Link>
          <Link to='/Contact'>
            <li>Contact</li>
          </Link>
        </ul>
      </nav>
    </div>
  )
}

export default Home
