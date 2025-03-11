import { useState } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import Card from 'antd/es/card/Card';
import CarCard from './CarCard';
import RemovePerson from '../buttons/RemovePerson';
import UpdatePerson from '../forms/UpdatePerson';

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const { id, firstName, lastName, cars } = props;
  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div className="personCardContainer">
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          style={styles.card}
          title={`${firstName} ${lastName}`}
          actions={[
            <EditOutlined
              key="edit"
              id={id}
              firstName={firstName}
              lastName={lastName}
              onClick={handleButtonClick}
            />,
            <RemovePerson id={id} />,
          ]}
        >
          <List>
            {cars.map(({ id, year, make, model, price, personId }) => (
              <List.Item key={id}>
                <CarCard
                  id={id}
                  year={year}
                  make={make}
                  model={model}
                  price={price}
                  personId={personId}
                />
              </List.Item>
            ))}
          </List>
          <Link to={`/people/${id}`}>Learn More</Link>
        </Card>
      )}
    </div>
  );
};
const getStyles = () => ({
  card: {
    marginLeft: '48px',
    marginRight: '48px',
    marginTop: '16px',
    marginBottom: '24px',
    textAlign: 'left',
  },
});

export default PersonCard;
