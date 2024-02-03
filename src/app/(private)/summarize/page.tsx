"use client";
import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import {
  Col,
  message,
  Row,
  Upload,
  Typography,
  Divider,
  List,
  Spin,
} from "antd";
import { CornellNotesSummary } from "@/types/types";
import { CornellNotesSummarySchema } from "@/schema/schemas";
import styles from "./summarize.module.css";
import CuesCard from "@/components/CuesCard";

const { Dragger } = Upload;
const { Text } = Typography;

function SummarizeNotesPage() {
  const [result, setResult] = useState<CornellNotesSummary>();
  const [cornellNotes, setCornellNotes] = useState<string[]>([]);
  const [cornellQuestions, setCornellQuestions] = useState<string[]>([]);
  const [spinning, setSpinning] = useState(false)

  const props: UploadProps = {
    name: "file",
    multiple: true,
    action: "/api/summarize",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setSpinning(false)
        try {
          const parsedResult = CornellNotesSummarySchema.parse(
            JSON.parse(info.file.response?.result ?? "")
          );
          message.success(`${info.file.name} file uploaded successfully.`);
          console.log(parsedResult);
          setResult(parsedResult);
        } catch (error) {
          message.error(
            `${info.file.name} file upload failed. Invalid file format.`
          );
          console.error(error);
        }
      } else if (status === "error") {
        setSpinning(false)
        message.error(`${info.file.name} file upload failed.`);
      } else if (status === "uploading") {
        setSpinning(true)
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  function handleCueClick(idx: number) {
    if (result) {
      setCornellNotes(result.cornellNotes[idx].notes);
      setCornellQuestions(result.cornellNotes[idx].questions);
    }
  }

  useEffect(() => {
    console.log(cornellNotes);
  }, [cornellNotes]);

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Maximum PDF size up to 1.5 MB
        </p>
      </Dragger>
      <Spin spinning={spinning}>
        <div className={styles.outputSummaryContainer}>
          <Row gutter={[16, 24]}>
            <Col span={8}>
              <Text strong>Cues</Text>
              {result?.cornellNotes.map((c, i) => (
                <div onClick={() => handleCueClick(i)} key={i}>
                  <CuesCard
                    content={c.cue}
                    idx={i + 1}
                  />
                </div>
              ))}
            </Col>
            <Col span={16}>
              <Text strong>Notes</Text>
              <List
                style={{
                  borderRadius: "8px",
                  borderTop: "3px solid #e24268",
                  padding: "20px 0px 0px 30px",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
                size="large"
                bordered
                dataSource={cornellNotes}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
              <Text strong>Questions</Text>
              <List
                style={{
                  borderRadius: "8px",
                  borderTop: "3px solid #e8f354",
                  padding: "20px 0px 0px 30px",
                  marginTop: "20px",
                }}
                size="large"
                bordered
                dataSource={cornellQuestions}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Col>
          </Row>
          <Row gutter={[16, 24]}>
            <Col span={24}>
              <Text strong>Summary</Text>
              <List
                style={{
                  borderRadius: "8px",
                  borderTop: "3px solid #5bd2a2",
                  padding: "20px 0px 0px 30px",
                  marginTop: "20px",
                }}
                size="large"
                bordered
                dataSource={result?.summary}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
}
export default SummarizeNotesPage;
