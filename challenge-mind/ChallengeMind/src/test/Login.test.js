import React from 'react';
import { render, screen, fireEvent, waitFor,act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import LoginComponent from '../components/LoginComponent';
import AuthContext from '../context/AuthProvider';
import AxiosClient from '../config/AxiosClient';

const mockedAxiosClient = {
  ...AxiosClient,
  post: jest.fn().mockResolvedValue({
    data: {
      userToken: 'mocked_token',
      user: { id: 'mocked_user_id', name: 'Mocked User' },
    },
  }),
};

const renderWithProviders = (component, setAuth, axiosInstance) => {
  const theme = createTheme();
  return render(
      <BrowserRouter>
    <AuthContext.Provider value={{ setAuth }}>
        <ThemeProvider theme={theme}>
          {React.cloneElement(component, { axiosInstance })}
        </ThemeProvider>
    </AuthContext.Provider>
      </BrowserRouter>
  );
};

jest.mock('../hooks/useAuth', () => {
  const originalModule = jest.requireActual('../hooks/useAuth');
  return {
    __esModule: true,
    ...originalModule,
    default: () => ({
      setAuth: jest.fn(),
    }),
  };
});

describe('Login', () => {

  it("renders the LoginComponent correctly", () => {
    render(
      <BrowserRouter>
        <LoginComponent />
      </BrowserRouter>
    );
  });

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

  // test('Successful login', async () => {
  //   // Mock the function that handles a successful login
  //   const handleLogin = jest.fn();
  
  //   // Render the Login component with the mocked function
  //   render(<LoginComponent onLogin={handleLogin} />);
  
  //   // Fill in the email and password fields
  //   fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
  //   fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'test-password' } });
  
  //   // Click the submit button
  //   await act(async () => {
  //     fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
  //   });
  
  //   // Check that the handleLogin function has been called
  //   expect(handleLogin).toHaveBeenCalled();
  // });
  
});
