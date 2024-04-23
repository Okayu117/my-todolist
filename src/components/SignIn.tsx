import { auth } from '../firebase'
import { signInWithPopup,GoogleAuthProvider } from 'firebase/auth'
import { Button } from '@mui/material'

export const SignIn = () => {

  const SignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  }

  return (
    <div className='sign-in'>
      <Button onClick={SignInWithGoogle}>ログイン</Button>
    </div>
  )
}