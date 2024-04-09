import React, { useEffect, useState } from 'react';
import { Button, ConfigProvider, Space, Table, Tag } from 'antd';
import { DeleteOutlined, EditFilled, InfoCircleOutlined } from '@ant-design/icons';
import ModalConfirm from '../../../common/modalConfirm';
import * as yearSV from '../../../../services/yearService'
import { useQuery, useQueryClient } from "react-query";
import ModalAddYear from './modalAddYear';
import UseMutationCustom from '../../../common/useMutationCustom';
const YearRow = () => {
    const queryClient = useQueryClient()
    const {
        isLoading,
        isError,
        error,
        data: getYear
    } = useQuery("getYear", yearSV.getYear)
    const [openModal, setOpenModal] = useState(false)
    const columns = [
        {
            title: 'Năm',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            render: (text) => (
                <>
                    {text !== null ? text : "Không có mô tả"}
                </>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space >
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    defaultHoverBorderColor: 'red'
                                },
                            },
                        }}
                    >
                        <Button onClick={() => setOpenModal(true)} style={{ boxShadow: 'none', color: 'red' }} icon={<DeleteOutlined></DeleteOutlined>}></Button>
                    </ConfigProvider>
                    <ConfigProvider
                        theme={{
                            components: {
                                Button: {
                                    defaultHoverBorderColor: 'green'
                                },
                            },
                        }}
                    >
                        <Button onClick={() => submitUpdate(record)} style={{ boxShadow: 'none', color: 'green' }} icon={<EditFilled />}></Button>
                    </ConfigProvider>

                </Space>
            ),
        },
    ];


    const callModal = (ok) => {
        ok ?
            setOpenModal(false)
            :
            setOpenModal(true)
    }
    const updateYear = (year) => {
        console.log(year)
    }


    const [showUpdate, setShowUpdate] = useState(false)
    const submitUpdate = (record) => {

        for (const key in record) {
            if (Object.hasOwnProperty.call(record, key)) {
                dataCurrent[key] = record[key]
            }
        }
        setShowUpdate(true)
    }
    const cancelUpdate = () => {
        setShowUpdate(false)
    }
    const [dataCurrent, setDataCurrent] = useState(
        {
            id: '',
            year: '',
            description: ''
        }
    );

    return (
        <>
            {openModal && <ModalConfirm message={"Bạn có chắc chắn xóa không"} onSubmit={callModal} open={openModal}></ModalConfirm>}
            {
                showUpdate &&
                <ModalAddYear message="Thêm mới năm phát hành" open={true} onClose={cancelUpdate} isUpdate={true} dataCurrent={dataCurrent}></ModalAddYear>
            }
            {
                isLoading ?
                    <p>Loading</p> :
                    <Table
                        tableLayout='fixed'
                        className='box-shadow'
                        columns={columns}
                        dataSource={getYear.data}
                        pagination={{ pageSize: 4, position: ['bottomCenter'] }}

                    />

            }

        </>
    )
}
export default YearRow;