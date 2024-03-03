'use client'
import { db } from '@/lib/firebase';
import { UserButton, useUser } from '@clerk/nextjs';
import { Avatar, Breadcrumb, Layout, List, Menu, Space, Tag, Typography, theme } from 'antd';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const { Text } = Typography

function page() {
    const { user } = useUser()
    const [data, setData] = useState<any>([])
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        async function fetchUserNotes() {
            const notesRef = collection(db, 'notes')
            if (user) {
                let notesFetched: any = []
                let listDataTemp: any = []

                const q = query(notesRef, where("isPublished", "==", true))
                const notesSnapshot = await getDocs(q)
                notesSnapshot.forEach((doc) => {
                    const noteData = doc.data()
                    notesFetched.push({
                        href: `/note`,
                        title: noteData.title,
                        avatar: noteData.avatarUrl,
                        description: noteData.summary,
                        content: noteData.summary,
                        id: noteData.id,
                        tags: noteData.tags
                    })
                    listDataTemp.push({ title: doc.data().title })
                })
                setData(notesFetched)
            }
        }
        if (user) {
            fetchUserNotes()
        }
    }, [user])

    return (
        <>
            <nav className='flex justify-between items-center px-5 py-5'>
                <div className='flex gap-8'>
                    <Image src="/assets/intellinotes_logo.png" width={50} height={50} alt='logo' />
                    <Text strong className='flex items-center justify-center text-lg'>Intellinotes</Text>
                    <Link href="/home" className='flex items-center justify-center text-sm no-underline text-gray-500'>Dashboard</Link>
                </div>
                <div className='flex px-4 py-4'>
                    <UserButton />
                </div>
            </nav>
            <div className='px-[400px] pb-[50px] mt-[50px]'>
                <Text strong className='text-[2rem]'>Browse</Text>
                <div>
                    <List
                        itemLayout="vertical"
                        className='mt-[20px]'
                        size="large"
                        pagination={{
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={data}
                        renderItem={(item: any) => (
                            <List.Item
                                key={item.title}
                                extra={
                                    <img
                                        width={272}
                                        alt="logo"
                                        src="https://images.unsplash.com/photo-1546101390-710af0894231?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    />
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<Link href={{
                                        pathname: item.href,
                                        query: {
                                            noteId: item.id,
                                            isBrowsing: true
                                        }
                                    }}>{item.title}</Link>}
                                    description={item.description}
                                />
                                <p className='block'>{item.content}</p>
                                <Space className='mt-[10px]'>
                                    <p style={{ fontSize: "0.7rem" }}>{item.createdAt}</p>
                                    {item.tags.map((t: string, i: number) => (
                                        <Tag key={i} bordered={false} color={getRandomColor()}>{t}</Tag>
                                    ))}
                                </Space>
                            </List.Item>
                        )}
                    />
                </div>
            </div>
        </>
    )
}
export default page

const colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}