import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import EditTeamComp from '../components/EditTeamComp';
import ChallengeContext from '../context/ChallengeProvider';
import AuthContext from '../context/AuthProvider';

const renderWithProviders = (component) => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={{ auth: { isSU: false } }}>
          <ChallengeContext.Provider
            value={{
              team: {
                teamId: 1,
                name: 'Team A',
                accountId: 1,
              },
              accounts: [
                {
                  accountId: 1,
                  name: 'Account A',
                  userId: 1,
                },
                {
                  accountId: 2,
                  name: 'Account B',
                  userId: 2,
                },
              ],
              submitTeam: jest.fn(),
              getAccounts: jest.fn(),
            }}
          >
            <ThemeProvider theme={createTheme()}>{component}</ThemeProvider>
          </ChallengeContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
    );
    
  };

  describe('EditTeamComp', () => {
    it('renders the EditTeamComp form correctly', () => {
      renderWithProviders(<EditTeamComp />);
      expect(screen.getByText('Team')).toBeInTheDocument();
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Choose account' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
    });
  
  });
  