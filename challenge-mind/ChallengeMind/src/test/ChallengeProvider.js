import { mount } from 'enzyme';
import React from 'react';
import { ChallengeProvider } from './ChallengeProvider';
import AxiosClient from '../config/AxiosClient';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ChallengeContext from '../context/ChallengeProvider';

jest.mock('../config/AxiosClient');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));
jest.mock('../hooks/useAuth');

describe('ChallengeProvider', () => {
  let wrapper;
  let mockUseAuth;

  beforeEach(() => {
    mockUseAuth = jest.fn().mockReturnValue({
      auth: true,
    });
    useAuth.mockReturnValue({
      auth: true,
    });
    AxiosClient.get.mockResolvedValue({ data: {} });
    wrapper = mount(
      <ChallengeProvider>
        <div />
      </ChallengeProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should render children', () => {
    expect(wrapper.find('div').exists()).toBeTruthy();
  });

  it('should set user', async () => {
    const setUser = jest.fn();
    ChallengeContext.useContext = jest.fn().mockReturnValue({ setUser });
    const user = { id: 1 };
    AxiosClient.get.mockResolvedValue({ data: user });
    await wrapper.find(ChallengeContext.Provider).prop('value').getUser(1);
    expect(setUser).toHaveBeenCalledWith(user);
  });

  it('should set users', async () => {
    const setUsers = jest.fn();
    ChallengeContext.useContext = jest.fn().mockReturnValue({ setUsers });
    const users = [{ id: 1 }, { id: 2 }];
    AxiosClient.get.mockResolvedValue({ data: users });
    await wrapper.find(ChallengeContext.Provider).prop('value').getUsers();
    expect(setUsers).toHaveBeenCalledWith(users);
  });

  it('should set team', async () => {
    const setTeam = jest.fn();
    ChallengeContext.useContext = jest.fn().mockReturnValue({ setTeam });
    const team = { id: 1 };
    AxiosClient.get.mockResolvedValue({ data: team });
    await wrapper.find(ChallengeContext.Provider).prop('value').getTeam(1);
    expect(setTeam).toHaveBeenCalledWith(team);
  });

  it('should set team name', async () => {
    const setTeamName = jest.fn();
    ChallengeContext.useContext = jest.fn().mockReturnValue({ setTeamName });
    const team = { id: 1, name: 'Team 1' };
    AxiosClient.get.mockResolvedValue({ data: team });
    await wrapper
      .find(ChallengeContext.Provider)
      .prop('value')
      .getTeamName(1);
    expect(setTeamName).toHaveBeenCalledWith(team.name);
  });

});