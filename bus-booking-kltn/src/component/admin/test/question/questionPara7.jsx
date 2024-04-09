import { useQuery } from "react-query";
import { getTypeParagraph } from "../../../../services/paragraphServices";
import { useEffect, useState } from "react";
import { useGlobalState } from "../../../common/globaleState";
import { Button, Col, Divider, Form, Radio, Row, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import TextValidate from "../../../common/validateTextInput";
import CheckValueField from "../../../common/checkUndefinedValue";
import UseMutationCustom from "../../../common/useMutationCustom";
import { addQuestionWithParagraph } from "../../../../services/questionService";
import CheckValue from "../../../common/checkEmtyValue";
const propQuestionSimple = [
    {
        value: 2,
        label: "2 Câu"
    },
    {
        value: 3,
        label: "3 Câu"
    },
    {
        value: 4,
        label: "4 Câu"
    }
]

const propQuestionPara = []

for (let index = 0; index < 5; index++) {
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
const QuestionPara7 = () => {
    const {
        isLoading,
        isError,
        error,
        data: getType
    } = useQuery("getTypeParagraph", getTypeParagraph)
    const { globalState, setGlobalState } = useGlobalState();
    const [typePara, setTypePara] = useState([])
    useEffect(() => {
        if (globalState.connect) {
            if (!isLoading && !isError) {
                const updatedPara = getType.data.map(element => ({
                    value: element.id,
                    label: element.name
                }));
                setTypePara(updatedPara);
            }
        }

    }, [isLoading, globalState.connect, isError]);
    const [typeSelected, setTypeSelected] = useState(0);
    const chooseType = (value) => {
        setTypeSelected(value)

    };
    const handleSubmit = (file, audio) => {
        formPara.setFieldsValue({
            fileImage: file?.fileList[0].originFileObj
        })
    }

    const [simpleQuesSelected, setSimpleQuesSelected] = useState(0);
    const chooseSimple = (value) => {
        setSimpleQuesSelected(value)

    };

    useEffect(
        () => {
            getNumberQuestion()
        }, [typeSelected, simpleQuesSelected]
    )
    const formQuestion = []
    const [formQuestion1] = new Form.useForm()
    const [formQuestion2] = new Form.useForm()
    const [formQuestion3] = new Form.useForm()
    const [formQuestion4] = new Form.useForm()
    const [formQuestion5] = new Form.useForm()
    formQuestion.push(formQuestion1, formQuestion2, formQuestion3, formQuestion4, formQuestion5)

    const [indexAnswer1, setIndex1] = useState(0);
    const [indexAnswer2, setIndex2] = useState(0);
    const [indexAnswer3, setIndex3] = useState(0);
    const [indexAnswer4, setIndex4] = useState(0);
    const [indexAnswer5, setIndex5] = useState(0);

    const formAnswer = []
    const [formAnswer1] = new Form.useForm()
    const [formAnswer2] = new Form.useForm()
    const [formAnswer3] = new Form.useForm()
    const [formAnswer4] = new Form.useForm()
    const [formAnswer5] = new Form.useForm()
    formAnswer.push(formAnswer1, formAnswer2, formAnswer3, formAnswer4, formAnswer5)

    const formDescription = []
    const [formDescription1] = new Form.useForm()
    const [formDescription2] = new Form.useForm()
    const [formDescription3] = new Form.useForm()
    const [formDescription4] = new Form.useForm()
    const [formDescription5] = new Form.useForm()
    formDescription.push(formDescription1, formDescription2, formDescription3, formDescription4, formDescription5)

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
        else if (index === 3) {
            setIndex4(value)
        }
        else {
            setIndex5(value)
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
        else if (index === 3) {
            return indexAnswer4
        }
        else {
            return indexAnswer5
        }
    }
    const [formPara] = new Form.useForm()

    const [realpropQuestion, setRealPropQuestion] = useState([])
    const getRealProp = (number) => {
        const prop = []
        for (let index = 0; index < number; index++) {
            prop.push({
                name: `question${index + 1}`,
                label: "Câu hỏi " + (index + 1),
                required: true,
                min: 3,
                max: 45
            })
        }
        setRealPropQuestion(prop);
    }
    const getNumberQuestion = () => {
        if (typeSelected === 1) {
            if (simpleQuesSelected === 2) {
                getRealProp(2);
            }
            else if (simpleQuesSelected === 3) {
                getRealProp(3);
            }
            else if (simpleQuesSelected === 4) {
                getRealProp(4);
            }
            else {
                getRealProp(0)
            }
        }
        if (typeSelected === 2 || typeSelected === 3) {
            getRealProp(5)
            setSimpleQuesSelected(0)
        }
    }

    const setValueFormPara = () => {
        const addValue = {
            idPart: 7,
            content: formPara.getFieldValue('paragraph'),
        }
        addValue["image"] = formPara.getFieldValue('fileImage');
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

    const submitQuestion = () => {

        let listFormAnswer = [];
        for (let i = 0; i < realpropQuestion.length; i++) {
            formQuestion[i].submit();
            formAnswer[i].submit();
            formDescription[i].submit();
            listFormAnswer.push(setValueAddAnswer(i));
        }
        formPara.submit();
        let valueFormPara = setValueFormPara();
        if (!CheckValueField(valueFormPara)) {
            return
        }
        for (let i = 0; i < realpropQuestion.length; i++) {
            if (!CheckValue(formQuestion[i].getFieldValue("question")))
                return
        }
        for (let i = 0; i < listFormAnswer.length; i++) {
            for (let j = 0; j < listFormAnswer[i].length; j++) {
                if (!CheckValueField(listFormAnswer[i][j])) {
                    console.log("Trường dữ liệu không được bỏ trống")
                    return
                }
            }
        }
        console.log("Bắt đầu tạo dữ liệu")
        var form_data = new FormData();
        for (var key in valueFormPara) {
            form_data.append(key, valueFormPara[key]);
        }
        for (let i = 0; i < realpropQuestion.length; i++) {
            form_data.append(`questionParagraphRequests[${i}].contentQues`, formQuestion[i].getFieldValue("question"))
            form_data.append(`questionParagraphRequests[${i}].descriptionQues`, formDescription[i].getFieldValue("description"))
            for (let j = 0; j < 4; j++) {
                form_data.append(`questionParagraphRequests[${i}].answerRequests[${j}].content`, listFormAnswer[i][j].content);
                form_data.append(`questionParagraphRequests[${i}].answerRequests[${j}].isTrue`, listFormAnswer[i][j].isTrue);
            }
        }
        form_data.append("idType", typeSelected);
        addQuestionPara.mutate(form_data)
    }
    const addQuestionPara = UseMutationCustom(addQuestionWithParagraph, "Thêm mới thành công", "Thêm mới thất bại", "getQuestion", null)

    return (
        <>

            <Row align={'middle'} gutter={[16, 16]} style={{ width: "50%", margin: "16px 0px" }}>
                <Col offset={0} span={7}>
                    <p>Chọn loại</p>
                </Col>
                {
                    (!isLoading && !isError) &&
                    <Col span={17}>
                        <Select
                            mode='single'
                            style={{ width: '100%' }}
                            onChange={chooseType}
                            showSearch
                            tokenSeparators={[',']}
                            options={typePara}
                        />
                    </Col>
                }
                {typeSelected === 1 &&
                    <Col offset={0} span={7}>
                        <p>Chọn số câu</p>
                    </Col>
                }

                {typeSelected === 1 &&
                    <Col span={17}>
                        <Select
                            mode='single'
                            style={{ width: '100%' }}
                            onChange={chooseSimple}
                            showSearch
                            tokenSeparators={[',']}
                            options={propQuestionSimple}
                        />
                    </Col>
                }
            </Row >

            {/* Taoj form paragraph */}
            <div style={{ width: "100%" }}>

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
            </div>

            <div style={{ width: "100%" }}>
                <Row align={'middle'} gutter={[8, 8]}>
                    {

                        typeSelected > 0 && realpropQuestion.length > 0 &&
                        realpropQuestion.map((prop, index) => (
                            <Col span={12}>
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
                        ))
                    }
                </Row>
                <Row>
                    <Col offset={6} span={12} >
                        <Button style={{ width: "100%" }} onClick={() => submitQuestion()}>
                            Tạo mới
                        </Button>
                    </Col>
                </Row>
            </div>
        </>

    );
}

export default QuestionPara7;