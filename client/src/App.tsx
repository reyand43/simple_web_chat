import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { CLIENT_URL } from './const/CLIENT_URL';
import AuthContainer from './containers/AuthContainer/AuthContainer';
import ChatContainer from './containers/ChatContainer/ChatContainer';
import { SocketContextProvider } from './context/SocketContext';
import AuthHOC from './hoc/AuthHoc';
import MessagesHOC from './hoc/MessagesHOC';
import UsersHOC from './hoc/UsersHOC';
import { store } from './store';
import './styles/styles.scss';

function App() {
  return (
    <Provider store={store}>
      <SocketContextProvider>
        <Router>
          <AuthHOC>
            <UsersHOC>
              <MessagesHOC>
                <Routes>
                  <Route path={CLIENT_URL.INDEX} element={<AuthContainer />} />
                  <Route
                    path={CLIENT_URL.CHAT}
                    element={<ChatContainer />}
                  />
                </Routes>
              </MessagesHOC>
            </UsersHOC>
          </AuthHOC>
        </Router>
      </SocketContextProvider>
    </Provider>
  );
}

export default App;
