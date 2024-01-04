import { useState } from "react";
import { Input, Modal, Typography } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SaveOutlined,
    CloseOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
const { Text } = Typography;
const { Meta } = Card;

interface TodoProps {
    todoIndex: number;
    todoDescription: string;
    removeFromTODOList: () => void;
    editTODOList: (updatedValue: string) => void;
}

const Todo: React.FC<TodoProps> = ({
    todoIndex,
    todoDescription,
    removeFromTODOList,
    editTODOList,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(todoDescription);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleShowFullDescription = () => {
        setShowFullDescription(!showFullDescription);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        setShowFullDescription(!showFullDescription);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setShowFullDescription(!showFullDescription);
    };

    const editTODO = () => {
        setIsEditing(true);
    };

    const saveEditedTODO = () => {
        setIsEditing(false);
        editTODOList(editedValue);
    };

    const cancelEditing = () => {
        setIsEditing(false);
    };

    const deleteTODO = () => {
        removeFromTODOList();
    };

    return (
        <Card
            className="w-64 mx-auto mt-4"
            style={{
                width: 300,
            }}
            actions={
                isEditing
                    ? [
                        <Button
                            icon={<SaveOutlined />}
                            key="save"
                            onClick={saveEditedTODO}
                        />,
                        <Button
                            icon={<CloseOutlined />}
                            key="cancel"
                            onClick={cancelEditing}
                        />,
                    ]
                    : [
                        <Button icon={<EditOutlined />} key="edit" onClick={editTODO} />,
                        <Button
                            icon={<DeleteOutlined />}
                            key="delete"
                            onClick={deleteTODO}
                        />,
                    ]
            }
        >
            <Meta
                className="flex"
                title={isEditing ? "Edit your todo" : `Todo ${todoIndex}`}
                description={
                    isEditing ? (
                        <Input.TextArea
                            value={editedValue}
                            autoSize={{ minRows: 2, maxRows: 6 }}
                            onChange={(e) => setEditedValue(e.target.value)}
                        />
                    ) : (
                        <>
                            {showFullDescription ? (
                                <>
                                    {todoDescription.slice(0, 20)}
                                    <Modal
                                        title={`Todo ${todoIndex}`}
                                        open={isModalOpen}
                                        onOk={handleOk}
                                        onCancel={handleCancel}
                                        footer={null}
                                    >
                                        <p>{todoDescription}</p>
                                    </Modal>
                                </>
                            ) : (
                                <>
                                    {todoDescription.length > 20
                                        ? `${todoDescription.slice(0, 20)}...`
                                        : todoDescription}
                                    {todoDescription.length > 20 && (
                                        <Text
                                            className="text-gray-400 hover:text-gray-600 cursor-pointer"
                                            onClick={toggleShowFullDescription}
                                        >
                                            See More
                                        </Text>
                                    )}
                                </>
                            )}
                        </>
                    )
                }
            />
        </Card>
    );
};

export default Todo;
