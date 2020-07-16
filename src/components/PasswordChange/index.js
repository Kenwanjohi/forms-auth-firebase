import React, {useState} from 'react'
import { WithFirebase } from '../Firebase/firebase'
import { Formik, Form, Field, ErrorMessage } from 'formik'
const PasswordChange = ({firebase}) => {
    const [error, setError] = useState(null)
    return (
        <div>
            <Formik
                initialValues={{ passwordOne: '', passwordTwo: ''}}
                validate = {values => {
                const errors = {};
                if(!values.passwordOne) {
                    errors.passwordOne='Required'
                }else if(values.passwordOne.length < 8 || values.passwordOne.length > 15) {
                    errors.passwordOne='characters must be between 8 and 15'
                }
                if (values.passwordOne !== values.passwordTwo) {
                    errors.passwordTwo = 'password mismatch'
                }
                return errors;
                }
            }
            onSubmit={async (values, { setSubmitting, resetForm } ) => {
                setSubmitting(true)
                console.log(values)
                try {
                    await firebase.doPasswordUpdate(values.passwordOne)
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
                <Field name='passwordOne' placeholder="New Password" type='password'/>
                <ErrorMessage name='passwordOne' />
                <Field name='passwordTwo' placeholder="Confirm New Password" type='password'/>
                <ErrorMessage name='passwordTwo' />
                <button type='submit' >Reset my password</button>
                {error && <p>{error}</p>}
            </Form>
        </Formik>
        </div>
    )
}

export default WithFirebase(PasswordChange)