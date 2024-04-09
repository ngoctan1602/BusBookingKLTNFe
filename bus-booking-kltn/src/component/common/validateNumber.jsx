import { Form, Input } from "antd";
import React from 'react';
const NumberValidate = ({ prop, onChange }) => {
    const validateNumberRange = (rule, value) => {
        if (value < prop.min || value > prop.max) {
            return Promise.reject(`Giá trị phải nằm trong khoảng từ ${prop.min} đến ${prop.max}`);
        }
        return Promise.resolve();
    };
    return (
        <Form.Item
            label={prop.label}
            name={prop.name}
            hasFeedback
            rules={[
                { required: true, message: 'Vui lòng nhập giá trị' },
                { validator: validateNumberRange }
            ]}
        >
            <Input type='number'
            // onChange={(e) => onChange(prop.name, e.target.value)}
            />
        </Form.Item>
    );
}

export default NumberValidate;