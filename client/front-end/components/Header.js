
import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';
import styles from '../styles/Home.module.css'
import {
  Collapse,
  Navbar,
  NavbarToggler, 
  Nav,
  NavItem,
  NavLink,
  Container,
  
} from 'reactstrap';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Navbar className={styles.navbar} light expand="md">
        <Link href="/">
          <NavLink className={styles.logo}>{APP_NAME}</NavLink>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Container>
          <Nav className={styles.nav} navbar>
          <NavItem>
                  <Link href="/">
                    <NavLink className={styles.navLink}>home</NavLink>
                  </Link>
                </NavItem>
          </Nav>
          </Container>
        <div className={styles.user}>
        {!isAuth() && (
              <React.Fragment>
                <NavItem>
                  <Link href="/signin">
                    <NavLink className={styles.userLink, styles.link2}>Signin</NavLink>
                  </Link>
                </NavItem>
                <NavItem>
                  <Link href="/signup">
                    <NavLink className={styles.userLink,styles.link1}>Signup</NavLink>
                  </Link>
                </NavItem>
              </React.Fragment>
            )}

          

          {isAuth() && isAuth().role == 0 && (
              <NavItem>
                <Link href="/user">
                <NavLink className={styles.userLink}>
                 {`${isAuth().name}, user dashboard`}
                </NavLink>
                </Link>
              </NavItem>
            )}

           {isAuth() && isAuth().role == 1 && (
              <NavItem>
                <Link href="/admin">
                <NavLink className={styles.userLink}>
                 {`${isAuth().name}, dashboard`}
                </NavLink>
                </Link>
              </NavItem>
            )}

            {isAuth() && (
              <NavItem>
                <NavLink className={styles.userLink} onClick={() => signout(() => Router.replace(`/signin`))}>
                  Signout
                </NavLink>
              </NavItem>
            )}
            
        </div>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;