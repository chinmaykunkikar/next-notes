import styles from "../Notes.module.css";
import PocketBase from "pocketbase";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs";

async function getNote(noteId: string) {
  const pb = new PocketBase(process.env.PB_HOST);
  await pb.admins.authWithPassword(process.env.PB_USER, process.env.PB_PASS);
  const data = await pb.collection("notes").getOne(noteId);
  return data;
}

export default async function NotePage({ params }: any) {
  const note = await getNote(params.id);

  return (
    <div>
      <h1>notes/{note.id}</h1>
      <div className={styles.note}>
        <h3>{note.title}</h3>
        <h5>{note.content}</h5>
        <p>{note.created}</p>
      </div>
    </div>
  );
}
