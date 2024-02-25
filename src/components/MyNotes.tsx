"use client"
import Editor from '@/components/Editor'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function page() {
    const searchParams = useSearchParams()
    console.log(searchParams.get('noteId'))

    const [noteData, setNoteData] = useState<any>()

    useEffect(() => {
        async function fetchAllData(){
            const noteRef = doc(db, 'notes', `${searchParams.get('noteId')}`)
            const noteSnap = await getDoc(noteRef)

            if(noteSnap.exists()){
                const note = noteSnap.data()
                setNoteData(note)
            }else{
                console.error("Document does not exist")
            }
        }

        if(searchParams){
            fetchAllData()
        }
    }, [searchParams])

    useEffect(() => {
        console.log(noteData)
    }, [noteData])

    return (
        <>
            { noteData && <Editor readonly={false} firebaseEditorData={noteData.editorData} isUpdating={true} noteId={`${searchParams.get('noteId')}`} />}
        </>
    )
}