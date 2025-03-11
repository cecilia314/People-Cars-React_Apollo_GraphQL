import { useState } from 'react';
import Title from '../layout/Title';
import People from '../lists/People';
import AddPerson from '../forms/AddPerson';
import AddCar from '../forms/AddCar';

const Home = () => {
  const styles = getStyles();
  const [showAddCar, setShowAddCar] = useState(true);
  return (
    <div className="App" style={styles.main}>
      <Title />

      <AddPerson />
      {showAddCar && <AddCar />}
      <People onPeopleFetched={(isEmpty) => setShowAddCar(!isEmpty)} />
    </div>
  );
};

const getStyles = () => ({
  main: {
    display: 'grid',
    margin: '36px auto',
    width: '90%',
    border: '2px solid black',
  },
});
export default Home;
