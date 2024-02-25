'use client'

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import EditorJS from "@editorjs/editorjs"
import { Button, Modal, Select, SelectProps, Typography } from 'antd';
import { CornellInitialEditorFormat } from '@/utils/cornellInitialEditorFormat';
import ExcalidrawWrapper from './ExcalidrawWrapper';
import { useUser } from "@clerk/clerk-react";
import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import dayjs from 'dayjs';
import { createId } from '@paralleldrive/cuid2';
import { useRouter } from 'next/navigation';


interface Props {
  content?: any
  firebaseEditorData?: any
  noteId?: string
  readonly: boolean
  isUpdating: boolean
}

const { Title } = Typography;

const Editor: React.FC<Props> = ({ content, readonly = false, firebaseEditorData, isUpdating, noteId }) => {

  const [isMounted, setIsMounted] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const { isSignedIn, user, isLoaded } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const ref = useRef<EditorJS>()
  const router = useRouter()

  //MODAL
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Table = (await import("@editorjs/table")).default
    const NestedList = (await import("@editorjs/nested-list")).default
    const LinkTool = (await import("@editorjs/link")).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editorjs",
        tools: {
          header: Header,
          table: Table,
          list: {
            class: NestedList,
            inlineToolbar: true,
            config: {
              defaultStyle: 'unordered'
            }
          },
          linkTool: LinkTool
        },
        readOnly: readonly,
        data: {
          time: 1552744582955,
          blocks: content ? (CornellInitialEditorFormat(content.cornell) ?? []) : (firebaseEditorData.blocks ?? [])
        }
      })
      ref.current = editor
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()
    }
    if (isMounted) {
      init()

      return () => {
        if (ref.current) {
          ref.current.destroy()
        }
      }
    }
  }, [isMounted])

  const save = async (toPublish: boolean = false) => {
    if (ref.current) {
      ref.current.save().then(async (outputData: any) => {
        console.log(outputData)
        console.log(user)
        console.log(isUpdating, noteId)

        const notesRef = collection(db, 'notes')
        if (!isUpdating) {
          const createdNote = await addDoc(notesRef, {
            editorData: outputData,
            userId: user?.id,
            isPublished: toPublish,
            avatarUrl: user?.imageUrl,
            title: content.cornell.keyword || outputData.blocks[0].data.text,   //get title
            summary: content.cornell.summary[0],
            createdAt: dayjs().format('MMMM DD, YYYY'),
            updatedAt: dayjs().format('MMMM DD, YYYY'),
            tags: categories || [],
          })
          if (createdNote) {
            await updateDoc(doc(db, 'notes', createdNote.id), { id: createdNote.id })
          }
        } else if (isUpdating && noteId) {
          console.log('UPDATE START')
          await updateDoc(doc(db, 'notes', `${noteId}`), {
            editorData: outputData,
            isPublished: toPublish,
            updatedAt: dayjs().format('MMMM DD, YYYY'),
            tags: categories || [],
          })
        }
      })
      router.push('/home')
    }
  }
  const handleChange = (value: any) => {
    setCategories(value)
  };


  return (
    <>
      <div id='editorjs' style={{ height: "auto", paddingBottom: "0px" }}></div>
      <Title level={3} style={{ textAlign: "center" }}>Visualize your thoughts 🖼️💡</Title>
      <ExcalidrawWrapper content={content?.cornell?.mindMap || []} />
      <Button type='primary' onClick={showModal} size='large' style={{ margin: "20px auto", display: "block", marginTop: "20px" }}>Confirm Changes</Button>
      <Modal title="Confirm Changes" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Select
          mode="tags"
          style={{ width: '100%', marginTop: "20px", marginBottom: "20px" }}
          placeholder="Tags Mode"
          onChange={handleChange}
          options={subjects}
          
        />
        <Button onClick={() => save(false)} type='primary' style={{ marginRight: "10px"}}>Save</Button>
        <Button onClick={() => save(true)} type='primary' ghost>Publish</Button>
      </Modal>
    </>

  )
}

export default Editor

export const subjects: SelectProps['options'] = [
  { label: "Mathematics", value: "mathematics" },
  { label: "Physics", value: "physics" },
  { label: "Biology", value: "biology" },
  { label: "Chemistry", value: "chemistry" },
  { label: "Computer Science", value: "computer_science" },
  { label: "Engineering", value: "engineering" },
  { label: "Psychology", value: "psychology" },
  { label: "Sociology", value: "sociology" },
  { label: "History", value: "history" },
  { label: "Literature", value: "literature" },
  { label: "Economics", value: "economics" },
  { label: "Political Science", value: "political_science" },
  { label: "Geography", value: "geography" },
  { label: "Anthropology", value: "anthropology" },
  { label: "Philosophy", value: "philosophy" },
  { label: "Art History", value: "art_history" },
  { label: "Music", value: "music" },
  { label: "Languages", value: "languages" },
  { label: "Health Sciences", value: "health_sciences" },
  { label: "Environmental Science", value: "environmental_science" },
  { label: "Astronomy", value: "astronomy" },
  { label: "Statistics", value: "statistics" },
  { label: "Education", value: "education" },
  { label: "Business Administration", value: "business_administration" },
  { label: "Law", value: "law" },
  { label: "Medicine", value: "medicine" },
  { label: "Others", value: "others" }
];