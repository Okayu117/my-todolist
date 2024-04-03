import './App.css';
import SignIn from './components/SignIn';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth }  from './firebase';
import Todo from './components/Todo';



function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      {user ? <Todo /> : <SignIn />}
    </div>
  );
}

export default App;
