import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Select } from 'antd';
import { useEffect, useState } from 'react';
import { UPDATE_CAR, GET_PEOPLE } from '../../graphql/queries';

const UpdateCar = (props) => {
  const { id, year, make, model, price, personId } = props;
  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const styles = getSytles();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [updateCar] = useMutation(UPDATE_CAR);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const onFinish = (values) => {
    const { year, make, model, price, personId: newPersonId } = values;

    updateCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId: newPersonId,
      },
      update: (cache, { data: { updateCar } }) => {
        // Reassign car to a different person
        if (personId !== updateCar.personId) {
          cache.modify({
            id: cache.identify({ __typename: 'Person', id: personId }),
            fields: {
              cars(existingCars = [], { readField }) {
                return existingCars.filter(
                  (carRef) => readField('id', carRef) !== updateCar.id
                );
              },
            },
          });

          // Add new car
          cache.modify({
            id: cache.identify({
              __typename: 'Person',
              id: updateCar.personId,
            }),
            fields: {
              cars(existingCars = []) {
                return [...existingCars, updateCar];
              },
            },
          });
        } else {
          // Only update price
          cache.modify({
            id: cache.identify({ __typename: 'Car', id: updateCar.id }),
            fields: {
              price() {
                return updateCar.price;
              },
            },
          });
        }
      },
    });

    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="update-car-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        year,
        make,
        model,
        price,
        personId,
      }}
      style={styles.form}
    >
      <Form.Item label="Year" name="year" rules={[{ required: true }]}>
        <Input type="number" disabled={true} />
      </Form.Item>

      <Form.Item
        label="Make"
        name="make"
        rules={[
          { required: true, message: 'Please enter an automobile company' },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>

      <Form.Item
        label="Model"
        name="model"
        rules={[
          { required: true, message: 'Please enter an automobile model' },
        ]}
      >
        <Input disabled={true} />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please enter the price' }]}
      >
        <Input prefix="$" type="number" step="100" />
      </Form.Item>

      <Form.Item label="Person" name="personId">
        <Select placeholder="Select a person" value={personId}>
          {data.people.map(({ id, firstName, lastName }) => (
            <Select.Option key={id} value={id}>
              {`${firstName} ${lastName}`}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched('price') &&
                !form.isFieldTouched('personId')) ||
              form.getFieldsError().some(({ errors }) => errors.length)
            }
          >
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

const getSytles = () => ({
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
    padding: '36px 16px',
    margin: '16px',
    border: '2px solid gray',
  },
});

export default UpdateCar;
