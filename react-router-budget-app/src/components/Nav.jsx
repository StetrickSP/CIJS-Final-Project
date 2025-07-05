// rrd imports
import { Form, NavLink } from "react-router-dom";

// library
import { TrashIcon, UserGroupIcon, PhoneIcon } from '@heroicons/react/24/solid';

// assets
import logomark from '../assets/logomark.svg';

const Nav = ( {userName} ) => {
  return (
    <nav>
      <NavLink to="/" aria-label="Go to home page">
        <img src={logomark} alt="" height={30}/>
        <span>Home</span>
      </NavLink>
      <NavLink to="/about" aria-label="Go to home page">
        <UserGroupIcon width={30} color="#10B7C0"/>
        <span>About us</span>
      </NavLink>
      <NavLink to="/contact" aria-label="Go to home page">
        <PhoneIcon width={30} color="#10B7C0"/>
        <span>Contacts</span>
      </NavLink>
      {
        userName && (
          <Form
            method="post"
            action="/logout"
            onSubmit={ (event) => {
              if (!confirm("Are you sure you want to delete your account?")) {
                event.preventDefault();
              }
            }
          }
          >
            <button type="submit" className="btn btn--warning">
              <span>Delete User</span>
              <TrashIcon width={20}/>
            </button>
          </Form>
        )
      }
    </nav>
  );
}
export default Nav;