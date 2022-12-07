"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div>
      <h3>There was an error.</h3>
      <Link href="/notes">Go back to Notes</Link>
    </div>
  );
}
