import { act } from 'react-dom/test-utils';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import AuthContext from '../context/AuthProvider';
import EditAccountComp from '../components/EditAccountComp';
import React from 'react';

describe('EditAccountComp', () => {
    it('renders the form correctly', async () => {
      const { getByLabelText, getByText, getByRole } = render(
        <BrowserRouter>
          <EditAccountComp />
        </BrowserRouter>
      );
  
      expect(getByLabelText('Name')).toBeInTheDocument();
      expect(getByLabelText('Client Name')).toBeInTheDocument();
      expect(getByRole('button', { name: 'Choose user' })).toBeInTheDocument();
      expect(getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
    });
  
    it('handles form submission with valid data', async () => {
      const { getByLabelText, getByRole } = render(
        <ThemeProvider theme={createTheme()}>
          <AuthContext.Provider value={{ setAuth: jest.fn() }}>
            <BrowserRouter>
              <EditAccountComp />
            </BrowserRouter>
          </AuthContext.Provider>
        </ThemeProvider>
      );
  
      await act(async () => {
        userEvent.type(getByLabelText('Name'), 'Test Account');
        userEvent.type(getByLabelText('Client Name'), 'Test Client');
        fireEvent.click(getByRole('button', { name: 'Choose user' }));
        await screen.findByText('Accounts list');
        fireEvent.click(screen.getByRole('checkbox'));
        fireEvent.click(screen.getByRole('button', { name: 'OK' }));
        fireEvent.click(getByRole('button', { name: 'Save Changes' }));
      });
  
      expect(screen.getByText('Select user')).not.toBeInTheDocument();
    });
  
    it('displays an error message for missing required fields', async () => {
      const { getByLabelText, getByRole, findByText } = render(
        <ThemeProvider theme={createTheme()}>
          <AuthContext.Provider value={{ setAuth: jest.fn() }}>
            <BrowserRouter>
              <EditAccountComp />
            </BrowserRouter>
          </AuthContext.Provider>
        </ThemeProvider>
      );
  
      await act(async () => {
        fireEvent.click(getByRole('button', { name: 'Save Changes' }));
      });
  
      expect(await findByText('Account name is required')).toBeInTheDocument();
      expect(await findByText('Client name  is required')).toBeInTheDocument();
      expect(await findByText('Choose an manager')).toBeInTheDocument();
    });
  });
  