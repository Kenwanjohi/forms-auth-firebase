import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { WithFirebase } from '../Firebase/firebase'
import Styles from './passwordforget.module.css'


const PasswordForget = ({firebase}) => {
    const [error, setError] = useState(null)

    return (
        <div  className={Styles.container}>
            <div className={Styles.layout}>
            <h1>Barter</h1>
            <p>Login to your barter account</p>
            <div className={Styles.card}>
            <div className={Styles.inner} >
            <Formik
                initialValues={{email: ''}}
                validate={values => {
                    const errors = {}
                    if (values.email === '') {
                        errors.email = 'Required'
                    }
                    return errors
                }
                }
                onSubmit={async (values, { setSubmitting, resetForm } ) => {
                    setSubmitting(true)
                    try {
                        await firebase.doPasswordReset(values.email)
                        resetForm({})
                        setSubmitting(false)
                    } catch(error) {
                        console.log(error.message)
                        setError(error.message)
                        setSubmitting(false)
                    }
                }}
            >
                <Form>
                    <label htmlFor='email' className={Styles.label} >Email address</label>
                    <Field type='email'   name='email' className={Styles.input} /> 
                    <span className={Styles.bar} />
                    <ErrorMessage name='email' />  
                    <button  className={Styles.button} type="submit">
                    Reset My Password
                    </button>
                    {error && <p>{error}</p>}
                </Form>
            </Formik>
            </div>
            </div>
            </div>
        </div>

    )
}
export default WithFirebase(PasswordForget)