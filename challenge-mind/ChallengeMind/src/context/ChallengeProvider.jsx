import { useState, useEffect, createContext } from "react";
import AxiosClient from "../config/AxiosClient";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ChallengeContext = createContext();

const ChallengeProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [team, setTeam] = useState({});
    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName]= useState({})
    const [account, setAccount] = useState({});
    const [accounts, setAccounts] = useState({});
    const [alert, setAlert] = useState({});
    const navigate = useNavigate();
    const { auth } = useAuth();

    const getConfig = () => {
        const token = localStorage.getItem("token");
        if (!token) return null;
        return {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
    };

    useEffect(() => {
        getAccounts();
    }, [auth]);

    const showAlert = (alert) => {
        setAlert(alert);
        setTimeout(() => {
            setAlert({});
        }, 5000);
    };

    const closeSession = () => {
        setMetrics([]);
        setAlert({});
    };

    const getUser = async (id) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.get(`/User/?Id=${id}`, config);
            setUser(data);
            navigate("/dashboard/MyProfile");
            setAlert({});
        } catch (error) {
            navigate("/dashboard");
            setAlert({
                msg: error.response.data.msg,
                error: true,
            });
        } finally {
        }
    };

    const getUserData = async (id) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.get(`/User/?id=${id}`, config);
            setUser(data);
            navigate("/dashboard/Users/EditAddUser");
            setAlert({});
        } catch (error) {
            navigate("/dashboard");
            setAlert({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };

    const getUsers = async () => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.get("/Users", config);
            setUsers(data);
            setAlert({});
        } catch (error) {
            console.log(error);
        }
    };

    const submitUser = async (user) => {
        if (user.userId) {
            await updateUser(user);
        } else {
            await newUser(user);
        }
    };

    const newUser = async (user) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.post("/User", user, config);
            setAlert({
                msg: "User created",
                error: false,
            });
            setAlert({});
            getUsers();
            navigate("/dashboard/Users");
        } catch (error) {
            console.log(error);
        }
    };

    const updateUser = async (user) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.put(`/User`, user, config);
            setAlert({
                msg: "User updated",
                error: false,
            });
            setAlert({});
            getUsers();
            navigate("/dashboard/Users");
        } catch (error) {
            console.log(error);
        }
    };

    const deleteUser = async (user) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.delete(
                `/User/?userId=${user}`,
                config
            );
            setAlert({
                msg: data.msg,
                error: false,
            });
            setAlert({});
            getUsers();
            navigate("/dashboard/Users");
        } catch (error) {
            console.log(error);
        }

    };
    // Teams
    const getTeam = async (id) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.get(`/Team/?teamId=${id}`, config);
            setTeam(data);
            navigate("/dashboard/Teams/EditAddTeams");
            setAlert({});
        } catch (error) {
            navigate("/dashboard");
            setAlert({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };

    const getTeamName = async (id) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.get(`/Team/?teamId=${id}`, config);
            setTeamName(data);
            setAlert({});
        } catch (error) {
            navigate("/dashboard");
            setAlert({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };

    const getTeams = async () => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.get("/Teams", config);
            setTeams(data);
            setAlert({});
        } catch (error) {
            console.log(error);
        }
    };

    const submitTeam = async (team) => {
        if (team.teamId) {
            await updateTeam(team);
        } else {
            await newTeam(team);
        }
    };

    const newTeam = async (team) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.post("/Team", team, config);
            setAlert({
                msg: "Team created",
                error: false,
            });
            setAlert({});
            getTeams();
            navigate("/dashboard/Teams");
        } catch (error) {
            console.log(error);
        }
    };

    const updateTeam = async (team) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.put(`/Team`, team, config);
            setAlert({
                msg: "Team updated",
                error: false,
            });
            setAlert({});
            getTeams();
            navigate("/dashboard/Teams");
        } catch (error) {
            console.log(error);
        }
    };

    const deleteTeam = async (team) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.delete(`/Team/?teamId=${team}`, config);
            setAlert({
                msg: data.msg,
                error: false,
            });
            setAlert({});
            getTeams();
            navigate("/dashboard/Teams");
        } catch (error) {
            console.log(error);
        }
    };
    const getAccount = async (id) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.get(`/Account/?accountId=${id}`, config);
            setAccount(data);
            navigate("/dashboard/Accounts/EditAddAccounts");
            setAlert({});
        } catch (error) {
            navigate("/dashboard");
            setAlert({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };
    
    const getAccounts = async () => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.get("/Accounts", config);
            setAccounts(data);
            setAlert({});
        } catch (error) {
            console.log(error);
        }
    };
    
    const submitAccount = async (account) => {
        if (account.accountId) {
            await updateAccount(account);
        } else {
            await newAccount(account);
        }
    };
    
    const newAccount = async (account) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.post("/Account", account, config);
            setAlert({
                msg: "Account created",
                error: false,
            });
            setAlert({});
            getAccounts();
            navigate("/dashboard/Accounts");
        } catch (error) {
            console.log(error);
        }
    };
    
    const updateAccount = async (account) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.put(`/Account`, account, config);
            setAlert({
                msg: "Account updated",
                error: false,
            });
            setAlert({});
            getAccounts();
            navigate("/dashboard/Accounts");
        } catch (error) {
            console.log(error);
        }
    };
    
    const deleteAccount = async (account) => {
        try {
            const config = getConfig();
            if (!config) return;
            const { data } = await AxiosClient.delete(`/Account/?accountId=${account}`, config);
            setAlert({
                msg: data.msg,
                error: false,
            });
            setAlert({});
            getAccounts();
            navigate("/dashboard/Accounts");
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <ChallengeContext.Provider
            value={{
                user,
                setUser,
                getUser,
                getUserData,
                deleteUser,
                submitUser,
                users,
                setUsers,
                getUsers,
                team,
                setTeam,
                getTeam,
                getTeamName,
                teamName,
                teams,
                setTeams,
                getTeams,
                submitTeam,
                deleteTeam,
                account,
                setAccount,
                getAccount,
                accounts,
                setAccounts,
                getAccounts,
                submitAccount,
                deleteAccount,
                alert,
                showAlert,
                closeSession,
            }}
        >
            {children}
        </ChallengeContext.Provider>
    );
};

export { ChallengeProvider }

export default ChallengeContext;