import {Col, Container,Row } from "reactstrap";
import Admin from "../../../components/auth/Admin";
import BlogCreate from "../../../components/crud/BlogCreate";


const Blog = () => {
    return (
      <div>
          <Admin>
            
            <h1>manage categories and tags</h1>
                
                   <div>
                      <BlogCreate/> 
                   </div>
                       
                    
                    
          </Admin>
          
      </div>
  );
              
          
     
  };
  
  export default Blog;
  