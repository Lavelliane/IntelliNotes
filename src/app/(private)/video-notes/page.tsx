'use client'
import { CornellNotesSummarySchema } from "@/schema/schemas"
import { Button, Input, Spin, Typography } from "antd"
import axios from "axios"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Editor = dynamic(() => import('../../../components/Editor'), {
  ssr: false
})

const { Text } = Typography

function VideoNotesPage() {

  const [videoUrl, setVideoUrl] = useState('')
  const [result, setResult] = useState<any>()
  const [isUploading, setIsUploading] = useState(true)
  const router = useRouter()

  const summarizeVideo = async () => {
    try {
      const res = await axios.post('/api/video-summarize', {
        url: videoUrl
      })
      if (res) {
        setIsUploading(false)
        const parsedResult = CornellNotesSummarySchema.parse(JSON.parse(res.data.result) ?? "")
        setResult(parsedResult)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {!result && (
        <div style={{ width: "500px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
          <Text>Enter YouTube video URL</Text>
          <Input allowClear name="url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          <Button type="primary" onClick={summarizeVideo}>Summarize</Button>
        </div>
      )

      }

      {result && (
        <>
          <Spin spinning={!result}>
            <Editor content={{ cornell: result }} readonly={false} isUpdating={false} />
          </Spin>
        </>
      )}
    </>
  )
}
export default VideoNotesPage