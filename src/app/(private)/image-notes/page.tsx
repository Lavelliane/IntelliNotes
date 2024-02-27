'use client'
import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { List, message, Typography, Upload } from 'antd';
import { CornellNotesSummary } from '@/types/types';
import { CornellNotesSummarySchema } from '@/schema/schemas';
import axios from 'axios';
import Editor from '@/components/Editor';
import Link from 'next/link';

const { Dragger } = Upload;
const { Text } = Typography;

const ImageNotesPage: React.FC = () => {
  const [result, setResult] = useState<CornellNotesSummary>();
  const [isUploading, setIsUploading] = useState(true);
  const [references, setReferences] = useState<
    { title: string; link: string }[]
  >([]);

  const props: UploadProps = {
    name: 'file',
    multiple: false,
    accept: ".png,.jpg,.jpeg",
    action: '/api/vision',
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setIsUploading(false)
        try {
          const parsedResult = CornellNotesSummarySchema.parse(
            info.file.response?.result 
          );
          message.success(`${info.file.name} file uploaded successfully.`);
          console.log(parsedResult);
          setResult(parsedResult);
          axios
            .post("/api/search/google", { query: parsedResult.keyword })
            .then((value: any) => {
              setReferences(
                value?.data?.data?.map((v: any) => {
                  return {
                    title: v.title,
                    link: v.formattedUrl,
                  };
                })
              );
            })
            .catch((e) => console.error(e));
        } catch (error) {
          message.error(
            `${info.file.name} file upload failed. Invalid file format.`
          );
          console.error(error);
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      } else if (status === "uploading") {
        setIsUploading(true)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <>
      {isUploading && (
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload only. Maximum PDF size up to 1.5 MB
          </p>
        </Dragger>
      )}

      { !isUploading && result && (
        <>
          <Editor content={ { cornell: result } } readonly={false} isUpdating={false} />
          <Text strong>References (View Only)</Text>
              <List
                style={{
                  borderRadius: "8px",
                  borderTop: "3px solid #2acfec",
                  padding: "20px 0px 0px 30px",
                  marginTop: "20px",
                }}
                size="large"
                pagination={{ pageSize: 5 }}
                bordered
                dataSource={references}
                renderItem={(item) => (
                  <List.Item>
                    <Link href={item.link}>{item.title}</Link>
                  </List.Item>
                )}
              />
        </>
      )}
    </>

  );
}

export default ImageNotesPage;