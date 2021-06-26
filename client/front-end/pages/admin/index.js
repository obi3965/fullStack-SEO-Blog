import {Nav, NavItem,NavLink, Col, Container,Row } from "reactstrap";
import Admin from "../../components/auth/Admin";
import Link from 'next/link';

const adminIndex = () => {
    return (
      <div>
          <Admin>
            <Container>
                <Row>
                    <Col md="6" sm="6" xs="12">
                    <div>
      <h1>categories</h1>
      <Nav vertical>
        <NavItem>
            <Link href="/admin/crud/category-tag">
          <NavLink >create categories</NavLink>
          </Link>
        </NavItem>
        <NavItem>
            <Link href="/admin/crud/category-tag">
          <NavLink >create tags</NavLink>
          </Link>
        </NavItem>
        <NavItem>
            <Link href="/admin/crud/blog">
          <NavLink >create blogs</NavLink>
          </Link>
        </NavItem>
      </Nav>
     
    </div>
                    </Col>
                    <Col md="6" sm="6" xs="12">2</Col>
                </Row>
            </Container>
          </Admin>
          
      </div>
  );
              
          
     
  };
  
  export default adminIndex;
  