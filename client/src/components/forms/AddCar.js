import { useMutation, useQuery } from '@apollo/client';
import { Button, Form, Input, Divider, Select } from 'antd';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ADD_CAR, GET_PEOPLE } from '../../graphql/queries';

const AddCar = () => {
  const styles = getStyles();
  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const [addCar] = useMutation(ADD_CAR, {
    refetchQueries: [{ query: GET_PEOPLE }],
  });

  useEffect(() => {
    forceUpdate({});
  }, []);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    addCar({
      variables: {
        id,
        year: parseInt(year),
        make,
        model,
        price: parseFloat(price),
        personId,
      },
    });
    form.resetFields();
  };

  return (
    <div className="formContainer" style={styles.formContainer}>
      <Divider style={{ fontWeight: 'bold', fontSize: '18px' }}>
        Add Car
      </Divider>
      <Form
        name="add-car-form"
        layout="inline"
        style={styles.form}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Year"
          name="year"
          rules={[{ required: true, message: 'Please enter a year' }]}
        >
          <Input type="number" placeholder="i.e. 2005" />
        </Form.Item>

        <Form.Item
          label="Make"
          name="make"
          rules={[
            { required: true, message: 'Please enter an automobile company' },
          ]}
        >
          <Input placeholder="i.e. Toyota" />
        </Form.Item>

        <Form.Item
          label="Model"
          name="model"
          rules={[
            { required: true, message: 'Please enter an automobile model' },
          ]}
        >
          <Input placeholder="i.e. Corolla" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please enter the price' }]}
        >
          <Input prefix="$" type="number" step="100" />
        </Form.Item>

        <Form.Item
          label="Person"
          name="personId"
          rules={[{ required: true, message: 'Please select a person' }]}
        >
          <Select placeholder="Select a person">
            {data.people.map(({ id, firstName, lastName }) => (
              <Select.Option
                key={id}
                value={id}
              >{`${firstName} ${lastName}`}</Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

const getStyles = () => ({
  formContainer: {
    margin: '16px 48px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    justifyContent: 'center',
  },
});

export default AddCar;
