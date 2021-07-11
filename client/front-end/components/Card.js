import React from "react";
import Link from "next/link";
import moment from "moment";
import { API } from "../config";
import { Container, Row, Col, Button } from "reactstrap";
import styles from '../styles/Card.module.css'

const Card = ({ blog }) => {
 
  // const showBlogCategories = (blog) =>
  //   blog.categories.map((c, i) => (
  //     <Link key={i} href={`/categories/${c.slug}`}>
  //       <a className="btn btn-info mr-1 ml-1 mt-3">{c.name}</a>
  //     </Link>
  //   ));

  // const showBlogTags = (blog) =>
  //   blog.tags.map((t, i) => (
  //     <Link key={i} href={`/tags/${t.slug}`}>
  //       <a className="btn btn-outline-danger mr-1 ml-1 mt-3">{t.name}</a>
  //     </Link>
  //   ));

  return (
      <>
       <Row className="mt-5">
         
         <Col md="6" >
           <div className={styles.cardImage}>
        <img className="img img-fluid" 
         src={`${API}/blog/photo/${blog.slug}`} />
         </div>
       </Col>
        <Col md="6">
          <div className={styles.cardBox}>
        <Link href={`/blogs/${blog.slug}`}>
            <a className={styles.title}>
              <h2>{blog.title}</h2>
            </a>
          </Link>
          <p>{blog.desc}</p>
          <div className="ml-1 pt-2 pb-2">
           
          <p>Written by <span className={styles.written}>{blog.postedBy.name}</span>  | Published {moment(blog.updatedAt).fromNow()}</p> 
          </div>
          
          <br />
        <Link href={`/blogs/${blog.slug}`} className={styles.readLinks}  >
          <a className={styles.readLink}>Read more</a>
        </Link> 
      {/* {showBlogCategories(blog)}
      {showBlogTags(blog)} */}
      </div>
      </Col>
      
      </Row>
    </>
  );
};

export default Card;
