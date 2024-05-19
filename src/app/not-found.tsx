import Link from "next/link";

import { BackButton } from "@/components/auth";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <div>
        <Link href="/">Return Home</Link>
      </div>
      <BackButton />
    </div>
  );
}
