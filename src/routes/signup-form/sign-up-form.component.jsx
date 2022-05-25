import { useState } from "react";
import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/button/button.component";
import './sign-up-form.styles.scss';

import { createAuthUserWithEmailPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";

const defaultForm = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignupForm = () => {
    const [formFields, setFormFields] = useState(defaultForm);
    const {displayName, email, password, confirmPassword} = formFields;

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setFormFields({...formFields, [name]: value})
    }

    const resetForm = () => {
        setFormFields(defaultForm);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords are not matching!");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailPassword(email, password);

            await createUserDocFromAuth(user, {displayName});

            resetForm();
        }
        catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                alert('Email already in use. Please try again.');
            }
            console.log("The user could not be created", err);
        }
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={submitHandler}>
                <FormInput label='Name' type='text' required onChange={changeHandler} name='displayName' value={displayName}/>

                <FormInput label='Email' type='email' required onChange={changeHandler} name='email' value={email} />

                <FormInput label='Password' type='password' required onChange={changeHandler} name='password' value={password} />

                <FormInput label='Confirm password' type='password' required onChange={changeHandler} name='confirmPassword' value={confirmPassword} />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
}

export default SignupForm;