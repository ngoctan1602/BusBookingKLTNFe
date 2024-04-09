import { Form, Input } from "antd";
import React from 'react';
const TextValidate = ({ prop, hasDefault, style }) => {
    return (
        <Form.Item
            style={
                {
                    ...style,
                    width: '100%'
                }}
            hasFeedback
            label={prop.label}
            name={prop.name}
            initialValue={hasDefault !== null ? hasDefault : ''}
            rules={[
                {
                    required: prop.required, message: `Không được bỏ trống ${(prop.label).toLowerCase()}`
                },
                {
                    min: prop.min, message: `Ít nhất ${prop.min} kí tự`
                },
                {
                    max: prop.max, message: `Nhiều nhất ${prop.max} kí tự`
                },
            ]}
        >
            <Input allowClear type='text'
            />
        </Form.Item>
    );
}

export default TextValidate;