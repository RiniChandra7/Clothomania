import LoginForm from "../login-form/login-form.component";
import SignupForm from "../signup-form/sign-up-form.component";
import './sign-in.styles.scss';
const Signin = () => {
    return <div className="authentication-container">
        <SignupForm />
        <LoginForm />
    </div>
}

export default Signin;