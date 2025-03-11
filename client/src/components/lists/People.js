import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PEOPLE } from '../../graphql/queries';
import { List, Divider } from 'antd';
import PersonCard from '../listItems/PersonCard';

const People = ({ onPeopleFetched }) => {
  const styles = getStyles();
  const { loading, error, data } = useQuery(GET_PEOPLE);

  useEffect(() => {
    if (data) {
      onPeopleFetched(data.people.length === 0);
    }
  }, [data, onPeopleFetched]);

  if (loading) return 'loading ...';
  if (error) return `Error! ${error.message}`;

  console.log(`data: `, data);

  return (
    <div className="cardContainer">
      <Divider style={{ fontWeight: 'bold', fontSize: '18px' }}>
        Records
      </Divider>
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {data.people.map(({ id, firstName, lastName, cars }) => (
          <List.Item key={id}>
            <PersonCard
              id={id}
              firstName={firstName}
              lastName={lastName}
              cars={cars}
            />
          </List.Item>
        ))}
      </List>
    </div>
  );
};

const getStyles = () => ({
  list: {},
});

export default People;
