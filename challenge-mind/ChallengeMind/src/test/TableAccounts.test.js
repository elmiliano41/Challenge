import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import TableAccounts from '../components/TableAccounts';
import ChallengeContext from '../context/ChallengeProvider';

const renderWithProviders = (component) => {
    return render(
      <BrowserRouter>
        <ChallengeContext.Provider
          value={{
            accounts: [
              {
                accountId: 1,
                name: 'Account A',
                operationsManager: 'Manager A',
                clientName: 'Client A',
              },
              {
                accountId: 2,
                name: 'Account B',
                operationsManager: 'Manager B',
                clientName: 'Client B',
              },
            ],
            deleteAccount: jest.fn(),
            setAccount: jest.fn(),
            getAccount: jest.fn(),
            getAccounts: jest.fn(),
          }}
        >
          <ThemeProvider theme={createTheme()}>{component}</ThemeProvider>
        </ChallengeContext.Provider>
      </BrowserRouter>
    );
  };

  describe('TableAccounts', () => {
    it('renders the TableAccounts component correctly', () => {
      renderWithProviders(<TableAccounts />);
      expect(screen.getByText('Add Account')).toBeInTheDocument();
    });
  
    it('renders table with the correct columns', () => {
      renderWithProviders(<TableAccounts />);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Manager')).toBeInTheDocument();
      expect(screen.getByText('Client')).toBeInTheDocument();
      expect(screen.getByText('Edit')).toBeInTheDocument();
      expect(screen.getByText('Delete')).toBeInTheDocument();
    });
  
    it('renders table with the correct data', () => {
      renderWithProviders(<TableAccounts />);
      expect(screen.getByText('Account A')).toBeInTheDocument();
      expect(screen.getByText('Manager A')).toBeInTheDocument();
      expect(screen.getByText('Client A')).toBeInTheDocument();
      expect(screen.getByText('Account B')).toBeInTheDocument();
      expect(screen.getByText('Manager B')).toBeInTheDocument();
      expect(screen.getByText('Client B')).toBeInTheDocument();
    });
  
  });
  