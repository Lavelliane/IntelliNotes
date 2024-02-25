'use client'
import { db } from '@/lib/firebase';
import { useUser } from '@clerk/nextjs';
import { Avatar, List, Space } from 'antd';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// const data = Array.from({ length: 23 }).map((_, i) => ({
//     href: 'https://ant.design',
//     title: `ant design part ${i}`,
//     avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
//     description:
//       'Ant Design, a design language for background applications, is refined by Ant UED Team.',
//     content:
//       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//   }));

function page() {
    const { user } = useUser()
    const [data, setData] = useState<any>([])

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
                        id: noteData.id
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
         <List
                itemLayout="vertical"
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
                                src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
                        {item.content}
                    </List.Item>
                )}
            />
        </>
    )
}
export default page