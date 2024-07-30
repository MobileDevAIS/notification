import { signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../firebase/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import GoogleButton from "react-google-button";

const Login = ({ onLogin }: any) => {
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);

      // Check if the user exists in Firestore
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        // If user doesn't exist, create a new user in Firestore
        await setDoc(userDoc, {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        });
      }

      return user;
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const handleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      onLogin(user);
    }
  };


  return (
    <div className="login">
      <div className="text-center">
        <h1 className="text-primary">Google Login with Firebase</h1>
        <div className="google-btn">
          <GoogleButton onClick={handleLogin} className="btn btn-primary">
            Sign in with Google
          </GoogleButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
