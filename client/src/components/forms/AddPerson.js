import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form, Input, Divider } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { ADD_PERSON, GET_PEOPLE } from '../../graphql/queries';

const AddPerson = () => {
  const styles = getSytles();
  const [id] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [addPerson] = useMutation(ADD_PERSON);

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (cache, { data: { addPerson } }) => {
        const data = cache.readQuery({ query: GET_PEOPLE });
        cache.writeQuery({
          query: GET_PEOPLE,
          data: {
            ...data,
            people: [...data.people, addPerson],
          },
        });
      },
    });
    form.resetFields();
  };

  return (
    <div className="formContainer" style={styles.formContainer}>
      <Divider style={{ fontWeight: 'bold', fontSize: '18px' }}>
        Add Person
      </Divider>
      <Form
        name="add-person-form"
        layout="inline"
        style={styles.form}
        form={form}
        onFinish={onFinish}
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
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Person
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

const getSytles = () => ({
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
export default AddPerson;
