import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import {WithFirebase } from '../Firebase/firebase'
import { Link, withRouter } from 'react-router-dom';
import Styles from './signup.module.css';
import SignIn from '../SignIn';
const SignUp = ({firebase, ...props}) => {
    const [error, setError] = useState(null)
    console.log(firebase)
    return(
        <div className={Styles.container}>
            <div className={Styles.layout}>
            <h1>Barter</h1>
            <p>Create your barter account</p>
            <div className={Styles.card}>
            <div className={Styles.inner} >
            <Formik
                initialValues={{userName: '', email: '', passwordOne: '', passwordTwo: ''}}
                validate = {values => {
                    const errors = {};
                    if (!values.userName) {
                        errors.userName = 'Required';
                    } else if (values.userName.length > 15) {
                        errors.userName = 'Must be 15 characters or less';
                    }
                    if(!values.passwordOne) {
                        errors.passwordOne='Required'
                    } else if(values.passwordOne.length < 8 || values.passwordOne.length > 15) {
                        errors.passwordOne='characters must be between 8 and 15'
                    }
                    if (values.passwordOne !== values.passwordTwo) {
                        errors.passwordTwo = 'password mismatch'
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                        errors.email = 'Invalid email address';
                    }
                    return errors;
                    }
                }
                onSubmit={async (values, { setSubmitting, resetForm } ) => {
                    setSubmitting(true)
                    try {
                        await firebase.doCreateUserWithEmailAndPassword(values.email, values.passwordOne)
                        // Create a user in your Firebase realtime database
                        resetForm({})
                        props.history.push('/home');
                        setSubmitting(false)
                    } catch(error) {
                        console.log(error.message)
                        setError(error.message)
                        setSubmitting(false)
                    }
                }}
            >
                <Form>
                    <label htmlFor='userName' className={Styles.label} >User Name</label>
                    <Field name='userName' className={Styles.input} type='text' />
                    <span className={Styles.bar} />
                    <ErrorMessage name='userName' />
                    <label htmlFor='email' className={Styles.label} >Email</label>
                    <Field name='email' className={Styles.input} type='email'/>
                    <span className={Styles.bar} />
                    <ErrorMessage name='email' />
                    <label htmlFor='passwordOne' className={Styles.label} >Password</label>
                    <Field name='passwordOne'  className={Styles.input} type='password'/>
                    <span className={Styles.bar} />
                    <ErrorMessage name='passwordOne' />
                    <label htmlFor='passwordTwo' className={Styles.label} >Confirm Password</label>
                    <Field name='passwordTwo' className={Styles.input} type='password'/>
                    <span className={Styles.bar} />
                    <ErrorMessage name='passwordTwo' />
                    <button type='submit'  className={Styles.button} >Sign Up</button>
                    {error && <p>{error}</p>}
                </Form>
            </Formik>
            <SignInLink/>
            </div>
            </div>
            </div>
        </div>
    )
}

const SignInLink = () => (
    <p className={Styles.para} >
    Already have an account? <Link className={Styles.link} to='/signin'>Login</Link>
    </p>
    );

export default  withRouter(WithFirebase(SignUp))