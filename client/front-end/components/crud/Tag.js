import React,{useState, useEffect} from 'react'
import { getCookie } from '../../pages/api/auth'
import { create, getTags, removeTags } from '../../pages/api/tags'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'



const Tag = () => {

  const [values, setValues] = useState({
    name:'',
    error:false,
    success:false,
    tags:[],
    removed:false,
    reload: false
  });

  const { name, error, removed, tags, success, reload } = values
  const token = getCookie('token')


  const loadTags = () => {
    getTags().then(data => {
      if (data.error) {
       
      } else {
          setValues({ ...values, tags: data });
      }
  });
  }

  const deleteConfirm = slug => {
    const answer = window.confirm('are you sure to delete')
    if(answer){
      deleteTag(slug)
    }
  }
  const deleteTag = slug => {
    removeTags(slug, token).then(data => {
      if(data.error){
        console.log(data.error);
      }else{
        setValues({...values, error: false, success: false, name: '', removed: !removed, reload: !reload})
      }
    })
  }

  useEffect(() => {
    loadTags()
  }, [reload]);

  const showTags = () => {
   return tags.map((c, i) => {
    return(
      
      <Button key={i} color="warning" className="btn btn-info m-2" onClick={ () => deleteConfirm(c.slug)} >
       {c.name}
     </Button>
     
    ) 
           
    }) 
  }
    
  

  const clickSubmit = e => {
    e.preventDefault();
        // console.log('create category', name);
        create({ name }, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({ ...values, error: false, success: false, name: '', removed: !removed, reload: !reload });
            }
        });
  }

  const handleChange = (e) => {
    setValues({...values, name: e.target.value, error: false, success:false, removed:''})
  }

  const showSuccess = () => {
    if (success) {
        return <p className="text-success">Tags is created</p>;
    }
};

const showError = () => {
    if (error) {
        return <p className="text-danger">Tags already exist</p>;
    }
};

const showRemoved = () => {
    if (removed) {
        return <p className="text-danger">Tags is removed</p>;
    }
};


const mouseMoveHandler = e => {
  setValues({ ...values, error: false, success: false, removed: '' });
};


  const tagForm = () => (
    <Form onSubmit={clickSubmit}>
     <FormGroup>
       <Label>category name</Label>
         <Input type="text" placeholder="Enter Tag Name" onChange={handleChange} value={name} autoComplete="off" />
         
     </FormGroup>
      <Button>create</Button>
    </Form>
  )
  return(
    <div>
      
       {showError()}
       {showSuccess()}
       {showRemoved()}
       <div onMouseMove={mouseMoveHandler}>
                {tagForm()}
                {showTags()}
            </div>
    </div>
   )

 }

export default Tag