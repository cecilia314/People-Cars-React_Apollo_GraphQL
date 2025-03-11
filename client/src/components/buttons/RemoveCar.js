import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { REMOVE_CAR } from '../../graphql/queries';

const RemoveCar = ({ id, personId }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      cache.modify({
        id: cache.identify({ __typename: 'Person', id: removeCar.personId }),
        fields: {
          cars(existingCars = [], { readField }) {
            return existingCars.filter(
              (carRef) => readField('id', carRef) !== removeCar.id
            );
          },
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this car?');

    if (result) {
      removeCar({
        variables: { id, personId },
      });
    }
  };

  return (
    <DeleteOutlined
      onClick={handleButtonClick}
      key="delete"
      style={{ color: 'red' }}
    />
  );
};

export default RemoveCar;
