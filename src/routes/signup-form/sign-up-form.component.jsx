import { useState } from "react";

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

    return (
        <div>
            <h1>Sign up with your email and password</h1>
            <form>
                <label>Name</label>
                <input type='text' required onChange={changeHandler} name='displayName' value={displayName}/>

                <label>Email</label>
                <input type='email' required onChange={changeHandler} name='email' value={email} />

                <label>Password</label>
                <input type='password' required onChange={changeHandler} name='password' value={password} />

                <label>Confirm password</label>
                <input type='password' required onChange={changeHandler} name='confirmPassword' value={confirmPassword} />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignupForm;