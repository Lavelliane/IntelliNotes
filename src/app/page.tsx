import { auth } from "@clerk/nextjs";
import { Button } from "antd";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {

  const { userId } : { userId: string | null } = auth();

  if(userId){
    redirect('/home')
  }

  return (
    <main>
      Landing page coming soon!
      <Button>
        <Link href="/sign-in">Go to Sign In</Link>
      </Button>
    </main>
  );
}
