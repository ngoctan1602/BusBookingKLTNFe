import { Col, Form, Row, Select, Table, Tooltip } from "antd";
import { useGlobalState } from "../../../common/globaleState";
import * as PartSV from "../../../../services/paragraphServices";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import updateValue from "../../../common/changeValueUsestate";
import Icon from "@ant-design/icons/lib/components/Icon";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Item from "antd/es/list/Item";
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

const Part6 = ({ row }) => {
    const { globalState, setGlobalState } = useGlobalState();

    const {
        isLoadingPara,
        isErrorPara,
        errorQues,
        data: getParaPart6
    } = useQuery("getParaPart6", () => PartSV.getParagraphWitPart({ idPart: 6 }))

    const [paragraphs, setParagraphs] = useState([])

    useEffect(() => {
        if (globalState.connect) {
            if (!isLoadingPara && !isErrorPara && getParaPart6 !== undefined) {
                if (getParaPart6.data !== null)
                    setParagraphs(getParaPart6.data.listPara)
            }
        }
    }, [isLoadingPara, globalState.connect, isErrorPara, getParaPart6]);

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
    return (

        <Row align={"middle"} gutter={[16, 16]} style={{ width: "100%" }}>
            <Col offset={19} span={3}>
                Số câu đã chọn
            </Col>
            <Col span={2}
            >
                <Tooltip title={"Số đoạn văn được chọn phải là 13"} color="green" >
                    <p style={{ position: "absolute", color: row.selectedRowKeys.length === 4 ? 'green' : 'red' }}>
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
                                Câu hỏi: {record.listQues.map((item, index) =>
                                (<p>
                                    {item.content}
                                </p>))
                                }
                            </p>
                        ),
                    }}
                    rowKey={"id"}
                    pagination={{ pageSize: 5, position: ['bottomCenter'] }}
                    dataSource={(!isLoadingPara && !isErrorPara) ? paragraphs : null}
                />
            </Col>
        </Row>
    );
}

export default Part6;