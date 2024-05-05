import { SignIn } from './components/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth }  from './firebase';
import { TodoList } from './components/TodoList';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';



function App() {
  const [user] = useAuthState(auth);
  return (
    <ThemeProvider theme={theme}>
      {user ? <TodoList /> : <SignIn />}
    </ThemeProvider>
  );
}

export default App;
