import { useMutation } from '@apollo/client';
import { Button, Form, Input } from 'antd';
import { useEffect, useState } from 'react';
import { UPDATE_PERSON } from '../../graphql/queries';

const UpdatePerson = (props) => {
  const { id, firstName, lastName } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();
  const styles = getSytles();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const [updatePerson] = useMutation(UPDATE_PERSON);

  const onFinish = (values) => {
    const { firstName, lastName } = values;

    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
    });
    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="update-person-form"
      layout="inline"
      onFinish={onFinish}
      initialValues={{
        firstName,
        lastName,
      }}
      style={styles.form}
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: 'Please enter a first name' }]}
      >
        <Input placeholder="i.e. Jane" />
      </Form.Item>
      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: 'Please enter a last name' }]}
      >
        <Input placeholder="i.e. Smith" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              (!form.isFieldTouched('firstName') &&
                !form.isFieldTouched('lastName')) ||
              form.getFieldError().filter(({ errors }) => errors.length).length
            }
          >
            Update Person
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

export default UpdatePerson;
