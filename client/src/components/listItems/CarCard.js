import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import Card from 'antd/es/card/Card';
import RemoveCar from '../buttons/RemoveCar';
import UpdateCar from '../forms/UpdateCar';

const CarCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const { id, year, make, model, price, personId } = props;
  const styles = getStyles();

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };
  return (
    <div className="carCardContainer" style={styles.container}>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          type="inner"
          size="small"
          title={`${year} ${make} ${model} -> $ ${price.toLocaleString(
            'en-US'
          )}`}
          actions={[
            <EditOutlined
              key="edit"
              id={id}
              year={year}
              make={make}
              model={model}
              price={price}
              personId={personId}
              onClick={handleButtonClick}
            />,
            <RemoveCar id={id} personId={personId} />,
          ]}
          style={styles.innerCard}
        ></Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  container: {
    width: '100%',
  },
  innerCard: {
    width: '100%',
  },
});

export default CarCard;
