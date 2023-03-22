import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditAccountComp from './EditAccountComp';

jest.mock('../hooks/useChallenge', () => ({
  __esModule: true,
  default: () => ({
    getUsers: jest.fn(),
    submitAccount: jest.fn(),
    account: {
      "accountId": 1,
      "name": "testing",
      "clientName": "testAccounts",
      "operationsManager": 2,
      "createdDate": "2023-02-21T16:31:35.972Z"
    },
    users: [  {
      "userId": 2,
      "name": "test",
      "email": "test@test.com",
      "password": "testing123",
      "cv": "https://jestjs.io/es-ES/docs/next/getting-started",
      "technicalKnowledge": "C# and React",
      "isAdmin": true,
      "isSU": false,
      "englishLevelId": 1,
      "teamId": 2
    },{
      "userId": 3,
      "name": "testeo",
      "email": "tester@test.com",
      "password": "testing123",
      "cv": "https://jestjs.io/es-ES/docs/next/getting-started",
      "technicalKnowledge": "C# and React",
      "isAdmin": false,
      "isSU": false,
      "englishLevelId": 5,
      "teamId": 1
    }
  ],
  }),
}));

test('renders EditAccountComp', () => {
  render(<EditAccountComp />);
  expect(screen.getByText('Account')).toBeInTheDocument();
});

test('allows user to fill input fields', async () => {
  render(<EditAccountComp />);
  const nameInput = screen.getByTestId('name');
  const clientNameInput = screen.getByTestId('clientName');

  userEvent.type(nameInput, 'Account Name');
  userEvent.type(clientNameInput, 'Client Name');

  expect(nameInput).toHaveValue('Account Name');
  expect(clientNameInput).toHaveValue('Client Name');
});

test('opens modal when "Choose user" button is clicked', async () => {
  render(<EditAccountComp />);
  const chooseUserButton = screen.getByText('Choose user');

  fireEvent.click(chooseUserButton);

  await waitFor(() => {
    expect(screen.getByText('Select user')).toBeInTheDocument();
  });
});

test('submits the form correctly', async () => {
  const { submitAccount } = require('../hooks/useChallenge');
  render(<EditAccountComp />);
  const nameInput = screen.getByTestId('name');
  const clientNameInput = screen.getByTestId('clientName');
  const saveChangesButton = screen.getByText('Save Changes');

  userEvent.type(nameInput, 'Account Name');
  userEvent.type(clientNameInput, 'Client Name');
  userEvent.click(saveChangesButton);

  await waitFor(() => {
    expect(submitAccount).toHaveBeenCalledTimes(1);
    expect(submitAccount).toHaveBeenCalledWith({
      accountId: 0,
      name: 'Account Name',
      clientName: 'Client Name',
      operationsManager: '',
    });
  });
})
