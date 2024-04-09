import { Col, Form, Row, Select, Table, Tooltip } from "antd";
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
        title: 'Âm thanh',
        dataIndex: 'audio',
        key: 'audio',
        render: (text) => <audio controls> <source src={text}></source></audio>
    },
];

const Part2 = ({ row }) => {
    const { globalState, setGlobalState } = useGlobalState();

    const {
        isLoadingQues,
        isErrorQues,
        errorQues,
        data: getQuestionPart2
    } = useQuery("getQuestionPart2", () => QuestionSV.getQuestionByPartId(2))

    const [questionPart2, setQuestionPart2] = useState([])

    useEffect(() => {
        if (globalState.connect) {
            if (!isLoadingQues && !isErrorQues && getQuestionPart2 !== undefined) {
                setQuestionPart2(getQuestionPart2.data)
            }
        }
    }, [isLoadingQues, globalState.connect, isErrorQues, getQuestionPart2]);

    const onSelectChange = (selectedRowKeys) => {
        updateValue(row.setSelectedRowKeys, selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys: row.selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <Row align={"middle"} gutter={[16, 16]}>
            <Col offset={19} span={3}>
                Số câu đã chọn
            </Col>
            <Col span={2}
            >
                <Tooltip title={"Số câu hỏi part 1 được chọn phải là 6"} color="green" >
                    <p style={{ position: "absolute", color: row.selectedRowKeys.length === 25 ? 'green' : 'red' }}>
                        {row.selectedRowKeys.length}
                    </p>
                    <QuestionCircleOutlined style={{ marginLeft: 20, cursor: 'pointer' }} />
                </Tooltip>
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
                    dataSource={(!isLoadingQues && !isErrorQues) ? questionPart2 : null}
                />
            </Col>
        </Row>
    );
}

export default Part2;