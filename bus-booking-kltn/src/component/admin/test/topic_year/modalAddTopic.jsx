import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Modal, Form, Alert, Input } from 'antd';
import TextValidate from '../../../common/validateTextInput'
import NumberValidate from '../../../common/validateNumber';
import { GlobalStateProvider, useGlobalState } from '../../../common/globaleState';
import { useMutation, useQueryClient } from 'react-query';
import * as topicSV from '../../../../services/topicService'
import FormItem from 'antd/es/form/FormItem';
import UseMutationCustom from '../../../common/useMutationCustom';
import { useForm } from 'antd/es/form/Form';
const ModalAddTopic = ({ message, onClose, open, isUpdate, dataCurrent }) => {
    const [topic, setTopic] = useState({
        name: '',
        description: ''
    })
    const Submit = (values) => {
        if (!isUpdate) {

            for (const key in values) {
                if (Object.hasOwnProperty.call(values, key)) {
                    topic[key] = values[key]
                }
            }
            addTopicMutation.mutate(topic)
        }
        else {
            updateTopicMutation.mutate(topic)
        }
        console.log(values)
    }

    const propDescription = {
        name: 'description',
        label: "Mô tả",
        required: false,
    }
    const propName = {
        name: 'name',
        label: "Tên bộ đề",
        required: true,
        min: 3,
        max: 30
    }

    const handleReset = () => {
        setTopic({ name: '', description: '' })
        form.resetFields();
    };

    const updateTopicMutation = UseMutationCustom(topicSV.updateTopic, "Cập nhật thành công", "Cập nhật thất bại", "getTopic")
    const addTopicMutation = UseMutationCustom(topicSV.addTopic, "Thêm mới thành công", "Thêm mới thất bại", "getTopic", handleReset)
    const [form] = Form.useForm();
    return (
        <>
            <Modal
                title={message}
                open={open}
                maskClosable={false}
                onOk={() => form.submit()}
                onCancel={onClose}
                cancelText="Hủy bỏ"
                okText={isUpdate ? "Cập nhật" : "Thêm mới"}
                style={{ textAlign: 'center' }}
            >
                <Form
                    // ref={formRef}
                    labelCol={{ offset: 1, span: 5 }}
                    wrapperCol={{ span: 18 }}
                    form={form}
                    onFinish={Submit}
                >
                    {
                        isUpdate ?
                            <>
                                <Form.Item
                                    label='Id'
                                    name='id'
                                    initialValue={Number(dataCurrent.id)}
                                >
                                    <Input style={{ color: 'black' }} disabled

                                    >
                                    </Input>
                                </Form.Item>
                                <Form.Item
                                    label='Năm'
                                    name='year'
                                    initialValue={Number(dataCurrent.year)}
                                >
                                    <Input disabled style={{ color: 'black' }}>
                                    </Input>
                                </Form.Item>

                                <TextValidate prop={propName} hasDefault={dataCurrent.description} />
                            </>
                            :
                            <>
                                <TextValidate prop={propName} />
                                <TextValidate prop={propDescription} />
                            </>
                    }


                </Form>
            </Modal >


        </>
    );
};
export default ModalAddTopic;