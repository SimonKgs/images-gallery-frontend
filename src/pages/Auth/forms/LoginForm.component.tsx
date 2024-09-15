import { useNavigate } from 'react-router-dom';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useAuth } from '../../../context/AuthContext';
import styles from './AuthForm.module.css'

// Define the shape of form values using TypeScript interface
interface LoginFormValues {
  email: string;
  password: string;
}

// Yup validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
});

export const LoginForm: () => JSX.Element = () => {
    const { login } = useAuth();
    const navigate = useNavigate();  // Initialize navigate


    // Initial form values
    const initialValues: LoginFormValues = { email: '', password: '' };
 
    const handleSubmit = async(
        values: LoginFormValues, 
        { setSubmitting }: { 
            setSubmitting: (isSubmitting: boolean) => void
        }) => {
        console.log(values);
        try {
            const data = await login(values.email, values.password)
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
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                <Form className={styles['form-container']}>
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

                    <button className={styles.submit} type="submit" disabled={isSubmitting}>Login</button>
                
                </Form>
                )}
            </Formik>
        </div>
    );
};