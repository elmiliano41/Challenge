import React from 'react';
import '../Styles/DashboardStyles.css';
import useAuth from "../hooks/useAuth";

const DashboardComponent = () => {
    const { auth } = useAuth();

    return (
        <div className='dashboard'>
            <div className="dashboard-container">
                {auth.isSU == true ? (
                    <>
                        <h1 className="welcome-message">Welcome Chief!</h1>
                        <p className="info-message">
                            You can manage users, accounts and teams, the options are in the header.
                        </p>
                    </>
                ) : (
                    <><h1 className="welcome-message">Welcome!</h1><p className="info-message">
                        You can view your personal data if you click on your profile icon.
                    </p></>
                )}
            </div>
        </div>
    );
};

export default DashboardComponent;

