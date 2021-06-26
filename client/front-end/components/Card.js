import React from "react";
import Link from "next/link";
import moment from "moment";
import { API } from "../config";

const Card = ({ blog }) => {
  const showBlogCategories = (blog) =>
    blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-info mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));

  const showBlogTags = (blog) =>
    blog.tags.map((t, i) => (
      <Link key={i} href={`/tags/${t.slug}`}>
        <a className="btn btn-outline-danger mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));

  return (
      <>
       
        <img className="img img-fluid" 
        style={{ maxHeight: '150px', width: 'auto' }} src={`${API}/blog/photo/${blog.slug}`} />
        <section>
          <Link href={`/blogs/${blog.slug}`}>
            <a>
              <h2>{blog.title}</h2>
            </a>
          </Link>
          <p className="mark ml-1 pt-2 pb-2">
            Written by {blog.postedBy.name} | Published{" "}
            {moment(blog.updatedAt).fromNow()}
          </p>
        </section>
        
        <p>{blog.desc}</p>
        <Link href={`/blogs/${blog.slug}`}>
          <a className="btn btn-primary pt-2">Read more</a>
        </Link> 
      

      {showBlogCategories(blog)}
      {showBlogTags(blog)}
    </>
  );
};

export default Card;
