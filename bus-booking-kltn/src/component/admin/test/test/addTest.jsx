import { Button, Col, Form, Row, Steps, Table } from "antd";
import { useState } from "react";
import Part1 from "./part1";
import Part2 from "./part2";
import CheckValue from "../../../common/checkEmtyValue";
import { useGlobalState } from "../../../common/globaleState";
import Part3 from "./part3";
import Part4 from "./part4";
import Part5 from "./part5";
import Part6 from "./part6";
import Part7 from "./part7";
import UseMutationCustom from "../../../common/useMutationCustom";
import { createNewTest } from "../../../../services/testServices";


const steps = [
    {
        title: 'Part 1',
        content: 'Part-1',
    },
    {
        title: 'Part 2',
        content: 'Part-2',
    },
    {
        title: 'Part 3',
        content: 'Part-3',
    },
    {
        title: 'Part 4',
        content: 'Part-4',
    },
    {
        title: 'Part 5',
        content: 'Part-5',
    },
    {
        title: 'Part 6',
        content: 'Part-6',
    },
    {
        title: 'Part 7',
        content: 'Part-7',
    },
];
const AddNewTest = () => {
    const { globalState, setGlobalState } = useGlobalState();
    const [current, setCurrent] = useState(0);

    const [yearSelected, setYearSelected] = useState();
    const [topicSelected, setTopicSelected] = useState();
    const [nameTest, setNameTest] = useState();

    const [listQuestionPart1, setlistQuestionPart1] = useState([]);
    const [listQuestionPart2, setlistQuestionPart2] = useState([]);

    const [listParaPart3, setListParaPart3] = useState([]);
    const [listQuestionPart3, setListQuestionPart3] = useState([]);

    const [listParaPart4, setListParaPart4] = useState([]);
    const [listQuestionPart4, setListQuestionPart4] = useState([]);


    const [listQuestionPart5, setlistQuestionPart5] = useState([]);
    const [listParaPart6, setListParaPart6] = useState([]);
    const [listQuestionPart6, setListQuestionPart6] = useState([]);

    const [listSingleParaPart7, setListSingleParaPart7] = useState([]);
    const [listQuestionSingle, setListQuestionSingle] = useState([]);

    const [listDoubleParaPart7, setListDoubleParaPart7] = useState([]);
    const [listQuestionDouble, setListQuestionDouble] = useState([]);

    const [listTrippleParaPart7, setTrippleParaPart7] = useState([]);
    const [listQuestionTripple, setListQuestionTripple] = useState([]);

    const [isSubmit, setIsSubmit] = useState(false);

    const nextStep = () => {
        // setCurrent(6)
        if (current === 0) {
            if (CheckValue(yearSelected) && CheckValue(topicSelected) &&
                listQuestionPart1.length === 6) {
                setCurrent(current + 1)
            }
            else {
                setGlobalState({ ...globalState, handle: true, message: "Vui lòng chọn đầy đủ năm ra đề, đề thi và số lượng câu hỏi part 1 là 6" })
            }
        }
        else if (current === 1) {
            if (listQuestionPart2.length === 25) {
                setCurrent(current + 1)
            }
            else {
                setGlobalState({ ...globalState, handle: true, message: "Vui lòng chọn số câu trong part 2 là 25" })
            }
        }
        else if (current === 2) {
            if (listParaPart3.length === 13) {
                setCurrent(current + 1)
            }
            else {
                setGlobalState({ ...globalState, handle: true, message: "Vui lòng chọn số đoạn văn trong part 3 là 13" })
            }
        }
        else if (current === 3) {
            if (listParaPart4.length === 10) {
                setCurrent(current + 1)
            }
            else {
                setGlobalState({ ...globalState, handle: true, message: "Vui lòng chọn số đoạn văn trong part 4 là 10" })
            }
        }
        else if (current === 4) {
            if (listQuestionPart5.length === 30) {
                setCurrent(current + 1)
            }
            else {
                setGlobalState({ ...globalState, handle: true, message: "Vui lòng chọn số câu hỏi trong part 5 là 30" })
            }
        }
        else if (current === 5) {
            if (listParaPart6.length === 4) {
                setCurrent(current + 1)
            }
            else {
                setGlobalState({ ...globalState, handle: true, message: "Vui lòng chọn số đoạn văn trong part 6 là 4" })
            }
        }
    }
    const addNewTest = UseMutationCustom(createNewTest, "Thêm mới thành công", "Thêm mới thất bại", "getTest", null)

    const createTest = () => {
        if (listTrippleParaPart7.length === 3) {
            const listQuestion = listQuestionPart1.concat(listQuestionPart2, listQuestionPart3, listQuestionPart4, listQuestionPart5, listQuestionPart6, listQuestionSingle, listQuestionDouble, listQuestionTripple)
            const listParagraph = listParaPart3.concat(listParaPart3, listParaPart4, listParaPart6, listSingleParaPart7, listDoubleParaPart7, listTrippleParaPart7)
            const test = {
                idYear: yearSelected,
                idTopic: topicSelected,
                name: nameTest,
                listParagraph: listParagraph,
                listQuestion: listQuestion
            }
            addNewTest.mutate(test)
        }
        else {
            setGlobalState({ ...globalState, handle: true, message: "Vui lòng chọn số đoạn ba trong part 7 là 3" })
        }
    }
    return (
        <div>
            <Steps items={steps} current={current}>

            </Steps>
            <Row style={{ minHeight: "400px", margin: "16px 0px" }}>
                {
                    (current === 0) &&
                    <Col span={24}>
                        <Part1
                            name={{ nameTest: nameTest, setNameTest: setNameTest }}
                            year={{ yearSelected: yearSelected, setYearSelected: setYearSelected }}
                            topic={{ topicSelected: topicSelected, setTopicSelected: setTopicSelected }}
                            row={{ selectedRowKeys: listQuestionPart1, setSelectedRowKeys: setlistQuestionPart1 }}
                        ></Part1>
                    </Col>
                }
                {
                    (current === 1) &&
                    <Col span={24}>
                        <Part2 row={{ selectedRowKeys: listQuestionPart2, setSelectedRowKeys: setlistQuestionPart2 }}
                        ></Part2>
                    </Col>
                }
                {
                    current === 2 &&
                    <Part3 row={{
                        selectedRowKeys: listParaPart3, setSelectedRowKeys: setListParaPart3,
                        listQuestion: listQuestionPart3, setListQuestion: setListQuestionPart3
                    }}
                    ></Part3>
                }
                {
                    current === 3 &&
                    <Part4 row={{
                        selectedRowKeys: listParaPart4, setSelectedRowKeys: setListParaPart4,
                        listQuestion: listQuestionPart4, setListQuestion: setListQuestionPart4
                    }}
                    ></Part4>
                }
                {
                    current === 4 &&
                    <Part5 row={{ selectedRowKeys: listQuestionPart5, setSelectedRowKeys: setlistQuestionPart5 }}
                    ></Part5>
                }
                {
                    current === 5 &&
                    <Part6 row={{
                        selectedRowKeys: listParaPart6, setSelectedRowKeys: setListParaPart6,
                        listQuestion: listQuestionPart6, setListQuestion: setListQuestionPart6
                    }}
                    ></Part6>
                }
                {
                    current === 6 &&
                    <Part7 singleRow={{
                        selectedRowKeys: listSingleParaPart7, setSelectedRowKeys: setListSingleParaPart7,
                        listQuestion: listQuestionSingle, setListQuestion: setListQuestionSingle
                    }}
                        doubleRow={{
                            selectedRowKeys: listDoubleParaPart7, setSelectedRowKeys: setListDoubleParaPart7,
                            listQuestion: listQuestionDouble, setListQuestion: setListQuestionDouble
                        }}
                        trippleRow={{
                            selectedRowKeys: listTrippleParaPart7, setSelectedRowKeys: setTrippleParaPart7,
                            listQuestion: listQuestionTripple, setListQuestion: setListQuestionTripple
                        }}
                        isSubmit={{ isSubmit: isSubmit, setIsSubmit: setIsSubmit }}
                    ></Part7>
                }
            </Row>

            <Row style={{}}>
                <Col span={1} offset={0}>
                    <Button
                        onClick={() => setCurrent(current - 1)}
                        disabled={current >= 1 ? false : true}>
                        Prev
                    </Button>
                </Col>
                <Col span={1} offset={21}>
                    {
                        (current === 6 && isSubmit) ?
                            <Button
                                onClick={createTest}
                            >
                                Tạo bài thi
                            </Button> :
                            <Button
                                onClick={nextStep}
                                disabled={(current >= 0 && current <= 5) ? false : true}>
                                Next
                            </Button>
                    }
                </Col>
            </Row>
        </div >
    );
}

export default AddNewTest;