import { useState } from "react";
import { singleBlog } from '../api/blog';
import Link from 'next/link';
import styles from '../../styles/Blog.module.css'
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config'
import Head from 'next/head'
import { Container, Row, Col } from "reactstrap";
import moment from "moment";
import { withRouter } from "next/router";

const SingleBlog = ({ blog,router }) => {
    const head = () => ( 
        <Head>
          <title>Single blogs | { APP_NAME }</title>
          <meta name="description" content="a travel blogs with different categories" />
         <link rel="canonical" href={`${DOMAIN} ${router.pathname}`} />
         <meta property="og:title" content={`Latest travel and etc website | ${APP_NAME}`} />
                  <meta property="og:description"content="Programming blogs and tutorials on react node next mongoDB and web developoment"
                  />
                  <meta property="og:type" content="webiste" />
                  <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
                  <meta property="og:site_name" content={`${APP_NAME}`} />
      
                  <meta property="og:image" content={`${DOMAIN}/public/images/banner.jpg`} />
                  <meta property="og:image:secure_url" ccontent={`${DOMAIN}/public/images/banner.jpg`} />
                  <meta property="og:image:type" content="image/jpg" />
                  <meta property="fb:app_id" content={`${FB_APP_ID}`} />
                      
        </Head>
      )
    return (
        <>
        {head()}
        <Container>
            <Row>
                <Col md="5" sm="4" xs="12">
                    <img
                src={`${API}/blog/photo/${blog.slug}`}
                alt={blog.title}
                className="img img-fluid featured-image"
            /> 
                </Col>
                <Col md="7" sm="8" xs="12">
                 <div>
                     <p>{blog.body}</p>
                   <span>{moment(blog.createdAt).fromNow()}</span>  
                 </div>
                  

                   <Link href="/blogs">
                     <a>more blogs</a>  
                   </Link>
                </Col>

            </Row>
           
            
        </Container>
        </>
    )
}


SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data1 => {
        if (data1.error) {
            console.log(data1.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
            return { blog: data1 };
        }
    });
};

export default withRouter(SingleBlog)