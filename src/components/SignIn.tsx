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
      <Button
      size='large'
      onClick={SignInWithGoogle}
      style={{ marginLeft:'auto', marginRight:'auto', display:'block', marginTop:'50vh', color:'#ffff', backgroundColor:'#c5e1a5'}}
      >ログイン</Button>
    </div>
  )
}