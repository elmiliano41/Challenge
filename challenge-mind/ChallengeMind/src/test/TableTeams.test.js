import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import ChallengeContext from '../context/ChallengeProvider';
import TableTeams from '../components/TableTeams';

const renderWithProviders = (component) => {
    return render(
        <BrowserRouter>
            <ChallengeContext.Provider value={{
                teams: [
                    { teamId: 1, name: 'testA', accountId: 1 },
                    { teamId: 2, name: 'testB', accountId: 2 },
                ],
                deleteTeam: jest.fn(),
                getTeams: jest.fn(),
                setTeam: jest.fn(),
                getTeam: jest.fn(),
            }}>
                {component}
            </ChallengeContext.Provider>
        </BrowserRouter>
    );
}

describe('TableTeams', () => {
    it('renders the TableTeams component correctly', () => {
        renderWithProviders(<TableTeams />);
        expect(screen.getByRole('button', { name: 'Add Team' })).toBeInTheDocument();
    });

});
