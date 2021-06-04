import React,{useState, useEffect} from 'react'
import { Button, Form, FormGroup, Input, Label } from "reactstrap"
import { Signup } from '../../actions/auth'




const SignupComponent = () => {
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        error:'',
        loading:false,
        message:'',
        showForm:true
    })
    useEffect(() =>{
        isAuth() && Router.push('/')
      },[])

    //we should destructure
    const {name,email,password,message,showForm,loading, error} = values

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password };

        Signup(user).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    loading: false,
                    message: data.message,
                    showForm: false
                });
            }
        });
       }

       const handleChange = name => e => {
        setValues({...values, error:false, [name]:e.target.value})
        //console.table({name,email,password,message,showForm,loading, error})
       }


    const signupForm = () =>{
         return(
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input value={name} onChange={handleChange('name')} type="text" name="name" placeholder="Enter your Name" />
                </FormGroup>
                <FormGroup>
            <Label for="Email">Email</Label>
            <Input value={email}  onChange={handleChange('email')} type="email" name="email" id="Email" placeholder="Enter your Email" />
          </FormGroup>
                <FormGroup>
            <Label for="Password">Password</Label>
            <Input value={password}  onChange={handleChange('password')} type="password" name="password" id="Password" placeholder="Enter your Password" />
          </FormGroup>
          <Button>Signup</Button>
            </Form>
        )
    }

    const showLoading = () => (loading ? <div className="alert alert-info">loading...</div> : '')
    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div> : '');
   return(
    <React.Fragment>
            {showError()}
            {showLoading()}
            {showMessage()}
       { showForm && signupForm()}
    </React.Fragment>   
   ) 
   

 }

export default SignupComponent