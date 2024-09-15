import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { RegisterAction } from '../../../utils/authUtils';
import styles from './AuthForm.module.css'

// Define the shape of form values using TypeScript interface
interface RegisterFormValues {
    username: string;
    email: string;
    password: string;
}

// Yup validation schema
const RegisterSchema = Yup.object().shape({
    username: Yup.string().min(3, 'name must be between 3 and 20 characters')
        .max(20, 'name must be between 3 and 20 characters').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

export const RegisterForm: () => JSX.Element = () => {

    const navigate = useNavigate();  // Initialize navigate


    // Initial form values
    const initialValues: RegisterFormValues = { username: '', email: '', password: '' };

    const handleSubmit = async(
        values: RegisterFormValues, 
        { setSubmitting }: { 
            setSubmitting: (isSubmitting: boolean) => void
        }) => {
        console.log(values);
        try {
            const data = await RegisterAction({...values})
            console.log({data});
            navigate('/home')
        } catch (error) {
            console.error("Submission error:", error);
        } finally {
            setSubmitting(false);
        }
        
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={RegisterSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                <Form className={styles['form-container']}>
                    <div className={styles['form-div']}>
                        <label htmlFor="username">Name</label>
                        <Field
                            type="text"
                            name="username"
                            className="form-input"
                        />
                        <ErrorMessage name="username" component="div" className={styles['form-error']} />
                    </div>

                    <div className={styles['form-div']}>
                        <label htmlFor="email">Email</label>
                        <Field
                            type="email"
                            name="email"
                            className="form-input"
                        />
                        <ErrorMessage name="email" component="div" className={styles['form-error']} />
                    </div>

                    <div className={styles['form-div']}>
                        <label htmlFor="password">Password</label>
                        <Field
                            type="password"
                            name="password"
                            className="form-input"
                        />
                        <ErrorMessage name="password" component="div" className={styles['form-error']} />
                    </div>

                    <button className={styles.submit} type="submit" disabled={isSubmitting}>Register</button>
                
                </Form>
                )}
            </Formik>
        </div>
    );
};