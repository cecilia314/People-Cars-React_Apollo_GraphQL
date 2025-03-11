import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Card, List, Divider, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { GET_PERSON } from '../../graphql/queries';

export const ShowPage = () => {
  const styles = getStyles();
  const { id } = useParams();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_PERSON, {
    variables: { id: id },
  });

  if (loading) return 'loading ...';
  if (error) return `Error! ${error.message}`;

  return (
    <div style={styles.main}>
      <h2>
        {data.person.firstName} {data.person.lastName}
      </h2>
      {!data.person.cars || data.person.cars.length === 0 ? (
        <p>Sorry! There are no cars for this person</p>
      ) : (
        <div className="carCardsContainer" style={styles.cardsContainer}>
          <Divider style={{ fontWeight: 'bold', fontSize: '18px' }}>
            Cars
          </Divider>
          <List
            grid={{ gutter: 16, column: 4 }}
            dataSource={data.person.cars}
            renderItem={(item) => (
              <List.Item>
                <Card title={`${item.make} ${item.model}`}>
                  <ul>
                    <li>Year: {item.year}</li>
                    <li>Price: ${item.price.toLocaleString('en-US')}</li>
                  </ul>
                </Card>
              </List.Item>
            )}
          />
        </div>
      )}

      <Button
        type="primary"
        icon={<ArrowLeftOutlined />}
        style={styles.backBtn}
        onClick={() => navigate('/')}
      >
        Go back Home
      </Button>
    </div>
  );
};

const getStyles = () => ({
  main: {
    display: 'grid',
    margin: 'auto',
    marginTop: '24px',
    marginBottom: '24px',
    width: '90%',
  },
  backBtn: {
    width: '200px',
  },
  cardsContainer: {
    padding: '24px 0px',
  },
});
