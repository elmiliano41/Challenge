import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import EditUserComp from '../components/EditUserComp';
import ChallengeContext from '../context/ChallengeProvider'

jest.mock('../Styles/ProfileStyles.css', () => '')

const renderWithProviders = (component, setAuth) => {
    return render(
        <BrowserRouter>
    <AuthContext.Provider value={{ setAuth, auth: { isSU: false }}}>
    <ChallengeContext.Provider value={{       
        user: { 
          userId: 1, 
          name: 'John Doe',
          email: 'john.doe@example.com', 
          password: 'password123' 
        },
        submitUser: jest.fn(),
        getTeams: jest.fn(),
        teams: [  {
            "teamId": 1,
            "name": "testA",
            "accountId": 1
          },
          {
            "teamId": 2,
            "name": "testB",
            "accountId": 2
          }
        ]
      }}>
        {component}
      </ChallengeContext.Provider>
    </AuthContext.Provider>
        </BrowserRouter>
    );
}

describe('EditUserComp', () => {
    it('renders the EditUserComp form correctly', () => {
        renderWithProviders(<EditUserComp />);
        expect(screen.getByText('User Profile')).toBeInTheDocument();
        expect(screen.getByTestId('name')).toBeInTheDocument();
        expect(screen.getByTestId('email')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('englishLevelId')).toBeInTheDocument();
        expect(screen.getByTestId('technicalKnowledge')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
    });

    // it('handles user input and form submission', async () => {
    //     const setAuthMock = jest.fn();
    //     renderWithProviders(<EditUserComp />, setAuthMock);
    //     const emailInput = await screen.findByTestId('email-input');
    //     const passwordInput = await screen.findByTestId('password-input');
    //     const signInButton = screen.getByRole('button', { name: 'Sign In' });

    //     await userEvent.type(emailInput, 'rog_ramos@example.com');
    //     await userEvent.type(passwordInput, 'rog_ramos');

    //     fireEvent.click(signInButton);

    // });
});