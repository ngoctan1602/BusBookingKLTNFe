import { Button, Col, ConfigProvider, Divider, Form, Grid, Input, Radio, Row, Select, Space, Upload } from "antd";
import { useQuery } from "react-query";
import * as PartSV from '../../../../services/partServices'
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import { addImage } from "../../../../services/yearService";
import UseMutationCustom from "../../../common/useMutationCustom";
import TextValidate from "../../../common/validateTextInput";
import * as questionSV from "../../../../services/questionService"
import CheckValueField from "../../../common/checkUndefinedValue";
import { useGlobalState } from "../../../common/globaleState";
import FormItem from "antd/es/form/FormItem";
import QuestionParagraph from "./questionPara";
import QuestionPara7 from "./questionPara7";
const propAnswer = []
for (let index = 0; index < 4; index++) {
    propAnswer.push({
        name: `answer${index + 1}`,
        label: "Đáp án " + (index + 1),
        required: true,
        min: 3,
        max: 30
    })
}

const AddQuetion = () => {
    const { globalState, setGlobalState } = useGlobalState();
    const [form] = new Form.useForm();
    const [formQuestion] = new Form.useForm();
    const [formDescription] = new Form.useForm();
    const [indexAnswer, setIndex] = useState(0);


    const [parts, setParts] = useState([]);

    const {
        isLoading,
        isError,
        error,
        data: getPart
    } = useQuery("getPart", PartSV.getPart)

    useEffect(() => {
        if (globalState.connect) {
            if (!isLoading && !isError) {
                const updatedParts = getPart.data.map(element => ({
                    value: element.id,
                    label: element.name
                }));
                setParts(updatedParts);
            }
        }

    }, [isLoading, globalState.connect, isError]);

    const [partSelected, setPartSelected] = useState(0);
    const handleChange = (value) => {
        setPartSelected(value)
    };

    const handleSubmit = (file, audio) => {
        if (audio === true) {
            formQuestion.setFieldsValue({
                fileAudio: file?.fileList[0].originFileObj
            })

        }
        else {

            formQuestion.setFieldsValue({
                fileImage: file?.fileList[0].originFileObj
            })
        }

    }

    const setValueAddQuestion = () => {
        const addValue = {
            idPart: partSelected,
            contentQues: formQuestion.getFieldValue('question'),
            // audioQues: [1, 2, 3, 4].includes(partSelected) && (formQuestion.getFieldValue('fileAudio')),
            // imageQues: [1, 3, 4, 7].includes(partSelected) && (formQuestion.getFieldValue('fileImage')),
        }
        if ([1, 2, 3, 4].includes(partSelected)) {
            addValue["audioQues"] = formQuestion.getFieldValue('fileAudio');
        }
        if ([1, 3, 4, 7].includes(partSelected)) {
            addValue["imageQues"] = formQuestion.getFieldValue('fileImage');
        }
        return addValue;
    }
    const setValueAddAnswer = () => {

        const addValue = []
        const length = partSelected === 2 ? 3 : 4
        console.log(length)
        for (let i = 0; i < length; i++) {
            addValue.push(
                {
                    content: form.getFieldValue(`answer${i + 1}`),
                    isTrue: indexAnswer === i ? true : false
                })
        }
        return addValue;
    }
    const submitAddQuestion = () => {

        form.submit()
        formQuestion.submit()
        const formData = setValueAddQuestion();
        const checkQuestion = CheckValueField(formData);
        const formDataAnswer = setValueAddAnswer();
        const checkAnswer = CheckValueField(formDataAnswer);

        if (checkQuestion && checkAnswer) {

            var form_data = new FormData();
            for (var key in formData) {
                form_data.append(key, formData[key]);
            }
            form_data.append("descriptionQues", formDescription.getFieldValue("description"))
            for (let i = 0; i < formDataAnswer.length; i++) {
                form_data.append(`answerRequests[${i}].content`, formDataAnswer[i].content);
                form_data.append(`answerRequests[${i}].isTrue`, formDataAnswer[i].isTrue);
            }

            addYearMutation.mutate(form_data)
            // console.log(form_data.get("imageQues"))
        }


    }

    const addYearMutation = UseMutationCustom(questionSV.addQuestion, "Thêm mới thành công", "Thêm mới thất bại", "getQuestion", null)


    return (
        <>

            <Row >
                <Row align={'middle'} style={{ width: "50%" }}>
                    <Col offset={0} flex={1}>
                        <p>Chọn part</p>
                    </Col>
                    {
                        (!isLoading && !isError) &&
                        <Col Col flex={3}>
                            <Select
                                mode='single'
                                style={{ width: '100%' }}
                                onChange={handleChange}
                                showSearch
                                tokenSeparators={[',']}
                                options={parts}
                            />
                        </Col>
                    }
                </Row >
                {
                    [1, 2, 5].includes(partSelected) &&

                    <Row align={'middle'} style={{ width: "50%", paddingLeft: 16 }}>
                        <Col offset={0} flex={1} align='center'>
                            <p>Thêm đáp án</p>
                        </Col>



                    </Row >
                }
            </Row>
            <Row>
                {/* Tạo câu hỏi part 12 */}
                {
                    ([1, 2].includes(partSelected)) &&
                    <div style={{ margin: "16px 0px", width: "50%" }}>
                        <Form
                            name="formQuestion"
                            form={formQuestion}
                        >
                            <Row align={'middle'} style={{ margin: "16px 0px" }}>

                                {

                                    <Col Col flex={1}>

                                        <Form.Item
                                            label="Thêm câu hỏi"
                                            name="question"
                                            initialValues={
                                                '' // Giá trị ban đầu của inputField
                                            }
                                            rules={[
                                                {
                                                    required: true, message: "Không được bỏ trống"
                                                },
                                                {
                                                    min: 3, message: "Ít nhất 3 kí tự"
                                                },
                                                {
                                                    max: 60, message: "Nhiều nhất 60 kí tự"
                                                },
                                            ]}>
                                            <Row>
                                                <Col offset={3} flex={1}>
                                                    <TextArea allowClear rows={4}></TextArea>
                                                </Col>
                                            </Row>
                                        </Form.Item>

                                    </Col>
                                }
                            </Row >
                            <Row align={'middle'} style={{ margin: "16px 0px" }} >
                                <Col Col flex={1}>

                                    <Form.Item
                                        label="Thêm file nghe"
                                        name="fileAudio"
                                        valuePropName="file"
                                        getValueFromEvent={(event) => {
                                            return event?.file
                                        }}
                                        rules={[
                                            { required: true, message: "Vui lòng chọn file" },]}>
                                        <Row>
                                            <Col offset={3} flex={1}>
                                                <Upload
                                                    listType="picture"
                                                    beforeUpload={(file) => {
                                                        return new Promise((resolve, reject) => {
                                                            file.size > 3 ? reject("File size exceed") : resolve('success')
                                                        }
                                                        )
                                                    }}
                                                    accept=".mp3"
                                                    maxCount={1}
                                                    customRequest={(info) => { }}
                                                    action={null}
                                                    onChange={(file) =>
                                                        handleSubmit(file, true)
                                                    }
                                                >
                                                    <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                                                </Upload>
                                            </Col>
                                        </Row>
                                    </Form.Item>

                                </Col>
                            </Row >

                            {
                                [1].includes(partSelected) &&
                                <Row align={'middle'} style={{ margin: "16px 0px" }} >
                                    <Col Col flex={1}>

                                        <Form.Item
                                            label="Thêm file hình ảnh"
                                            name="fileImage"
                                            valuePropName="file"
                                            getValueFromEvent={(event) => {
                                                return event?.file
                                            }}
                                            rules={[
                                                {
                                                    required: partSelected === 1 ? true : false, message: "Vui lòng chọn file"
                                                },
                                            ]}>
                                            <Row>
                                                <Col offset={2} flex={1}>
                                                    <Upload
                                                        listType="picture"
                                                        beforeUpload={(file) => {
                                                            return new Promise((resolve, reject) => {
                                                                if (file.size > 3) {
                                                                    reject('File size exceed')
                                                                }
                                                                else {
                                                                    resolve('success')
                                                                }
                                                            })
                                                        }}
                                                        accept="image/png, image/gif, image/jpeg"
                                                        maxCount={1}
                                                        customRequest={(info) => { }}
                                                        action={null}
                                                        onChange={(file) =>
                                                            // formQuestion.setFieldsValue({ fileaudio: file.file.originFileObj })

                                                            handleSubmit(file, false)
                                                        }
                                                    >
                                                        <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                                                    </Upload>
                                                </Col>
                                            </Row>
                                        </Form.Item>
                                    </Col>
                                </Row >
                            }
                        </Form>
                    </div >
                }
                {/* Tạo câu hỏi part 5 */}
                {
                    (partSelected === 5) &&
                    <div style={{ margin: "16px 0px", width: "50%" }}>
                        <Form
                            name="formQuestion"
                            form={formQuestion}
                        >
                            <Row align={'middle'} style={{ margin: "16px 0px" }}>

                                {

                                    <Col Col flex={1}>

                                        <Form.Item
                                            label="Thêm câu hỏi"
                                            name="question"
                                            initialValues={
                                                '' // Giá trị ban đầu của inputField
                                            }
                                            rules={[
                                                {
                                                    required: true, message: "Không được bỏ trống"
                                                },
                                                {
                                                    min: 3, message: "Ít nhất 3 kí tự"
                                                },
                                                {
                                                    max: 60, message: "Nhiều nhất 60 kí tự"
                                                },
                                            ]}>
                                            <Row>
                                                <Col offset={3} flex={1}>
                                                    <TextArea allowClear rows={4}></TextArea>
                                                </Col>
                                            </Row>
                                        </Form.Item>

                                    </Col>
                                }
                            </Row >

                        </Form>
                    </div >
                }
                {/* Tạo câu hỏi p3 4 6 7  */}
                {
                    ([3, 4, 6].includes(partSelected)) &&
                    <div style={{ margin: "16px 0px", width: "100%" }}>
                        <QuestionParagraph partSelected={partSelected}>

                        </QuestionParagraph>
                    </div>
                }
                {
                    partSelected === 7 &&
                    < QuestionPara7 />
                }

                {/* // này là tạo đáp án */}
                {
                    ([1, 2, 5].includes(partSelected)) &&
                    <div style={{ margin: "16px 0px", width: "50%", paddingLeft: 16 }}>
                        <Form name="form"
                            form={form}
                            // onFinish={(values) => console.log(form.getFieldValue("answer1"))}
                            style={{ width: "100%" }}
                        >
                            <Radio.Group
                                style={{ width: "100%" }}
                                buttonStyle='outline' onChange={(e) => setIndex(e.target.value)} value={indexAnswer} >
                                {
                                    propAnswer.map((prop, index) => (

                                        <div
                                            style={
                                                { display: 'flex', alignItems: 'center', width: '100%' }
                                            }
                                        >
                                            {
                                                index !== 3
                                                &&
                                                <div style={
                                                    { display: 'flex', alignItems: 'center', width: '100%' }
                                                }>

                                                    <Radio
                                                        style={
                                                            {
                                                                paddingBottom: 20
                                                            }
                                                        }
                                                        value={index}
                                                    >
                                                    </Radio>

                                                    <TextValidate prop={prop} ></TextValidate>
                                                </div>
                                            }

                                            {
                                                (index === 3 && partSelected !== 2)
                                                &&
                                                <div style={
                                                    { display: 'flex', alignItems: 'center', width: '100%' }
                                                }>

                                                    <Radio
                                                        style={
                                                            {
                                                                paddingBottom: 20
                                                            }
                                                        }
                                                        value={index}
                                                    >
                                                    </Radio>

                                                    <TextValidate prop={prop} ></TextValidate>
                                                </div>
                                            }


                                        </div>
                                    ))
                                }


                            </Radio.Group>
                            {/* <Form.Item>
                                <Button htmlType="submit"></Button>
                            </Form.Item> */}
                        </Form>
                        <Form form={formDescription} name="form">
                            <Form.Item label="Lời giải chi tiết" name="description">
                                <TextArea rows={4}>
                                </TextArea>
                            </Form.Item>
                        </Form>

                        <Button onClick={() => submitAddQuestion()}>
                            Tạo câu hỏi
                        </Button>
                    </div >
                }
            </Row >

        </>
    );
}

export default AddQuetion;
