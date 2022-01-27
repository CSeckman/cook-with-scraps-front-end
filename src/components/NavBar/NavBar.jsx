import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      {user ?
        <nav className='navbar-brand'>
            <p>Welcome, {user.name}</p>
            <p><Link to="/recipes">My Recipes</Link></p>
            <p><Link to="/search">Search</Link></p>
            <p><Link to="" onClick={handleLogout}>LOG OUT</Link></p>
            <p><Link to="/changePassword">Change Password</Link></p>
        </nav>
      :
        <nav className='navbar-brand'>
            <p><Link to="/login">Log In</Link></p>
            <p><Link to="/signup">Sign Up</Link></p>
        </nav>
      }
    </>
  )
}

export default NavBar
