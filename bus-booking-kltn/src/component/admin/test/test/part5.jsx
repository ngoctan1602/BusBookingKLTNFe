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
        title: 'Lời giải',
        dataIndex: 'description',
        key: 'description',
    },
];

const Part5 = ({ row }) => {
    const { globalState, setGlobalState } = useGlobalState();

    const {
        isLoadingQues,
        isErrorQues,
        errorQues,
        data: getQuestionPart5
    } = useQuery("getQuestionPart5", () => QuestionSV.getQuestionByPartId(5))

    const [questionPart5, setQuestionPart5] = useState([])

    useEffect(() => {
        if (globalState.connect) {
            if (!isLoadingQues && !isErrorQues && getQuestionPart5 !== undefined) {
                setQuestionPart5(getQuestionPart5.data)
            }
        }
    }, [isLoadingQues, globalState.connect, isErrorQues, getQuestionPart5]);

    const onSelectChange = (selectedRowKeys) => {
        updateValue(row.setSelectedRowKeys, selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys: row.selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <Row align={"middle"} gutter={[16, 16]} style={{ width: "100%" }}>
            <Col offset={19} span={3}>
                Số câu đã chọn
            </Col>
            <Col span={2}
            >
                <Tooltip title={"Số câu hỏi part 1 được chọn phải là 6"} color="green" >
                    <p style={{ position: "absolute", color: row.selectedRowKeys.length === 30 ? 'green' : 'red' }}>
                        {row.selectedRowKeys.length}
                    </p>
                    <QuestionCircleOutlined style={{ marginLeft: 20, cursor: 'pointer' }} />
                </Tooltip>
            </Col>
            <Col span={24}>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    rowKey={"id"}
                    pagination={{ pageSize: 5, position: ['bottomCenter'] }}
                    dataSource={(!isLoadingQues && !isErrorQues) ? questionPart5 : null}
                />
            </Col>
        </Row>
    );
}

export default Part5;