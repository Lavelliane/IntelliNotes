import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "antd";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      Landing page coming soon!
      <Button>
        <Link href="/sign-in">Go to Sign In</Link>
      </Button>
    </main>
  );
}
