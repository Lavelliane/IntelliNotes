'use client'
import { db } from "@/lib/firebase"
import { useUser } from "@clerk/nextjs"
import { List, Space, Spin, Tabs, TabsProps, Tag, Typography } from "antd"
import { collection, getDocs, query, where } from "firebase/firestore"
import { list } from "firebase/storage"
import Link from "next/link"
import { useEffect, useState } from "react"

const { Title } = Typography


function MyNotesPage() {
  const { user } = useUser()
  const [userData, setUserData] = useState<any>()
  const [listData, setListData] = useState<any>()
  const [notes, setNotes] = useState<any>([])
  const [publishedOnly, setPublishedOnly] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)

  function handleChange() {
    setPublishedOnly(prev => !prev)
  }

  useEffect(() => {
    async function fetchUserNotes() {
      const notesRef = collection(db, 'notes')
      if (user) {
        let notesFetched: any = []
        let listDataTemp: any = []
        const q = publishedOnly ? query(notesRef, where("userId", "==", user.id), where("isPublished", "==", publishedOnly)) : query(notesRef, where("userId", "==", user.id))
        const notesSnapshot = await getDocs(q)
        notesSnapshot.forEach((doc) => {
          notesFetched.push(doc.data())
          listDataTemp.push({ title: doc.data().title })
        })
        setNotes(notesFetched)
        setListData(listDataTemp)
      }
    }
    if (user) {
      fetchUserNotes()
    }
  }, [user, publishedOnly])

  useEffect(() => {
    console.log(notes)
    console.log(listData)
  }, [notes, listData])

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: "My Notes",
      children: (
        <Spin spinning={isSpinning}>
          <List
            itemLayout="vertical"
            bordered={false}
            dataSource={notes}
            renderItem={(item: any) => (
              <>
                <List.Item>
                  <List.Item.Meta
                    title={<Link href={{
                      pathname: '/note',
                      query: {
                        noteId: item.id
                      }
                    }}>{item.title}</Link>}
                    description={item.summary}
                  />
                  <Space>
                    <p style={{ fontSize: "0.7rem" }}>{item.createdAt}</p>
                    {item.tags.map((t: string, i: number) => (
                      <Tag key={i} bordered={false} color={getRandomColor()}>{t}</Tag>
                    ))}
                  </Space>
                </List.Item>
              </>
            )}
          />
        </Spin>
      )
    },
    {
      key: "2",
      label: "Published",
      children: (
        <Spin spinning={isSpinning}>
          <List
            itemLayout="vertical"
            bordered={false}
            dataSource={notes}
            renderItem={(item: any) => (
              <>
                <List.Item>
                  <List.Item.Meta
                    title={<Link href={{
                      pathname: '/note',
                      query: {
                        noteId: item.id
                      }
                    }}>{item.title}</Link>}
                    description={item.summary}
                  />
                  <Space>
                    <p style={{ fontSize: "0.7rem" }}>{item.createdAt}</p>
                    {item.tags.map((t: string, i: number) => (
                      <Tag key={i} bordered={false} color={getRandomColor()}>{t}</Tag>
                    ))}
                  </Space>
                </List.Item>
              </>
            )}
          />
        </Spin>
      )
    }
  ]

  return (
    <>
      <Title level={3}>My Notes</Title>
      <Tabs defaultActiveKey="1" items={items} onChange={handleChange} />
    </>
  )
}
export default MyNotesPage

const colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}