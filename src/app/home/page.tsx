import React from 'react';
import RouteGuard from '../../components/RouteGuard';
import LogoutButton from '../../components/LogoutButton';
const HomePage: React.FC = () => {
  return (
    <RouteGuard>
      <div>
        <h1>Welcome to the Home Page!</h1>
        <LogoutButton />
      </div>
    </RouteGuard>
  );
};

export default HomePage;
