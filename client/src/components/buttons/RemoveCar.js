import { DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@apollo/client';
import { GET_PEOPLE, REMOVE_CAR } from '../../graphql/queries';

const RemoveCar = ({ id, personId }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache) {
      const { people } = cache.readQuery({ query: GET_PEOPLE });

      cache.writeQuery({
        query: GET_PEOPLE,
        data: {
          people: people.map((person) =>
            person.id === personId
              ? {
                  ...person,
                  cars: person.cars.filter((car) => car.id !== id),
                }
              : person
          ),
        },
      });
    },
  });

  const handleButtonClick = () => {
    let result = window.confirm('Are you sure you want to delete this car?');

    if (result) {
      removeCar({
        variables: { id },
        refetchQueries: [{ query: GET_PEOPLE }],
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
