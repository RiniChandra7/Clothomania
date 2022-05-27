import { useState} from "react";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import './login-form.styles.scss';

import { createUserDocFromAuth, signInWithGooglePopup, loginAuthUserWithEmailPassword } from "../../utils/firebase/firebase.utils";

const defaultForm = {
    email: '',
    password: '',
}

const LoginForm = () => {
    const [formFields, setFormFields] = useState(defaultForm);
    const {email, password} = formFields;

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }

    const resetForm = () => {
        setFormFields(defaultForm);
    }

    const loginWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await loginAuthUserWithEmailPassword(email, password);
            resetForm();
        }
        catch (err) {
            switch (err.code) {
                case 'auth/wrong-password':
                    alert("Password incorrect. Please try again.");
                    break;
                case 'auth/user-not-found':
                    alert("No user associated with this email found.");
                    break;
                default:
                    console.log(err);
            }
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={submitHandler}>
                <FormInput label='Email' type='email' required onChange={changeHandler} name='email' value={email} />

                <FormInput label='Password' type='password' required onChange={changeHandler} name='password' value={password} />

                <div className="buttons-container">
                    <Button type="submit">Log in</Button>
                    <Button type="button" buttonType='google' onClick={loginWithGoogle}>Google Log in</Button>
                </div>
            </form>
        </div>
    );
}

export default LoginForm;