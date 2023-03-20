import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';
import AuthContext from '../context/AuthProvider';


const renderWithProviders = (component, setAuth) => {
  const theme = createTheme();
  return render(
    <AuthContext.Provider value={{ setAuth }}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

jest.mock('../hooks/useAuth', () => ({
  __esModule: true,
  default: () => ({
    setAuth: jest.fn(),
  }),
}));

describe('Login', () => {
  it('renders the login form correctly', () => {
    renderWithProviders(<LoginComponent />);
    expect(screen.getByTestId('LockOutlinedIcon')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('handles user input and form submission', async () => {
    const setAuthMock = jest.fn();
    renderWithProviders(<LoginComponent />, setAuthMock);
    const emailInput = await screen.findByTestId('email-input');
    const passwordInput = await screen.findByTestId('password-input');       
    const signInButton = screen.getByRole('button', { name: 'Sign In' });

    await userEvent.type(emailInput, 'rog_ramos@example.com');
    await userEvent.type(passwordInput, 'rog_ramos');

    fireEvent.click(signInButton);

  });
});

// test('Successful login', async () => {
//   // Mock the onLogin function
//   const onLogin = jest.fn();

//   render(
//     <BrowserRouter>
//       <LoginComponent onLogin={onLogin} />
//     </BrowserRouter>
//   );

//   // Fill in the email input
//   userEvent.type(screen.getByTestId('email-input'), 'rog_ramos@commonuser.com');

//   // Fill in the password input
//   userEvent.type(screen.getByTestId('password-input'), 'password123');

//   // Click the Sign In button
//   userEvent.click(screen.getByRole('button', { name: 'Sign In' }));

//   // Check if the onLogin function has been called
//   expect(onLogin).toHaveBeenCalled();

// });