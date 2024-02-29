'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Landing() {

  const router = useRouter()
  useEffect(() => {
    router.push('/sign-in')
  }, [])

  return (
    <main>
      <h1 className="text-[60px]">Intellinotes</h1>
    </main>
  );
}
