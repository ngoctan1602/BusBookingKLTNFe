import { Col, Form, Row, Select, Steps, Table, Tooltip, Button } from "antd";
import { useGlobalState } from "../../../common/globaleState";
import * as QuestionSV from "../../../../services/questionService";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import updateValue from "../../../common/changeValueUsestate";
import Icon from "@ant-design/icons/lib/components/Icon";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Item from "antd/es/list/Item";
import SinglePara from "./singlePara";
import DoublePara from "./doublePara";
import TripplePara from "./tripplePara";

const steps = [
    {
        title: 'Đoạn đơn',
        content: 'single',
    },
    {
        title: 'Đoạn đôi',
        content: 'double',
    },
    {
        title: 'Đoạn ba',
        content: 'tripple',
    },

];

const Part7 = ({ singleRow, doubleRow, trippleRow, isSubmit }) => {
    const { globalState, setGlobalState } = useGlobalState();
    const [current, setCurrent] = useState(0);
    const nextStep = () => {
        if (current === 0) {
            if (singleRow.listQuestion.length === 29) {
                setCurrent(current + 1)
            }
            else {
                setGlobalState({ ...globalState, handle: true, message: "Vui lòng chọn số câu hỏi trong part 7 phần đoạn đơn là 29" })
            }
        }
        if (current === 1) {
            if (doubleRow.selectedRowKeys.length === 2) {
                setCurrent(current + 1)
            }
            else {
                setGlobalState({ ...globalState, handle: true, message: "Vui lòng chọn số đoạn văn đôi trong part 7 là 3" })
            }
        }
    }
    useEffect(
        () => {
            if (current === 2) {
                updateValue(isSubmit.setIsSubmit, true)
            }
            else {
                updateValue(isSubmit.setIsSubmit, false)
            }
        }, [current]
    )
    return (

        <Row style={{ width: "100%" }}>
            <Row style={{
                height: 100, width: "100%",
                // background: "yellow"
            }}
                gutter={[16, 16]}>
                <Col span={24} offset={0}>
                    <Steps items={steps}
                        current={current}
                    >

                    </Steps>

                </Col>
                <Col span={1} offset={0} >
                    <Button
                        onClick={() => setCurrent(current - 1)}
                        disabled={current >= 1 ? false : true}
                    >
                        Prev
                    </Button>
                </Col>
                <Col span={2} offset={21}>
                    <Button
                        onClick={nextStep}
                        // onClick={() => setCurrent(current + 1)}
                        disabled={(current >= 0 && current < 2) ? false : true}>
                        Next
                    </Button>
                </Col>

            </Row>
            {
                current === 0 &&
                <SinglePara row={singleRow}></SinglePara>
            }
            {
                current === 1 &&
                <DoublePara row={doubleRow}></DoublePara>
            }
            {
                current === 2 &&
                <TripplePara row={trippleRow}></TripplePara>
            }
        </Row >
    );
}

export default Part7;