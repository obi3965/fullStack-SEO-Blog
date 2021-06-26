import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../api/blog";
import { API } from "../../config";
import { Container, Row, Col } from "reactstrap";
import Card from "../../components/Card";

const Blogs = ({ blogs, tags, categories, size }) => {
  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      // ()
      return (
           <div key={i} className="col-md-4">
             <Card  blog={blog} />  
           </div>
            
           
      );
    });
  };
  return (
    <>
      
      <div className="container-fluid">
          <div className="row">
          <div className="col-4">
              <h1>show categories and tags</h1>
          </div>

          <div className="col-8">
              
                  <div className="row m-auto">
                       {showAllBlogs()}
                  </div>
                     
                
               
          </div>
      </div>
      </div>
      
    </>
  );
};

Blogs.getInitialProps = () => {
  return listBlogsWithCategoriesAndTags().then((data) => {
    if (data.error) {
      console.log(data.error);
      
    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        size: data.size.length,
      };
      
    }
    console.log(data.blogs);
  });
};

export default Blogs;
