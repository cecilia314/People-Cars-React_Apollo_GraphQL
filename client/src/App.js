import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './App.css';
import Title from './components/layout/Title';
import People from './components/lists/People';
import AddPerson from './components/forms/AddPerson';
import AddCar from './components/forms/AddCar';
import { useState } from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const styles = getStyles();
  const [showAddCar, setShowAddCar] = useState(true);
  return (
    <ApolloProvider client={client}>
      <div className="App" style={styles.main}>
        <Title />
        <AddPerson />
        {showAddCar && <AddCar />}
        <People onPeopleFetched={(isEmpty) => setShowAddCar(!isEmpty)} />
      </div>
    </ApolloProvider>
  );
};

const getStyles = () => ({
  main: {
    display: 'grid',
    margin: 'auto',
    marginTop: '24px',
    marginBottom: '24px',
    width: '90%',
    border: '2px solid black',
  },
});
export default App;
