import { Button } from '@mui/material'
import { auth } from '../firebase'

export const SignOut = () => {
  return (
    <div>
      <Button
      onClick={()=>auth.signOut()}
      style={{ marginLeft:'auto', marginRight:'auto', display:'block', color:'#ffff', backgroundColor:'#e59fad'}}
      >サインアウト</Button>
    </div>
  )
}