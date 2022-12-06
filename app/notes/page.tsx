import Link from "next/link"
import PocketBase from 'pocketbase'

export const dynamic = "auto",
    dynamicParams = true,
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    prefferedRegion = 'auto'

async function getNotes() {
    const db = new PocketBase('http://127.0.0.1:8090/')
    const data = await db.collection('notes').getList()
    return data?.items as any[]
}

export default async function NotesPage() {
    const notes = await getNotes()

    return (
        <div>
            <h1>Notes</h1>
            <div>
                {notes?.map(note => <Note key={note.id} note={note} />)}
            </div>
        </div>
    )
}

function Note({ note }: any) {
    const { id, title, content, created } = note || {};

    return (
        <Link href={`notes/${id}`}>
            <div>
                <h2>{title}</h2>
                <h5>{content}</h5>
                <p>{created}</p>
            </div>
        </Link>
    )
}