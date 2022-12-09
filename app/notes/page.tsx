import Link from "next/link";
import PocketBase from "pocketbase";
import CreateNote from "./CreateNote";
import styles from "./Notes.module.css";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs";

async function getNotes() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_HOST);
  await pb.admins.authWithPassword(
    process.env.NEXT_PUBLIC_PB_USER,
    process.env.NEXT_PUBLIC_PB_PASS
  );
  const data = await pb
    .collection(process.env.NEXT_PUBLIC_PB_COLLECTION)
    .getList();
  return data?.items as any[];
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <h1 className={styles.pageTitle}>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`notes/${id}`}>
      <div className={styles.note}>
        <h2 className={styles.title}>{title}</h2>
        <h5 className={styles.content}>{content}</h5>
        <p className={styles.created}>{created}</p>
      </div>
    </Link>
  );
}
