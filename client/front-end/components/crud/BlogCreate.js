import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie } from "../../pages/api/auth";
import { getCategories } from "../../pages/api/category";
import { getTags } from "../../pages/api/tags";
import { createBlog } from "../../pages/api/blog";
import { Button, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "../../node_modules/react-quill/dist/quill.snow.css";
import styles from '../../styles/BlogCreate.module.css'

const BlogCreate = ({ router }) => {
    const blogFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }
    
        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else {
            return false;
        }
    };
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    desc:'',
    handlePublishButton: false,
  });
  const [body, setBody] = useState(blogFromLS());

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [checked, setChecked] = useState([]);// for categories
  const [checkedTag, setCheckedTag] = useState([]);// for Tags


  const { error, sizeError, success, formData, title,desc, handlePublishButton } = values;
  const token = getCookie('token');

  useEffect(() => {
      setValues({...values, formData: new FormData()})
      initCategories();
        initTags();
  }, [router]);


  const initCategories = () => {
     getCategories().then(data => {
         if(data.error){
             setValues({...values, error: data.error})
         }else{
             setCategories(data)
         }
     })
  }

  const initTags = () => {
      getTags().then(data => {
          if(data.error){
              setValues({...values, error: data.error})
          }else{
              setTags(data)
          }
      })
}




  const publishBlog = (e) => {
    e.preventDefault();
    createBlog(formData, token).then(data => {
        if(data.error){
            setValues({...values, error: data.error})
        }else{
            setValues({...values, title: '', error: '', success: `A new blog titled "${data.title}" is created`})
            setBody('')
            setCategories([]);
            setTags([]);
        }
    })
  };

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    const value = name == 'photo' ? e.target.files[0] : e.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value, formData, error: '' });
  };

 
  const handleToggle = c => () => {
    setValues({ ...values, error: '' });
    // return the first index or -1
    const clickedCategory = checked.indexOf(c);
    const all = [...checked];

    if (clickedCategory === -1) {
        all.push(c);
    } else {
        all.splice(clickedCategory, 1);
    }
    console.log(all);
    setChecked(all);
    formData.set('categories', all);
  }

  const handleTagsToggle = t => () => {
    setValues({ ...values, error: '' });
    // return the first index or -1
    const clickedTag = checked.indexOf(t);
    const all = [...checkedTag];

    if (clickedTag === -1) {
        all.push(t);
    } else {
        all.splice(clickedTag, 1);
    }
    console.log(all);
    setCheckedTag(all);
    formData.set('tags', all);
};



const handleBody = e => {
  // console.log(e);
  setBody(e);
  formData.set('body', e);
  if (typeof window !== 'undefined') {
      localStorage.setItem('blog', JSON.stringify(e));
  }
};

  const showCategories = () => {
    return (
        categories &&
        categories.map((c, i) => (
        //     <li key={i} className="list-unstyled">
        //     <Button onClick={handleToggle(c._id)} type="checkbox" className="mr-2">{c.name}</Button>
            
        // </li>
        <Label key={i}>
            <Input type="checkbox" onChange={handleToggle(c._id)}  />
            {c.name}
            </Label>
        ))
    );
};


const showTags = () => {
    return (
        tags &&
        tags.map((t, i) => (
        //     <li key={i} className="list-unstyled">
        //     <Button onClick={handleTagsToggle(t._id)}>{t.name}</Button>
        // </li>
        <Label key={i}>
        <Input type="checkbox" onChange={handleTagsToggle(t._id)}  />
        {t.name}
        </Label>
        ))
    );
};

//show the success message
const showError = () => ( 
    <div className="bg-danger" style={{ display: error ? '' : 'none'}}>
        {error}
    </div>
)

const showSuccess = () => ( 
    <div className="bg-success" style={{ display: success ? '' : 'none'}}>
        {success}
    </div>
)

  const createBlogForm = () => {
    return (
      <Form onSubmit={publishBlog}>
        <FormGroup>
          <Label>title</Label>
          <Input
            type="text"
            placeholder="Enter your title"
            value={title}
            onChange={handleChange("title")}
          />
        </FormGroup>
        <FormGroup>
          <Label>writes</Label>
          <ReactQuill className={styles.ql}
            value={body}
            placeholder="write something here"
            modules={BlogCreate.modules}
            formats={BlogCreate.formats}
            onChange={handleBody}
          />
        </FormGroup>
       <Input type="textarea" value={desc} onChange={handleChange('desc')} />

        <Button type="submit">publish</Button>
      </Form>
    );
  };
  return (
    <>
    <Container>
    
     {showError()}
     {showSuccess()}
      
          <Row>
              <Col md="8" sm="6">
             {createBlogForm()}  
            </Col>
    
               <Col md="4" sm="6" xs="12">
                   <FormGroup>
                       <Label for="img" className="btn btn-outline-info">upload images
                       <Input onChange={handleChange('photo')}  type="file" name="file" id="img" accept="image/*" hidden />
                       </Label>
                   </FormGroup>

                   <hr />
                     <h1>categories</h1>
                      {showCategories()}

                      <hr />
                      <h1>tags</h1>
                    {showTags()}
              </Col>
              
             
          </Row>
      </Container>
      
    </>
  )
 
};

BlogCreate.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: [3, 4, 5, 6] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
};

BlogCreate.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
  "video",
  "code-block",
];

export default withRouter(BlogCreate);
