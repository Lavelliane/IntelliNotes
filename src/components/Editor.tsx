'use client'

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import EditorJS from "@editorjs/editorjs"
import { Button, Typography } from 'antd';
import { CornellInitialEditorFormat } from '@/utils/cornellInitialEditorFormat';
import ExcalidrawWrapper from './ExcalidrawWrapper';
import { useUser } from "@clerk/clerk-react";



interface Props {
    content?: any
}

const { Title } = Typography;

const Editor: React.FC<Props> = ({ content }) => {

  const [isMounted, setIsMounted] = useState(false)
  const { isSignedIn, user, isLoaded } = useUser();
  const ref = useRef<EditorJS>()
  

  const initializeEditor = async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Table = (await import("@editorjs/table")).default
    const NestedList = (await import("@editorjs/nested-list")).default

    if(!ref.current){
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
        },
        data: {
          time: 1552744582955,
          blocks: content ? CornellInitialEditorFormat(content.cornell) : []
        }
      })
      ref.current = editor
    }
  }

  useEffect(() => {
    if( typeof window !== "undefined"){
      setIsMounted(true)
    }
  },[])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()
    }
    if(isMounted){
      init()

      return () => {
        if(ref.current){
          ref.current.destroy()
        }
      }
    }
  }, [isMounted])

  useEffect(() => {
    console.log(CornellInitialEditorFormat(content.cornell))
  }, [content])

  const save = () => {
    if(ref.current){
      ref.current.save().then((outputData: any) => {
        console.log(outputData)
        console.log(user)
      })
    }
  }

  return (
      <>
        <div id='editorjs'></div>
        <Title level={3}>Visualize your thoughts 🖼️💡</Title>
        { content && (
          <ExcalidrawWrapper content={content?.cornell?.mindMap || []} />
        )}
        <Button onClick={save}>Save</Button>
      </>
   
  )
}

export default Editor