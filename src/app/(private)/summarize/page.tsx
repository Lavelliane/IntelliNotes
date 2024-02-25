"use client";
import React, { useEffect, useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { GetProp, UploadProps } from "antd";
import { Col, message, Row, Upload, Typography, List, Spin } from "antd";
import { CornellNotesSummary } from "@/types/types";
import { CornellNotesSummarySchema } from "@/schema/schemas";
import dynamic from "next/dynamic";
import axios from "axios";
import Link from "next/link";

const Editor = dynamic(() => import('../../../components/Editor'), {
  ssr: false
})

const { Dragger } = Upload;
const { Text } = Typography;
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

function SummarizeNotesPage() {
  const [result, setResult] = useState<CornellNotesSummary>();
  const [currentCue, setCurrentCue] = useState(0);
  const [cornellNotes, setCornellNotes] = useState<string[]>([]);
  const [cornellQuestions, setCornellQuestions] = useState<string[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [isUploading, setIsUploading] = useState(true);
  const [references, setReferences] = useState<
    { title: string; link: string }[]
  >([]);

  const props: UploadProps = {
    name: "file",
    accept: ".pdf",
    maxCount: 1,
    multiple: true,
    action: "/api/summarize",
    beforeUpload(file: FileType) {
      const isPDF = file.type === "application/pdf";
      if (!isPDF) {
        message.error("You can only upload PDF files");
      }
      const isLt2M = file.size / 1024 / 1024 < 1.5;
      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }
      return isPDF && isLt2M;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setSpinning(false);
        setIsUploading(false)
        try {
          const parsedResult = CornellNotesSummarySchema.parse(
            JSON.parse(info.file.response?.result ?? "")
          );
          message.success(`${info.file.name} file uploaded successfully.`);
          console.log(parsedResult);
          setResult(parsedResult);
          setCornellNotes(parsedResult.cornellNotes[0].notes);
          setCornellQuestions(parsedResult.cornellNotes[0].questions);
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
        setSpinning(false);
        message.error(`${info.file.name} file upload failed.`);
      } else if (status === "uploading") {
        setSpinning(true);
        setIsUploading(true)
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  function handleCueClick(idx: number) {
    setCurrentCue(idx);
    if (result) {
      setCornellNotes(result.cornellNotes[idx].notes);
      setCornellQuestions(result.cornellNotes[idx].questions);
    }
  }

  return (
    <div>
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

      {/* <Spin spinning={spinning}>
        <div className={styles.outputSummaryContainer}>
          <Row gutter={[16, 24]}>
            <Col span={8}>
              <Text strong>Cues</Text>
              {result?.cornellNotes.map((c, i) => (
                <div
                  onClick={() => handleCueClick(i)}
                  key={i}
                >
                  <CuesCard
                    content={c.cue}
                    idx={i + 1}
                    currentCue={currentCue}
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
          <Row
            gutter={[16, 24]}
            style={{ marginTop: "20px" }}
          >
            <Col span={24}>
              <Text strong>References</Text>
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
            </Col>
          </Row>
        </div>
      </Spin> */}
    </div>
  );
}
export default SummarizeNotesPage;
