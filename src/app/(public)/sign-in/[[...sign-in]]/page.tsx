import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <>
        <div className="backgroundLogin" style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <SignIn />
        </div>
    </>
  );
}
