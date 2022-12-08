"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";

export default function CreateNote() {
  const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_HOST);
  const [title, setTitle] = useState<string>();
  const [content, setContent] = useState<string>();
  const router = useRouter();

  async function addNote(e: React.FormEvent) {
    e.preventDefault();
    const authData = await pb.admins.authWithPassword(
      process.env.NEXT_PUBLIC_PB_USER,
      process.env.NEXT_PUBLIC_PB_PASS
    );
    console.log(authData);

    const data = {
      title: title,
      content: content,
    };

    await pb.collection(process.env.NEXT_PUBLIC_PB_COLLECTION).create(data);

    setContent("");
    setTitle("");

    router.refresh();
  }

  return (
    <form onSubmit={addNote}>
      <h3>Add a new note</h3>
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
      <button type="submit">Add Note</button>
    </form>
  );
}
