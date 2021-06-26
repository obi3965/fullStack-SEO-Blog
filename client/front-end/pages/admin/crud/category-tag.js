import {Col, Container,Row } from "reactstrap";
import Admin from "../../../components/auth/Admin";
import Category from "../../../components/crud/Category";
import Tag from "../../../components/crud/Tag";


const categoryTag = () => {
    return (
      <div>
          <Admin>
            <Container>
            <h1>manage categories and tags</h1>
                <Row>
                    <Col md="6" sm="8" xs="12">
                       <Category/>
                    </Col>
                    <Col md="6" sm="8" xs="12">
                       <Tag/>
                    </Col>
                </Row>
            </Container>
          </Admin>
          
      </div>
  );
              
          
     
  };
  
  export default categoryTag;
  