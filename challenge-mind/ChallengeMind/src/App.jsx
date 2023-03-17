import Login from './pages/Login';
import AuthLayout from "./layouts/AuthLayout";
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ChallengeProvider } from './context/ChallengeProvider';
import ProtectedRoutes from "./layouts/ProtectedRoutes";
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Users } from './pages/Users';
import EditAddUser from './pages/EditAddUser';
import Teams from './pages/Teams';

function App() {
  return (
    <div
      style={{
        backgroundImage: `url("https://source.unsplash.com/random")`,
      }}
      className="App"
    >
      <BrowserRouter>
        <AuthProvider>
          <ChallengeProvider>
            <Routes>
              <Route path="/" element={<AuthLayout />}>
                <Route index element={<Login />} />
              </Route>
              <Route path="/dashboard" element={<ProtectedRoutes />}>
                <Route index element={<Dashboard />} />
              </Route>
              <Route
                path="/dashboard/MyProfile"
                element={<ProtectedRoutes />}
              >
                <Route index element={<Profile />} />
              </Route>
              <Route
                path="/dashboard/Users"
                element={<ProtectedRoutes adminOnly={true} />}
              >
                <Route index element={<Users />} />
                <Route path='/dashboard/Users/EditAddUser' element={<EditAddUser />} />
              </Route>
              <Route
                path="/dashboard/Teams"
                element={<ProtectedRoutes adminOnly={true} />}
              >
                <Route index element={<Teams />} />
                {/* <Route path='/dashboard/Teams/EditAddTeams' element={<EditAddTeams />} /> */}
              </Route>
            </Routes>
          </ChallengeProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

