import './App.css';
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu'
import Searchbar from './components/UI/Searchbar/Searchbar';
import { useReducer, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Footer from './components/Footer/Footer';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import AuthContext from './components/context/authContext';
import ReducerContext from './components/context/reducerContext';
import ThemeContext from './components/context/themeContext';
import InspiringQuote from './components/InspiringQuote/InspiringQuote';
import { initialState, reducer } from './reducer';
import Home from './pages/Homepage/Home';
import HotelDetail from './pages/HotelDetail/HotelDetail';
import Search from './pages/Search/Search';
import NotFound from './pages/404/NotFound';
import Login from './pages/Auth/Login/Login';
import AuthenticatedRoute from './components/hoc/AuthenticatedRoute';
import ErrorBoundary from './components/hoc/ErrorBoundary';
import AddHotel from './pages/Profile/MyHotels/AddHotel/AddHotel';
import EditHotel from './pages/Profile/MyHotels/EditHotel/EditHotel';
import Register from './pages/Auth/Register/Register';


const Profile = lazy(() => import('./pages/Profile/Profile'));

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);


  const header = (
    <Header>
      <InspiringQuote />
      <Searchbar />
      <ThemeButton />
    </Header>)
  const content = (
    <div>
      <ErrorBoundary>
        <Suspense fallback={<p>Ładowanie...</p>}>
          <Switch>
            <AuthenticatedRoute path="/profil/hotele/edytuj/:id" component={EditHotel} />
            <AuthenticatedRoute path="/profil/hotele/dodaj" component={AddHotel} />
            <AuthenticatedRoute path='/profil' component={Profile} />
            <Route path="/hotele/:id" component={HotelDetail} />
            <Route path="/wyszukaj/:term?" component={Search} />
            <Route path="/rejestracja" component={Register} />
            <Route path="/zaloguj" exact component={Login} />
            <Route path="/" exact component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </div>
  )
  const menu = <Menu />
  const footer = <Footer />

  return (
    <Router>
      <AuthContext.Provider value={{
        user: state.user,
        login: (user) => dispatch({ type: 'login', user }),
        logout: () => dispatch({ type: 'logout' }),
      }}>
        <ThemeContext.Provider value={{
          color: state.theme,
          changeTheme: () => dispatch({ type: 'change-theme' })
        }}>
          <ReducerContext.Provider value={{
            state: state,
            dispatch: dispatch
          }
          }>

            <Layout
              header={header}
              menu={menu}
              content={content}
              footer={footer}
            />

          </ReducerContext.Provider>
        </ThemeContext.Provider>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;
