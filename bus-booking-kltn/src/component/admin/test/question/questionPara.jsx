import { Button, Col, Divider, Form, Radio, Row, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import TextValidate from "../../../common/validateTextInput";
import { UpCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import CheckValueField from "../../../common/checkUndefinedValue";
import CheckValue from "../../../common/checkEmtyValue";
import UseMutationCustom from "../../../common/useMutationCustom";
import { addQuestionWithParagraph } from "../../../../services/questionService";

const propQuestionPara = []

for (let index = 0; index < 4; index++) {
    propQuestionPara.push({
        name: `question${index + 1}`,
        label: "Câu hỏi " + (index + 1),
        required: true,
        min: 3,
        max: 45
    })
}

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

const QuestionParagraph = ({ partSelected }) => {
    const handleSubmit = (file, audio) => {
        if (audio === true) {
            formPara.setFieldsValue({
                fileAudio: file?.fileList[0].originFileObj
            })

        }
        else {
            formPara.setFieldsValue({
                fileImage: file?.fileList[0].originFileObj
            })
        }

    }

    const [formPara] = new Form.useForm();

    const formQuestion = []
    const [formQuestion1] = new Form.useForm()
    const [formQuestion2] = new Form.useForm()
    const [formQuestion3] = new Form.useForm()
    const [formQuestion4] = new Form.useForm()
    formQuestion.push(formQuestion1, formQuestion2, formQuestion3, formQuestion4)

    const formDescription = []
    const [formDescription1] = new Form.useForm()
    const [formDescription2] = new Form.useForm()
    const [formDescription3] = new Form.useForm()
    const [formDescription4] = new Form.useForm()
    formDescription.push(formDescription1, formDescription2, formDescription3, formDescription4)

    const formAnswer = []
    const [formAnswer1] = new Form.useForm()
    const [formAnswer2] = new Form.useForm()
    const [formAnswer3] = new Form.useForm()
    const [formAnswer4] = new Form.useForm()
    formAnswer.push(formAnswer1, formAnswer2, formAnswer3, formAnswer4)

    const [indexAnswer1, setIndex1] = useState(0);
    const [indexAnswer2, setIndex2] = useState(0);
    const [indexAnswer3, setIndex3] = useState(0);
    const [indexAnswer4, setIndex4] = useState(0);

    const changeValueRadio = (index, value) => {
        if (index === 0) {
            setIndex1(value)
        }
        else if (index === 1) {
            setIndex2(value)
        }
        else if (index === 2) {
            setIndex3(value)
        }
        else {
            setIndex4(value)
        }
    }
    const getValueIndexSlected = (index) => {
        if (index === 0) {
            return indexAnswer1
        }
        else if (index === 1) {
            return indexAnswer2
        }
        else if (index === 2) {
            return indexAnswer3
        }
        else {
            return indexAnswer4
        }
    }

    const setValueFormPara = () => {
        const addValue = {
            idPart: partSelected,
            content: formPara.getFieldValue('paragraph'),
        }
        if ([1, 2, 3, 4].includes(partSelected)) {
            addValue["audio"] = formPara.getFieldValue('fileAudio');
        }
        if ([1, 3, 4, 6, 7].includes(partSelected)) {
            addValue["image"] = formPara.getFieldValue('fileImage');
        }
        return addValue;
    }
    const setValueAddAnswer = (index) => {

        const addValue = []
        let indexAnswer = -1

        if (index === 0) {
            // form = formAnswer1;
            indexAnswer = indexAnswer1
        }
        else if (index === 1) {
            // form = formAnswer2
            indexAnswer = indexAnswer2
        }
        else if (index === 2) {
            // form = formAnswer3
            indexAnswer = indexAnswer3
        }
        else {
            indexAnswer = indexAnswer4
        }
        for (let i = 0; i < 4; i++) {
            addValue.push(
                {
                    content: formAnswer[index].getFieldValue(`answer${i + 1}`),
                    isTrue: indexAnswer === i ? true : false
                })
        }
        return addValue;
    }

    const addYearMutation = UseMutationCustom(addQuestionWithParagraph, "Thêm mới thành công", "Thêm mới thất bại", "getQuestion", null)

    const submitQuestion = () => {
        for (let i = 0; i < 3; i++) {
            formQuestion[i].submit();
            formAnswer[i].submit();
            formDescription[i].submit();
        }
        formPara.submit();
        const valueFormPara = setValueFormPara();
        const valueFormAnswer1 = setValueAddAnswer(0)
        const valueFormAnswer2 = setValueAddAnswer(1)
        const valueFormAnswer3 = setValueAddAnswer(2)
        const valueAnswer = []
        valueAnswer.push(valueFormAnswer1, valueFormAnswer2, valueFormAnswer3)
        if (partSelected === 6) {
            const valueFormAnswer4 = setValueAddAnswer(3)
            valueAnswer.push(valueFormAnswer4)
        }
        const checkAnswer1 = CheckValueField(valueFormAnswer1)
        const checkAnswer2 = CheckValueField(valueFormAnswer2)
        const checkAnswer3 = CheckValueField(valueFormAnswer3)
        const checkPara = CheckValueField(valueFormPara)

        //Kieemr tra validate ok thif moiw add
        if (CheckValue(formQuestion1.getFieldValue("question"))
            && CheckValue(formQuestion2.getFieldValue("question"))
            && CheckValue(formQuestion3.getFieldValue("question"))
            && checkAnswer1 && checkAnswer2 && checkAnswer3 && checkPara
        ) {
            if (partSelected === 6) {
                formQuestion[3].submit();
                formAnswer[3].submit()
                const checkAnswer4 = CheckValueField(valueAnswer[3])
                if (!checkAnswer4 || !formQuestion4.getFieldValue("question")) {

                    console.log("Không ok")
                    return
                }

            }
            console.log("Ok nhé")
            var form_data = new FormData();
            for (var key in valueFormPara) {
                form_data.append(key, valueFormPara[key]);
            }
            const length = partSelected === 6 ? 4 : 3
            for (let i = 0; i < length; i++) {
                form_data.append(`questionParagraphRequests[${i}].contentQues`, formQuestion[i].getFieldValue("question"))
                form_data.append(`questionParagraphRequests[${i}].descriptionQues`, formDescription[i].getFieldValue("description"))
                for (let j = 0; j < 4; j++) {
                    form_data.append(`questionParagraphRequests[${i}].answerRequests[${j}].content`, valueAnswer[i][j].content);
                    form_data.append(`questionParagraphRequests[${i}].answerRequests[${j}].isTrue`, valueAnswer[i][j].isTrue);
                }
            }

            addYearMutation.mutate(form_data)
            // console.log(form_data.get("questionParagraphRequests[0].answerRequests[0].content"))
        }


    }
    return (
        <div style={{ margin: "16px 0px", width: "100%" }}>
            <Form
                name="formPara"
                form={formPara}
                onFinish={(values) => console.log(values)}
            >
                <Row align={'middle'} >
                    <Col Col flex={1}>
                        <Form.Item
                            label="Thêm đoạn văn"
                            name="paragraph"
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
                                <Col offset={1} flex={1}>
                                    <TextArea allowClear rows={4}></TextArea>
                                </Col>
                            </Row>
                        </Form.Item>
                    </Col>

                </Row >
                <Divider></Divider>
                {
                    (partSelected === 3 || partSelected === 4) &&

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
                                    <Col offset={1} flex={1}>
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
                                            <Button icon={<UpCircleOutlined />}>Upload (Max: 1)</Button>
                                        </Upload>
                                    </Col>
                                </Row>
                            </Form.Item>

                        </Col>
                    </Row >
                }
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
                                    required: true, message: "Vui lòng chọn file"
                                },
                            ]}
                        >
                            <Row>
                                <Col offset={1} flex={1}>
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

            </Form>
            <Divider></Divider>
            <Row align={'middle'} gutter={[8, 8]}>
                {
                    propQuestionPara.map((prop, index) => (

                        <>
                            {
                                index === 3 && partSelected === 6 &&
                                <Col Col span={12}>
                                    <Form
                                        name={"formQuestion" + (index + 1)}
                                        form={formQuestion[index]}
                                        onFinish={(values) => console.log(values)}
                                    >
                                        <Form.Item
                                            label={"Thêm câu hỏi thứ " + (index + 1)}
                                            // name={"question" + (index + 1)}
                                            name={"question"}
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
                                                <Col offset={1} flex={1}>
                                                    <TextArea allowClear rows={4}></TextArea>
                                                </Col>
                                            </Row>
                                        </Form.Item>

                                    </Form>
                                    <Form name="form"
                                        form={formAnswer[index]}
                                        onFinish={(values) => console.log(values)}
                                        style={{ width: "100%" }}
                                    >
                                        <Radio.Group
                                            style={{ width: "100%" }}
                                            buttonStyle='outline'
                                            onChange={
                                                (e) => changeValueRadio(index, e.target.value)
                                            }
                                            value={getValueIndexSlected(index)}
                                        >
                                            {
                                                propAnswer.map((prop, index) => (

                                                    <div
                                                        style={{ display: 'flex', alignItems: 'center', width: '100%' }}
                                                    >
                                                        <div style={
                                                            { display: 'flex', alignItems: 'center', width: '100%' }
                                                        }>
                                                            <Radio
                                                                style={{ paddingBottom: 20 }} value={index}
                                                            >
                                                            </Radio>
                                                            <TextValidate prop={prop} ></TextValidate>
                                                        </div>
                                                    </div>
                                                ))
                                            }


                                        </Radio.Group>
                                    </Form>
                                    <Form form={formDescription[index]} onFinish={(values) => console.log(values)}>
                                        <Form.Item label="Lời giải chi tiết" name="description">
                                            <TextArea rows={4}>
                                            </TextArea>
                                        </Form.Item>
                                    </Form>

                                </Col>
                            }
                            {
                                index !== 3 &&
                                <Col Col span={12}>
                                    <Form
                                        name={"formQuestion" + (index + 1)}
                                        form={formQuestion[index]}
                                        onFinish={(values) => console.log(values)}
                                    >
                                        <Form.Item
                                            label={"Thêm câu hỏi thứ " + (index + 1)}
                                            // name={"question" + (index + 1)}
                                            name={"question"}
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
                                                <Col offset={1} flex={1}>
                                                    <TextArea allowClear rows={4}></TextArea>
                                                </Col>
                                            </Row>
                                        </Form.Item>

                                    </Form>
                                    <Form name="form"
                                        form={formAnswer[index]}
                                        onFinish={(values) => console.log(values)}
                                        style={{ width: "100%" }}
                                    >
                                        <Radio.Group
                                            style={{ width: "100%" }}
                                            buttonStyle='outline'
                                            onChange={
                                                (e) => changeValueRadio(index, e.target.value)
                                            }
                                            value={getValueIndexSlected(index)}
                                        >
                                            {
                                                propAnswer.map((prop, index) => (

                                                    <div
                                                        style={{ display: 'flex', alignItems: 'center', width: '100%' }}
                                                    >
                                                        <div style={
                                                            { display: 'flex', alignItems: 'center', width: '100%' }
                                                        }>
                                                            <Radio
                                                                style={{ paddingBottom: 20 }} value={index}
                                                            >
                                                            </Radio>
                                                            <TextValidate prop={prop} ></TextValidate>
                                                        </div>
                                                    </div>
                                                ))
                                            }


                                        </Radio.Group>
                                    </Form>
                                    <Form form={formDescription[index]} onFinish={(values) => console.log(values)}>
                                        <Form.Item label="Lời giải chi tiết" name="description">
                                            <TextArea rows={4}>
                                            </TextArea>
                                        </Form.Item>
                                    </Form>

                                </Col>
                            }
                        </>
                    ))
                }
            </Row >
            <Row>
                <Col offset={6} span={12} >
                    <Button style={{ width: "100%" }} onClick={() => submitQuestion()}>
                        Tạo mới
                    </Button>
                </Col>
            </Row>
        </div >
    );
}

export default QuestionParagraph;