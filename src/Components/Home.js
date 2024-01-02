import { React, useState } from 'react';
import { Button, Form, Input, Divider, Typography } from 'antd';
import Todo from './Todo';
const { Title } = Typography;

const Home = () => {

    const [form] = Form.useForm();
    var [todoList, setTodoList] = useState([]);

    function onFinish(values) {
        setTodoList([...todoList, values.todo]);
        form.resetFields();
    };
    function onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    };

    function removeFromTODOList(index) {
        const updatedTodoList = todoList.filter((element, i) => i !== index);
        console.log(updatedTodoList);
        setTodoList(updatedTodoList);
    }

    function editTODOList(index, updatedValue) {
        const updatedTodoList = [...todoList];
        updatedTodoList[index] = updatedValue;
        setTodoList(updatedTodoList);
    }

    return (
        <div>
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: false,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="Add Todo"
                    name="todo"
                    rules={[
                        {
                            required: true,
                            message: 'Please Write your todo.',
                        },
                    ]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        ADD
                    </Button>
                </Form.Item>
            </Form>

            <Divider />

            <Title level={3}> TODO </Title>

            <div>
                {todoList.map((todo, index) => (
                    <Todo
                        key={index}
                        todoIndex={index + 1}
                        todoDescription={todo}
                        removeFromTODOList={() => removeFromTODOList(index)}
                        editTODOList={(updatedValue) => editTODOList(index, updatedValue)}
                    />
                ))}
            </div>
        </div>
    );
}
export default Home;