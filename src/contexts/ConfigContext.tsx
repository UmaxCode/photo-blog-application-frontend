import React, { createContext, useContext, useEffect, useState } from "react";
import { SSMClient, GetParameterCommand } from "@aws-sdk/client-ssm";

const client = new SSMClient({
  region: import.meta.env.VITE_region,
  credentials: {
    accessKeyId: import.meta.env.VITE_secret_id,
    secretAccessKey: import.meta.env.VITE_secret_key,
  },
});

interface Config {
  auth: string;
  callback: string;
  websocket: string;
  clientId: string;
  clientSecret: string;
}

const ConfigContext = createContext<Config | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [config, setConfig] = useState<Config | null>(null);

  async function getSSMParameter(parameterName: string) {
    try {
      const command = new GetParameterCommand({
        Name: parameterName,
        WithDecryption: true, // Ensures decrypted values
      });
      const response = await client.send(command);
      return response.Parameter?.Value || null;
    } catch (error) {
      console.error(`Error fetching parameter ${parameterName}:`, error);
      return null;
    }
  }

  useEffect(() => {
    const fetchConfig = async () => {
      const [
        auth_endpoint,
        callback_endpoint,
        websocket_endpoint,
        client_id,
        client_secret,
      ] = await Promise.all([
        getSSMParameter("/photoblog/auth_endpoint"),
        getSSMParameter("/photoblog/callback_endpoint"),
        getSSMParameter("/photoblog/websocket_endpoint"),
        getSSMParameter("/photoblog/client_id"),
        getSSMParameter("/photoblog/client_secret"),
      ]);

      setConfig({
        auth: auth_endpoint || "",
        callback: callback_endpoint || "",
        websocket: websocket_endpoint || "",
        clientId: client_id || "",
        clientSecret: client_secret || "",
      });
    };

    fetchConfig();
  }, []);

  if (!config) {
    return <div>Loading configuration...</div>;
  }

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = (): Config => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
