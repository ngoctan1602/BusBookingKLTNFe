import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { WarningFilled } from '@ant-design/icons';
const ModalConfirm = ({ message, onSubmit, open }) => {

    const [confirmLoading, setConfirmLoading] = useState(false);
    return (
        <>
            <Modal
                title="Xác nhận xóa"
                open={open}
                onOk={() => onSubmit(false)}
                confirmLoading={confirmLoading}
                onCancel={() => onSubmit(true)}
                centered
                maskClosable={false}
            >
                <p>{message}</p>
            </Modal>
        </>
    );
};
export default ModalConfirm;