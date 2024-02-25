import { auth } from "@clerk/nextjs";;
import { redirect } from "next/navigation";
import styles from './page.module.css'

export default function Home() {

  const { userId } : { userId: string | null } = auth();

  if(userId){
    redirect('/home')
  }

  return (
    <main>
      <h1 className={styles.title}>Hello</h1>
    </main>
  );
}
