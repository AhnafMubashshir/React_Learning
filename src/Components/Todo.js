import React, { useState } from 'react';
import { Input } from "antd";
import { EditOutlined, DeleteOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
const { Meta } = Card;

const Todo = ({ todoIndex, todoDescription, removeFromTODOList, editTODOList }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedValue, setEditedValue] = useState(todoDescription);

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
            style={{
                width: 300,
            }}
            actions={isEditing ? [
                <Button icon={<SaveOutlined />} key="save" onClick={saveEditedTODO} />,
                <Button icon={<CloseOutlined />} key="cancel" onClick={cancelEditing} />,
            ] : [
                <Button icon={<EditOutlined />} key="edit" onClick={editTODO} />,
                <Button icon={<DeleteOutlined />} key="delete" onClick={deleteTODO} />,
            ]}
        >
            <Meta
                title={isEditing ? 'Edit your todo' : `Todo ${todoIndex}`}
                description={isEditing ? (
                    <Input.TextArea
                        value={editedValue}
                        autoSize={{ minRows: 2, maxRows: 6 }}
                        onChange={(e) => setEditedValue(e.target.value)}
                    />
                ) : (
                    todoDescription
                )}
            />
        </Card>
    );
};

export default Todo;
