import { useConfig } from "../../contexts/ConfigContext";

const TestPage = () => {
  const { auth, callback, websocket, clientId, clientSecret } = useConfig();
  return (
    <div>
      <ul>
        <li>Auth : {auth}</li>
        <li>Callback : {callback}</li>
        <li>Websocket : {websocket}</li>
        <li>Client ID : {clientId}</li>
        <li>Client Secret : {clientSecret}</li>
      </ul>
    </div>
  );
};

export default TestPage;
