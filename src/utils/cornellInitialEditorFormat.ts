export function CornellInitialEditorFormat(cornellData: any){

    const items = cornellData.cornellNotes.map((c: any) => {
        const cueHeader = {
            type: "header",
            data: {
                text: `${c.cue}`,
                level: 3,
            }
        }
        const questionHeader = {
            type: "header",
            data: {
                text: "❓Questions",
                level: 5,
            }
        }
        const notesHeader = {
            type: "header",
            data: {
                text: "📝 Notes",
                level: 5,
            }
        }
        const questions = {
            type: "list",
            data: {
                items: c.questions.map((q: any) => {
                    return { content: q }
                }),
                style: "unordered"
            }
        }
        const notes = {
            type: "list",
            data: {
                items: c.notes.map((n: any) => {
                    return { content: n }
                }),
                style: "unordered"
            }
        }
        return [
            cueHeader,
            questionHeader,
            questions,
            notesHeader,
            notes
        ];
    })

    return [
        {
            type: "header",
            data: {
                text: `📒 ${cornellData.keyword}`,
                level: 1
            }
        },
        {
            type: "paragraph",
            data: {
                text: "This is a pre-generated cornell notes format using Open AI. Feel free to edit the notes by hovering on the blocks",
            }
        },
        {
            type: "header",
            data: {
                text: "Cues & Questions",
                level: 2
            }
        },
        ...items.flat()
    ]
        
    

}