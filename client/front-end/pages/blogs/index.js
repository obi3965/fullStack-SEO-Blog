import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../api/blog";
import { API } from "../../config";
import { Container, Row, Col, Button } from "reactstrap";
import Card from "../../components/Card";
import Link from 'next/link';
import BlogBanner from "../../components/BlogBanner";
import styles from '../../styles/Blog.module.css'
import { DOMAIN, APP_NAME, FB_APP_ID } from '../../config'
import Head from 'next/head'
import { withRouter } from 'next/router'


const Blogs = ({ blogs, tags, categories, totalBlogs, blogSkip, blogsLimit, router }) => {

  const head = () => (
    <Head>
      <title>travel blogs | {APP_NAME}</title>
      <meta name="description" content="a travel blogs with different categories" />
      <link rel="canonical" href={`${DOMAIN} ${router.pathname}`} />
      <meta property="og:title" content={`Latest travel and etc website | ${APP_NAME}`} />
      <meta property="og:description" content="Programming blogs and tutorials on react node next mongoDB and web developoment"
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

  const [limit, setLimit] = useState(blogsLimit);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(totalBlogs);
  const [loadedBlogs, setLoadedBlogs] = useState([]);

  const loadMore = () => {
    let toSkip = skip + limit;
    listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        setLoadedBlogs([...loadedBlogs, ...data.blogs])
        setSize(data.size)
        setSkip(toSkip)
      }
    })
  }


  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <Button onClick={loadMore} >load more</Button>
      )
    )
  }


  const showLoadedBlogs = () => {
    return loadedBlogs.map((blog, i) => (
      <article key={i}>
        <Card blog={blog} />
      </article>
    ));
  };


  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      // ()
      return (

        <Card key={i} blog={blog} />



      );
    });
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <>
        <Col className="col-md-3">
          <div className={styles.catBox}>
            <Link href={`/categories/${c.slug}`} key={i}> 
            <a className={styles.catLink}>
            <img className={styles.catImage}
            src={`${API}/category/photo/${c.slug}`} />
              {c.name}</a>
          </Link>
          </div>
        </Col>
      </>
    ));
  };

  const catName = () => {
    return categories.map((el, i) => (
      
      <Link href={`/categories/${el.slug}`} key={i}> 
            <a className={styles.catLinks}>
              {el.name}</a>
          </Link>
      
    ))
  }

  const showAllTags = () => {
    return tags.map((t, i) => (

      

        <Link href={`/tags/${t.slug}`} key={i}>
          <a className={styles.tagLink}>{t.name}</a>
        </Link>
      

    ));
  };


  return (
    <>
      {head()}
      <BlogBanner />

      <div className={styles.blogBox}>
        <h1>all blogs</h1>
        <div className={styles.underline}></div>
        <div className={styles.blogBoxDesc}>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Vel neque illum eligendi minima distinctio debitis possimus.
            Vel unde expedita at!</p>
        </div>
      </div>
      <br />
      <br />



      <Container>
        <Col className="col-12">
          <Row>
            {showAllCategories()}
          </Row>

        </Col>
      </Container>
    
      <Container className={styles.container}>
        <Row className="m-auto">
          <div className="col-12">
            <Row className="m-auto d-flex justify-content-between">
              <Col md="9">
                <div className={styles.cardBox}>
                  {showAllBlogs()}
                  {showLoadedBlogs()}
                </div>
              
              {loadMoreButton()}
              </Col>
              <Col md="3" className={styles.box}>
                <div className={styles.tags}>
                  <h1>tags</h1>
                 {showAllTags()}
              </div>
                <hr />
                <div className={styles.cat}>
                  <h1>categories</h1>
                  {catName()}
                </div>
              </Col>
              
            </Row>

            


          </div>
        </Row>
      </Container>

    </>
  );
};

Blogs.getInitialProps = () => {
  let skip = 0
  let limit = 4
  return listBlogsWithCategoriesAndTags(skip, limit).then((data) => {
    if (data.error) {
      console.log(data.error);

    } else {
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        totalBlogs: data.size,
        blogsLimit: limit,
        blogSkip: skip
      };

    }
    console.log(data.blogs);
  });
};

export default withRouter(Blogs);
