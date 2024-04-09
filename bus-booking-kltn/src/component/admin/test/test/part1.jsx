import { Col, Form, Row, Select, Table, Tooltip, Input } from "antd";
import { useGlobalState } from "../../../common/globaleState";
import * as YearSV from "../../../../services/yearService";
import * as TopicSV from "../../../../services/topicService";
import * as QuestionSV from "../../../../services/questionService";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import updateValue from "../../../common/changeValueUsestate";
import Icon from "@ant-design/icons/lib/components/Icon";
import { QuestionCircleOutlined } from "@ant-design/icons";
const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Nội dung',
        dataIndex: 'content',
        key: 'content',
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'image',
        key: 'image',
        align: 'center',
        render: (text) => <img style={{ width: 50, height: 50 }} src={text}></img>
    },
    {
        title: 'Âm thanh',
        dataIndex: 'audio',
        key: 'audio',
        render: (text) => <audio controls> <source src={text}></source></audio>
    },
];

const Part1 = ({ name, year, topic, row }) => {
    const { globalState, setGlobalState } = useGlobalState();
    const handleChange = (value, isYear) => {
        if (isYear) {
            updateValue(year.setYearSelected, value)
        }
        else {
            updateValue(topic.setTopicSelected, value)
        }
    };
    const [years, setYears] = useState([])
    const {
        isLoadingQues,
        isErrorQues,
        errorQues,
        data: getQuestion
    } = useQuery("getQuestion", () => QuestionSV.getQuestionByPartId(1))
    const {
        isLoading,
        isError,
        error,
        data: getYear
    } = useQuery("getYear", YearSV.getYear)

    const [topics, setTopics] = useState([])
    const {
        isLoadingTopic,
        isErrorTopic,
        errorTopic,
        data: getTopic
    } = useQuery("getTopic", TopicSV.getTopic)

    const [questionPart1, setQuestionPart1] = useState([])

    useEffect(() => {
        if (globalState.connect) {
            // Fetch data for year
            if (!isLoading && !isError && getYear !== null && getYear !== undefined) {
                const updateYear = getYear.data.map(element => ({
                    value: element.id,
                    label: element.year
                }));
                setYears(updateYear);
            }

            // Fetch data for topic
            if (!isLoadingTopic && !isErrorTopic && getTopic !== null && getTopic !== undefined) {
                const updateTopic = getTopic.data.map(element => ({
                    value: element.id,
                    label: element.name
                }));
                setTopics(updateTopic);
            }

            // Fetch data for questions
            if (!isLoadingQues && !isErrorQues && getQuestion !== null && getQuestion !== undefined) {
                setQuestionPart1(getQuestion.data);
            }
        }
    }, [globalState.connect, isLoading, isError, getYear, isLoadingTopic, isErrorTopic, getTopic, isLoadingQues, isErrorQues, getQuestion]);


    // const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (selectedRowKeys) => {
        // setSelectedRowKeys(selectedRowKeys);
        updateValue(row.setSelectedRowKeys, selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys: row.selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <Row align={"middle"} gutter={[16, 16]} style={{ width: "100%" }}>
            <Row style={{ width: "100%" }} align={"middle"} gutter={[16, 16]}>
                <Col span={2} offset={0}>
                    Tên đề thi
                </Col>
                <Col span={20}>

                    <Input value={name.nameTest} onChange={(e) => name.setNameTest(e.target.value)}>
                    </Input>
                </Col>
            </Row>
            <Col span={2}>
                Chọn năm
            </Col>
            <Col span={8}>
                <Select
                    mode='single'
                    style={{ width: '100%' }}
                    onChange={(value) => handleChange(value, true)}
                    showSearch
                    value={year.yearSelected}
                    options={years}
                />
            </Col>
            <Col span={2}>
                Chọn đề thi
            </Col>
            <Col span={8}>
                <Select
                    mode='single'
                    style={{ width: '100%' }}
                    showSearch
                    onChange={(value) => handleChange(value, false)}
                    value={topic.topicSelected}
                    options={topics}
                />
            </Col>
            <Col span={2}>
                Số câu đã chọn
            </Col>
            <Col span={2}
            >
                <Tooltip title={"Số câu hỏi part 1 được chọn phải là 6"} color="green" >
                    <p style={{ position: "absolute", color: row.selectedRowKeys.length === 6 ? 'green' : 'red' }}>
                        {row.selectedRowKeys.length}
                    </p>

                    <QuestionCircleOutlined style={{ marginLeft: 20, cursor: 'pointer' }} />
                </Tooltip>
                {/* {selectedRowKeys.length} */}
            </Col>
            <Col span={24}>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    expandable={{
                        expandedRowRender: (record) => (
                            <p
                                style={{
                                    margin: "0px 8px",
                                }}
                            >
                                Lời giải: {record.description}
                            </p>
                        ),
                    }}
                    rowKey={"id"}
                    pagination={{ pageSize: 5, position: ['bottomCenter'] }}
                    dataSource={(!isLoadingQues && !isErrorQues) ? questionPart1 : null}
                />
            </Col>
        </Row>
    );
}

export default Part1;