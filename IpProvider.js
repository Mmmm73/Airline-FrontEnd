import { createContext, useContext, useState } from 'react';

const IpContext = createContext();

export const IpProvider = ({ children }) => {
  const [ipAddress, setIpAddress] = useState('10.67.27.123');

  const setIp = (newIp) => {
    setIpAddress(newIp);
  };

  return (
    <IpContext.Provider value={{ ipAddress, setIp }}>
      {children}
    </IpContext.Provider>
  );
};

export const useIp = () => {
  const context = useContext(IpContext);
  if (!context) {
    throw new Error('useIp must be used within an IpProvider');
  }
  return context;
};
