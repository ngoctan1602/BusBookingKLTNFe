import { Col, Form, Row, Select, Steps, Table, Tooltip, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useGlobalState } from "../../../common/globaleState";
import * as QuestionSV from "../../../../services/questionService";
import updateValue from "../../../common/changeValueUsestate";
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
        dataIndex: 'img',
        key: 'img',
        render: (text) => <img style={{ width: 50, height: 50 }} src={text}></img>
    },

];
const SinglePara = ({ row }) => {
    const { globalState, setGlobalState } = useGlobalState();
    const {
        isLoadingPara,
        isErrorPara,
        errorQues,
        data: getParaPart7Single
    } = useQuery("getParaPart7Single", () => QuestionSV.getParagraphByPartAndType({ idPart: 7, idType: 1 }))

    const [paragraphs, setParagraphs] = useState([])
    const onSelectChange = (selectedRowKeys, selectedRows) => {
        let listQuestion = [];
        for (let i = 0; i < selectedRows.length; i++) {
            for (let j = 0; j < selectedRows[i].listQues.length; j++) {
                listQuestion.push(selectedRows[i].listQues[j].id)
            }
        }
        updateValue(row.setListQuestion, listQuestion)
        updateValue(row.setSelectedRowKeys, selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys: row.selectedRowKeys,
        onChange: onSelectChange,
    };

    useEffect(() => {
        if (globalState.connect) {
            if (!isLoadingPara && !isErrorPara && getParaPart7Single !== undefined) {
                if (getParaPart7Single.data !== null) {
                    setParagraphs(getParaPart7Single.data)
                    // console.log(getParaPart7Single.data)
                }
            }
        }
    }, [isLoadingPara, globalState.connect, isErrorPara, getParaPart7Single]);
    return (

        <Row align={"middle"} gutter={[16, 16]} style={{ width: "100%" }}>
            <Col offset={19} span={3}>
                Số câu đã chọn
            </Col>
            <Col span={2}
            >
                <Tooltip title={"Số câu hỏi part 1 được chọn phải là 6"} color="green" >
                    <p style={{ position: "absolute", color: row.listQuestion.length === 29 ? 'green' : 'red' }}>
                        {row.listQuestion.length}
                    </p>
                    <QuestionCircleOutlined style={{ marginLeft: 20, cursor: 'pointer' }} />
                </Tooltip>
            </Col>
            <Col span={24}>
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    rowKey={"id"}
                    expandable={{
                        expandedRowRender: (record) => (
                            <p
                                style={{
                                    margin: "0px 8px",
                                    textAlign: 'start'
                                }}
                            >
                                Câu hỏi: {record.listQues.map((item, index) =>
                                (<p>
                                    {item.content}
                                </p>))
                                }
                            </p>
                        ),
                    }}
                    pagination={{ pageSize: 5, position: ['bottomCenter'] }}
                    dataSource={(!isLoadingPara && !isErrorPara) ? paragraphs : null}
                />
            </Col>
        </Row>

    );
}

export default SinglePara;