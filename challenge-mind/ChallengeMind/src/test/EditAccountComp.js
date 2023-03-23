import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import EditAccountComp from '../components/EditAccountComp';
import useChallenge from '../hooks/useChallenge';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../hooks/useChallenge', () => ({
  __esModule: true,
  default: () => ({
    account: {},
    getUsers: jest.fn(),
    submitAccount: jest.fn(),
    users: [],
  }),
}));

const renderWithProviders = (component) => {
  const theme = createTheme();
  return render(
    <BrowserRouter>
    <ThemeProvider theme={theme}>{component}</ThemeProvider>
    </BrowserRouter>
  );
};

describe('EditAccountComp', () => {
  it('renders the account form correctly', async () => {
    act(() => {
      renderWithProviders(<EditAccountComp />);
    });
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Client Name')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Choose user' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Changes' })).toBeInTheDocument();
  });

  it('displays an error message for missing required fields', async () => {
    const mockSubmitAccount = jest.fn();
    useChallenge.mockImplementation(() => ({
      account: {},
      getUsers: jest.fn(),
      submitAccount: mockSubmitAccount,
      users: [],
    }));

    act(() => {
      renderWithProviders(<EditAccountComp />);
    });

    const saveButton = screen.getByRole('button', { name: 'Save Changes' });

    act(() => {
      fireEvent.click(saveButton);
    });

    expect(screen.getByText('Account name is required')).toBeInTheDocument();
    expect(screen.getByText('Client name  is required')).toBeInTheDocument();
    expect(screen.getByText('Choose an manager')).toBeInTheDocument();
    expect(mockSubmitAccount).not.toHaveBeenCalled();
  });

  it('handles user input and form submission', async () => {
    const mockSubmitAccount = jest.fn();
    useChallenge.mockImplementation(() => ({
      account: {},
      getUsers: jest.fn(),
      submitAccount: mockSubmitAccount,
      users: [{ userId: 1, name: 'User 1' }, { userId: 2, name: 'User 2' }],
    }));

    act(() => {
      renderWithProviders(<EditAccountComp />);
    });

    const nameInput = screen.getByLabelText('Name');
    const clientNameInput = screen.getByLabelText('Client Name');
    const chooseUserButton = screen.getByRole('button', { name: 'Choose user' });
    const saveButton = screen.getByRole('button', { name: 'Save Changes' });

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'Test account' } });
      fireEvent.change(clientNameInput, { target: { value: 'Test client' } });
      fireEvent.click(chooseUserButton);
    });

    const user1 = screen.getByText('User 1');
    act(() => {
      fireEvent.click(user1);
    });

    expect(screen.getByDisplayValue('User 1')).toBeInTheDocument();

    act(() => {
      fireEvent.click(saveButton);
    });

    expect(mockSubmitAccount).toHaveBeenCalledTimes(1);
    expect(mockSubmitAccount).toHaveBeenCalledWith({
      accountId: '',
      name: 'Test account',
      clientName: 'Test client',
      operationsManager: '1',
    });
  });
});
