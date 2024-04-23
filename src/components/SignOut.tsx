import { Button } from '@mui/material'
import { auth } from '../firebase'

export const SignOut = () => {
  return (
    <div>
      <Button onClick={()=>auth.signOut()}>サインアウト</Button>
    </div>
  )
}