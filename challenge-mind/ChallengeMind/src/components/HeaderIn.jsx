import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import '../Styles/HeaderStyles.css';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import useChallenge from '../hooks/useChallenge';
import { useNavigate, useLocation } from 'react-router-dom';

function HeaderIn() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { auth, closeSessionAuth } = useAuth();
  const location = useLocation();
  const handleCloseSession = () => {
    closeSessionAuth();
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 10;
      if (window.pageYOffset > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <nav>
        <div className="logo">
          <a href="#">Challenge</a>
        </div>
        <div className="profile" onClick={toggleDropdown}>
          <FontAwesomeIcon className="profileIcon" icon={faUser} />
          {dropdownVisible && (
            <ul className="dropdown-menu">
              {location.pathname === "/dashboard/MyProfile" ? (
                <li><Link replace={true} to="/dashboard">Dashboard</Link></li>
              ) : (
                <li><Link replace={true} to="/dashboard/MyProfile">My Profile</Link></li>
              )}
              <li><a href="#" onClick={handleCloseSession}>Log out</a></li>
              {auth.isAdmin == true ? (
                <>
                  <li><Link replace={true} to="/dashboard/Users">Users</Link></li>
                  <li><Link replace={true} to="/dashboard/Teams">Teams</Link></li>
                  <li><a href="#">Accounts</a></li>
                </>
              ) : (() => { })}
            </ul>
          )}
        </div>
        <div className="toggle">
        </div>
      </nav>
    </header>
  );
}

export default HeaderIn;
