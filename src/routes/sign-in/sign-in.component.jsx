import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import SignupForm from "../signup-form/sign-up-form.component";

const Signin = () => {
    const logUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocFromAuth(user);
    }
    
    return <div>
        <h1>Signin page</h1>
        <button onClick={logUser}>Google Sign In</button>
        <SignupForm />
    </div>
}

export default Signin;