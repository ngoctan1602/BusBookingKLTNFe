import { Row, Col, ConfigProvider, Button, Tooltip, Divider } from "antd";
import YearRow from "./year";
import TopicRow from "./topic";
import { useState } from "react";
import { FileAddFilled } from "@ant-design/icons";
import ModalAddYear from "./modalAddYear";

import ModalAddTopic from "./modalAddTopic";
const ManageYearTopicOfTest = () => {
    const [openModalAdd, setOpenModelAdd] = useState(false)
    const callAdd = () => {
        setOpenModelAdd(false)
    }
    const [openModalAddTopic, setOpenModalAddTopic] = useState(true)
    const callAddTopic = () => {
        setOpenModalAddTopic(false)
    }
    return (
        <>
            {
                openModalAdd &&
                <ModalAddYear message="Thêm mới năm phát hành" open={true} onClose={callAdd} ></ModalAddYear>
            }
            {
                openModalAddTopic &&
                <ModalAddTopic message="Thêm mới bộ đề" open={true} onClose={callAddTopic} ></ModalAddTopic>
            }

            {/* {
                openModalAddTopic && <ModalAdd></ModalAdd>
            } */}

            <Row gutter={[16, 16]} style={{ minHeight: '100%', width: '100%' }} >
                <Col Col span={23} >
                    <YearRow ></YearRow>
                </Col >
                <Col span={1} >
                    <Tooltip title={"Thêm mới năm phát hành"} color="green">
                        <Button
                            onClick={() => setOpenModelAdd(true)}
                            block style={{ marginTop: '5px' }}
                            icon={<FileAddFilled
                                style={{ color: 'green' }} />}>

                        </Button>
                    </Tooltip>
                </Col>
            </Row >
            <Divider></Divider>
            <Row gutter={[16, 16]} style={{ minHeight: '100%', width: '100%' }} >
                <Col Col span={23} >
                    <TopicRow />
                </Col >
                <Col span={1} >
                    <Tooltip title={"Thêm mới bộ đề"} color="green">
                        <Button
                            onClick={() => setOpenModalAddTopic(true)}
                            block style={{ marginTop: '5px' }}
                            icon={<FileAddFilled
                                style={{ color: 'green' }} />}>

                        </Button>
                    </Tooltip>
                </Col>
            </Row >
        </>
    );
}

export default ManageYearTopicOfTest;