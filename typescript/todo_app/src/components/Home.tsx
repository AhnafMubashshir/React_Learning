import { useEffect, useState } from "react";
import { Button, Form, Input, Divider } from "antd";
import { ValidateErrorEntity } from "rc-field-form/es/interface";
import axios from "axios";
import Todo from "./Todo";

interface FormValues {
  _id: any;
  todo: string;
}

const Home = () => {
  const [form] = Form.useForm();
  var [todoList, setTodoList] = useState<FormValues[]>([]);

  useEffect(() => {
    // Fetch todos on component mount
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get("http://localhost:5000/getTodos")
      .then((response) => {
        setTodoList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function onFinish(values: FormValues) {
    axios
      .post("http://localhost:5000/storeTodo", { todo: values.todo })
      .then((response) => {
        if (response.status === 201) {
          getTodos();
          form.resetFields();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onFinishFailed(errorInfo: ValidateErrorEntity) {
    console.log("Failed:", errorInfo);
  }

  async function removeFromTODOList(index: number) {
    const response = await axios.delete(
      `http://localhost:5000/deleteTodo/${todoList[index]._id}`
    );
    setTodoList(response.data);
  }

  async function editTODOList(index: number, updatedValue: string) {
    const response = await axios.put(
      `http://localhost:5000/updateTodo/${todoList[index]._id}`,
      { todo: updatedValue }
    );
    setTodoList(response.data);
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
          <label className="text-black-900 block text-sm font-bold leading-6">
            Add Todo
          </label>
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
              todoDescription={todo.todo}
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
