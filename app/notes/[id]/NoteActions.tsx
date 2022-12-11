"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import styles from "../Notes.module.css";

export default function NoteActions({ noteId, noteTitle, noteContent }: any) {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_HOST);
  const [title, setTitle] = useState<string>(noteTitle);
  const [content, setContent] = useState<string>(noteContent);
  const [editing, setEditing] = useState<boolean>(false);

  const router = useRouter();

  async function authAdmin() {
    await pb.admins.authWithPassword(
      process.env.NEXT_PUBLIC_PB_USER,
      process.env.NEXT_PUBLIC_PB_PASS
    );
  }

  async function updateNote(e: React.FormEvent) {
    e.preventDefault();

    authAdmin();

    const data = {
      title: title,
      content: content,
    };

    await pb
      .collection(process.env.NEXT_PUBLIC_PB_COLLECTION)
      .update(noteId, data);

    setContent("");
    setTitle("");

    router.refresh();

    setEditing(false);
  }

  async function deleteNote() {
    authAdmin();

    await pb.collection(process.env.NEXT_PUBLIC_PB_COLLECTION).delete(noteId);

    router.push("/notes");
    router.refresh();
  }

  return (
    <>
      {editing ? (
        <form onSubmit={updateNote}>
          <input
            type="text"
            id="new-note-title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            id="new-note-content"
            placeholder="Body"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Update Note</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div className={styles.btnGroup}>
          <button onClick={() => setEditing(true)}>Edit Note</button>
          <button onClick={() => deleteNote()}>Delete Note</button>
        </div>
      )}
    </>
  );
}
