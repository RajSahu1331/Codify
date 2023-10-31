import './App.css';
import { UserContextProvider } from './context/userContext';
import CodeEditorWindow from './pages/CodeEditorWindow';
import { Route, Routes } from 'react-router-dom';
import Navabr from './components/Navabr';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'
import AddProblemPage from './pages/AddProblemPage.tsx';
import AllProblems from './pages/AllProblems';
import {Toaster} from 'react-hot-toast'
import Submission from './pages/Submission';

const App = () => {


    return (
       <UserContextProvider>
       <Navabr />
       <Toaster position='top-center' toastOptions={{duration:2000}} />
       <Routes>
       <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/problems' element={<AllProblems />} />
        <Route path="/problems/:slug" element={<CodeEditorWindow />} />
        <Route path="/submission" element={<Submission />} />
        <Route path='/add' element={<AddProblemPage />} />
       </Routes>
    </UserContextProvider>
    )

}
export default App;