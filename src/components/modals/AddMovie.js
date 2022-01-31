import React from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, Input, Form, InputNumber, Select, Button, Space } from 'antd';

import { MOVIE_FORMATS } from 'utils/constants';
import { REQUIRED_RULE, MOVIE_TITLE_RULE, NAME_RULE } from 'utils/formRules';

const AddMovie = ({ addMovie, isOpen, handleCancel }) => {
  const [form] = Form.useForm();

  const addMovieRequest = values => {
    const actors = values.actors.map(e => `${e.firstName} ${e.lastName}`);

    addMovie({ ...values, actors });
    handleCancel();
    form.resetFields();
  };

  return (
    <Modal
      visible={isOpen}
      title="Add movie"
      onOk={() => {
        form.validateFields().then(values => {
          addMovieRequest(values);
        });
      }}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          title: '',
          year: 2000,
          format: MOVIE_FORMATS[0],
          actors: [],
        }}
      >
        <Form.Item label="Title" name="title" rules={MOVIE_TITLE_RULE}>
          <Input placeholder="title" />
        </Form.Item>
        <Form.Item label="Year" name="year" rules={REQUIRED_RULE}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item name="format" label="Format" rules={REQUIRED_RULE}>
          <Select placeholder="Select format">
            {MOVIE_FORMATS.map(format => (
              <Select.Option key={format} value={format}>
                {format}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.List name="actors">
          {(fields, { add, remove }) => (
            <>
              {fields.map(field => (
                <Space key={field.key}>
                  <Form.Item
                    {...field}
                    label="First Name"
                    name={[field.name, 'firstName']}
                    fieldKey={[field.fieldKey, 'firstName']}
                    rules={NAME_RULE()}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Last Name"
                    name={[field.name, 'lastName']}
                    fieldKey={[field.fieldKey, 'lastName']}
                    rules={NAME_RULE('last')}
                  >
                    <Input />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add actor
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default AddMovie;
