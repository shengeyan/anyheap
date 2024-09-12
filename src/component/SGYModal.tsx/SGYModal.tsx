import React, { useState } from 'react'
import styles from './index.module.scss'
import { Modal } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Upload } from 'antd'
import type { ModalProps } from './type'

const { Dragger } = Upload

const SGYModal: React.FC<ModalProps> = ({ onModalClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(true)

    // File Data
    const props: UploadProps = {
        name: 'file',
        multiple: false,
        action: 'https://heap.crazyfay.com/upload',
        onChange(info) {
            const { status } = info.file
            if (status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`)
                onModalClick(true)
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`)
                onModalClick(false)
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files)
        },
    }

    // Submit
    // const handleOk = () => {
    //     setIsModalOpen(false)
    //     onModalClick()
    // }

    // Cancel
    const handleCancel = () => {
        setIsModalOpen(false)
        onModalClick(false)
    }

    return (
        <>
            <Modal
                title="上传数据"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        单击或拖动文件到此区域进行上传
                    </p>
                    <p className="ant-upload-hint">
                        仅支持单个文件上传 禁止上传公司数据或其他被禁文件。
                    </p>
                </Dragger>
            </Modal>
        </>
    )
}

export default SGYModal
