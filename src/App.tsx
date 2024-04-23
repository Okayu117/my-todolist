import { SignIn } from './components/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth }  from './firebase';
import { TodoList } from './components/TodoList';



function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      {user ? <TodoList /> : <SignIn />}
    </div>
  );
}

export default App;
