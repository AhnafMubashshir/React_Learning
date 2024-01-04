import { useState } from "react";
import { Button, Form, Input, Divider } from "antd";
import { ValidateErrorEntity } from 'rc-field-form/es/interface';
import Todo from "./Todo";

interface FormValues {
    todo: string;
}

const Home = () => {
    const [form] = Form.useForm();
    var [todoList, setTodoList] = useState<string[]>([]);

    function onFinish(values: FormValues) {
        setTodoList([...todoList, values.todo]);
        form.resetFields();
    }
    function onFinishFailed(errorInfo: ValidateErrorEntity) {
        console.log("Failed:", errorInfo);
    }

    function removeFromTODOList(index: number) {
        const updatedTodoList = todoList.filter((element, i) => i !== index);
        console.log(updatedTodoList);
        setTodoList(updatedTodoList);
    }

    function editTODOList(index: number, updatedValue: string): void {
        const updatedTodoList = [...todoList];
        updatedTodoList[index] = updatedValue;
        setTodoList(updatedTodoList);
    }

    return (
        <div className="flex flex-col md:flex-row md:max-h-[80vh] justify-evenly">
            <div className="flex flex-col items-center w-full md:w-[30%] mb-10">
                <Form
                    form={form}
                    className="space-y-6 w-full"
                    name="basic"
                    wrapperCol={{
                        span: 100,
                    }}
                    style={{
                        maxWidth: 1000,
                    }}
                    initialValues={{
                        remember: false,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <label className="text-black-900 block text-sm font-bold leading-6">Add Todo</label>
                    <Form.Item
                        name="todo"
                        rules={[
                            {
                                required: true,
                                message: "Please Write your todo.",
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            type="primary"
                            htmlType="submit"
                        >
                            ADD
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <div className="hidden md:flex md:flex-col items-center">
                <Divider type="vertical" className="h-full bg-gray-300" />
            </div>

            <div className="flex flex-col items-center w-full lg:w-[30%] md:overflow-y-auto">
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
        </div>
    );
};
export default Home;
