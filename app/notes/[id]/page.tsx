import styles from "../Notes.module.css";
import PocketBase from "pocketbase";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs";

async function getNote(noteId: string) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_HOST);
  await pb.admins.authWithPassword(
    process.env.NEXT_PUBLIC_PB_USER,
    process.env.NEXT_PUBLIC_PB_PASS
  );
  const data = await pb
    .collection(process.env.NEXT_PUBLIC_PB_COLLECTION)
    .getOne(noteId);
  return data;
}

export default async function NotePage({ params }: any) {
  const { id, title, content, created } = await getNote(params.id);

  return (
    <div>
      <h1>notes/{id}</h1>
      <div className={styles.note}>
        <h2 className={styles.title}>{title}</h2>
        <h5 className={styles.content}>{content}</h5>
        <p className={styles.created}>{created}</p>
      </div>
    </div>
  );
}
