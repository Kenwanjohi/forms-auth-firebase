import React, {useState} from 'react'
import { Link, withRouter } from 'react-router-dom'
import {WithFirebase } from '../Firebase/firebase'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Styles from './signin.module.css';
const SignIn = ({firebase, ...props}) => {
    const [error, setError] = useState('')
    return(
        <div className={Styles.container} >

            <div className={Styles.layout}>
            <h1>Barter</h1>
            <p>Login to your barter account</p>
            <div className={Styles.card}>
            <div className={Styles.inner} >
            <Formik
                initialValues={{email: '', password: ''}}
                validate = {values => {
                    const errors = {}
                    if (values.email === '') {
                        errors.email = 'Required'
                    }
                    if (values.password === '') {
                        errors.password = 'Required'
                    }
                    return errors
                }
                }
                onSubmit={async (values, { setSubmitting, resetForm } ) => {
                    setSubmitting(true)
                    try {
                        await firebase.doSignInWithEmailAndPassword(values.email, values.password)
                        resetForm({})
                        props.history.push('/home');
                        setSubmitting(false)
                    } catch(error) {
                        console.log(error)
                        setError(error.message)
                        setSubmitting(false)
                    }
                }}
            >
                <Form>
                <label htmlFor='email' className={Styles.label} >Email address</label>
                <Field name='email' type='email' className={Styles.input}/>
                <span className={Styles.bar} />
                <ErrorMessage name='email' />
                <label htmlFor='password' className={Styles.label} >enter your Password</label>
                <Field name='password'type='password' className={Styles.input}/>
                <span className={Styles.bar} />
                <ErrorMessage name='password' className={Styles.error} />
                <PasswordForgetLink/>
                <button type='submit' className={Styles.button} >Sign In</button>
                {error && <p>{error}</p>}
                </Form>
            </Formik>
            <SignUpLink/>
            </div>
            </div>
            </div>
        </div>
    )
}
const PasswordForgetLink = () => (
    <p className={Styles.forgot}>
    <Link className={Styles.link} to='/forgot-pw'>Forgot Password?</Link>
    </p>
    );

const SignUpLink = () => (
    <p className={Styles.para} >
    Don't have an account? <Link className={Styles.link} to='/signup'>Register</Link>
    </p>
    );
    

export default withRouter(WithFirebase(SignIn))