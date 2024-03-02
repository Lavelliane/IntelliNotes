"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Landing() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  return (
    <main className="h-screen">
      <header className="text-white flex items-center justify-between p-4 font-sans mt-[9px] mx-12">
      <div className="items-center flex relative ml-24">
              <img
                src="logo.svg"
                alt="logo"
                className="object-cover h-18 w-20"
              />

              <h1 className="heading text-2xl font-bold text-black flex display-inline absolute pl-14 mt-4 text-20 mb-6">
                Intellinotes
              </h1>
            </div>

        <nav className="font-sans flex-grow text-center">
          <ul className="flex justify-center space-x-4 list-none font-medium ml-6">
            <li>
              <a
                href=""
                className="text-custom-gray hover:text-gray-800 no-underline"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-custom-gray hover:text-gray-800 no-underline px-7"
              >
                About
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-custom-gray hover:text-gray-800 no-underline"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {isSignedIn ? (
          <div>
            <UserButton />
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="button bg-black text-white hover:bg-blue-700 font-normal py-2 px-6 rounded-xl drop-shadow-xl no-underline mt-3 mr-32"
          >
            Sign In
          </Link>
        )}
      </header>
      {/* section 1 */}
      <section className="font-sans flex mt-14">
        <div className="flex justify-center items-center mt-0 mb-0 ml-auto mr-auto">
          <div className="mt-[40px] flex flex-col px-40 ml-[-32px]">
            <h1 className="text-[45px] font-bold mb-3">
              Your Smart <br /> Note-Taking Companion
            </h1>
            <p className="text-custom-gray">
              Ready to take your note-taking to the next level? Join thousands
              of <br />
              users who rely on Intellinotes to stay organized, focused, and
              inspired. <br />
              Sign up today and experience the future of note-taking for
              yourself.
            </p>
            <button
              onClick={() => router.push("/sign-in")}
              className="button bg-black border-none text-white hover:bg-blue-700 font-normal px-5 py-3 mt-4 w-[128px] rounded-20px"
            >
              Get started
            </button>
          </div>

          <div className="bg-custom-light-blue w-[616px] h-[380px] border border-gray-400 rounded-100px relative ml-86">
            <div className="bg-white w-custom-width h-[62px] mt-6 mx-[320px] ml-70 drop-shadow-2xl rounded-20px flex justify-center items-center">
              <img src="save.svg" alt="save" className="w-50 h-6" />
            </div>

            <div className="docs absolute bg-white w-[315px] h-[70px] drop-shadow-2xl rounded-20px flex items-center z-[0] mt-[-31px] left-[-20px]">
              <img src="group 457.svg" alt="upload" className="pl-4" />
              <div className="ml-2">
                <p className="mb-1 text-[15px] text-custom-blue">
                  Uploading document
                </p>
                <p className="text-xs text-sky-300">xxx.pdf</p>
              </div>
            </div>
            <div className="absolute bg-white w-[240px] h-[70px] right-[-28px] drop-shadow-2xl rounded-20px mt-10 flex items-center">
              <img src="Group 458.svg" alt="notes " className="ml-5" />
              <p className="font-bold text-custom-blue ml-2">My Notes</p>
            </div>
            <div className="bg-white w-[315px] h-[123px] right-[-28px] drop-shadow-2xl rounded-20px mt-20 mb-20 ml-16 flex items-center p-8">
              <img
                src="Avatar.svg"
                alt="avatar"
                className="w-10 h-20 rounded-full mr-3 mb-4"
              />
              <div>
                <p className="mb-1 font-bold text-custom-blue">
                  Peter Ramsey in UX Planet
                </p>
                <p className="text-[12px] text-custom-blue">
                  The 10 best UX interactions of 2023
                </p>
              </div>
            </div>
            <div className="bg-white w-custom-width h-[62px] mr-[-10px] ml-10 drop-shadow-2xl rounded-20px flex justify-center items-center absolute top-[250px]">
              <img src="bookmark.svg" alt="bookmark" className="w-50 h-6" />
            </div>

            <div className="video bg-white w-custom-width h-[62px] right-[-1px] mr-24 drop-shadow-2xl rounded-20px top-[250px] flex justify-center flex-justify-end items-center absolute">
              <img src="convertvideo.svg" alt="video" className="w-50 h-6" />
            </div>
          </div>
        </div>
      </section>

      {/* section 2 */}

      <section className="font-sans flex">
        <div className="flex flex-col relative  pl-[5rem] pr-[5rem]">
          <div className="w-[60%] justify-normal mt-[160px] flex flex-col px-40 ml-[-32px]">
            <h5 className="text-custom-blue">
              Your Ultimate Smart Note-Taking Companion
            </h5>
            <p className="font-bold mb-4">
              Effortlessly transform PDFs, images and videos <br /> into popular
              note-taking
            </p>
            <p className="text-custom-gray">
              IntelliNotes revolutionizes the way you capture, organize, and
              utilize information, harnessing the power of cutting-edge
              technology from OpenAI and Google. Say goodbye to traditional
              note-taking methods and hello to a smarter, more efficient way of
              managing your note
            </p>
          </div>

          <div className="flex flex-row mx-auto my-0">
            <div>
              <img src="curve.svg" alt="curve" className="ml-16 mt-[-40]" />
            </div>
            <div className="flex">
              <img
                src="circle.svg"
                alt="circle"
                className="mt-[-200px] ml-12"
              />
            </div>
          </div>
          <div className="flex justify-around flex-row">
            <div className="bg-white w-custom-width h-[62px] drop-shadow-2xl rounded-20px flex justify-center items-center mt-[-90px]">
              <img src="gray-circle.svg" alt="circle" className="w-50 h-6" />
            </div>

            <div className="bg-white w-custom-width h-[62px] drop-shadow-2xl rounded-20px flex justify-center items-center  mt-[-228px]">
              <img src="gray-circle.svg" alt="circle" className="w-50 h-6" />
            </div>
            <div className="bg-white w-custom-width h-[62px] drop-shadow-2xl rounded-20px flex justify-center items-center mt-[-26em] mr-64">
              <img src="gray-circle.svg" alt="circle" className="w-50 h-6" />
            </div>
          </div>
          <div className="flex justify-around pl-36 relative ">
            <div className="ml-16 mt-[-80px]">
              <img src="1.svg" alt="one" />
            </div>

            <div className="mt-[-190px]">
              <img src="2.svg" alt="two" className="" />
            </div>

            <div className="mt-[-480px]">
              <img src="3.svg" alt="three" />
            </div>
          </div>

          <div className="flex justify-around ml-12 mr-16 relative ">
            <div className="ml-12 mt-[-80px] static">
              <h4 className="">Seamless Conversion</h4>
              <p className="text-custom-gray">
                IntelliNotes seamlessly converts PDFs <br /> images and videos
                into editable note formats, <br /> saving you time and effort.
              </p>
            </div>
            <div className="mt-[-198px] static">
              <h4>AI-Powered Insights</h4>
              <p className="text-custom-gray">
                Leverage the power of AI to extract key <br /> insights and
                summaries from your <br /> notes, helping you digest information{" "}
                <br /> more effectively.
              </p>
            </div>
            <div className="mr-20 mt-[-400px]">
              <h4>Collaborative Tools</h4>
              <p className="text-custom-gray">
                Share notes with colleagues, <br /> classmates, or study groups,
                fostering <br /> collaboration and knowledge sharing.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* section 3 */}
      <section className="font-sans">
        <h1 className="flex justify-center text-center mt-36">
          We provide best feature for <br /> note-taking
        </h1>
        <div
          className="flex justify-center items-center mx-0 mt-[20px] -z-10"
          style={{ background: `url('/wave.svg')`, backgroundSize: "cover" }}
        >
          <div className="w-[250px] h-[305px] bg-white drop-shadow-2xl rounded-20px mt-28 flex justify-center text-center items-center flex-col">
            <img src="cornell.svg" alt="cornell" />
            <h4 className="mt-4">Cornell Note Taking</h4>
            <p className="mb-5">
              {" "}
              summarizing key points, writing <br /> questions, and reviewing{" "}
              <br /> material
            </p>
            <img src="arrow.svg" alt="arrow" />
          </div>
          <div className="ml-10 mr-10  w-[250px] h-[305px] bg-white drop-shadow-2xl rounded-20px mt-28 flex justify-center text-center items-center flex-col">
            <img src="outlining.svg" alt="cornell" />
            <h4 className="mt-4">Outlining Method</h4>
            <p className="mb-5 pl-3 pr-3">
              structuring your notes <br /> hierarchically, with main topics at
              the top level{" "}
            </p>
            <img src="arrow.svg" alt="arrow" />
          </div>
          <div className="mr-10 w-[250px] h-[305px] bg-white drop-shadow-2xl rounded-20px mt-28 flex justify-center text-center items-center flex-col">
            <img src="sentence.svg" alt="cornell" />
            <h4 className="mt-4">Sentence Method</h4>
            <p className="mb-5">
              condenses information into <br /> concise, coherent sentences,{" "}
              <br /> capturing key points
            </p>
            <img src="arrow.svg" alt="arrow" />
          </div>
          <div className="w-[250px] h-[305px] bg-white drop-shadow-2xl rounded-20px mt-28 flex justify-center text-center items-center flex-col">
            <img src="box.svg" alt="cornell" />
            <h4 className="mt-4">Box Method</h4>
            <p className="mb-5">
              {" "}
              enclosing key concepts, <br /> definitions, or important details
              within individual shapes
            </p>
            <img src="arrow.svg" alt="arrow" />
          </div>
        </div>

        <img
          src="background-wave 1.svg"
          alt="bg-wave"
          className="mt-[90px] absolute"
        />
      </section>
      {/* section 4 */}
      <section className="font-sans">
        <h1 className="text-[46px] bg-gradient-to-r from-sky-600 to-fuchsia-700 text-transparent bg-clip-text flex justify-center text-center mt-[348px]">
          Browse Notes
        </h1>
        <small className="text-custom-gray flex justify-center text-center">
          Discover Some Notes and Dive into Knowledge.
        </small>
        <div className="flex justify-center mt-9">
          <div className="w-[250px] h-[230px] bg-white shadow-md rounded-20px mt-28 flex justify-center text-center items-center flex-col">
            <img src="duolingo.svg" alt="cornell" className="mt-[-44px] mb-3" />
            <div className=" text-center ml-3 mr-3 text-sm ">
              <p className="text-base font-normal mb-2">
                Designing user onboarding: lessons from Figma, Duolingo, and
                more
              </p>
              <p className="mb-12 text-10 font-normal text-custom-gray ">
                Find out the common mistakes in designing onboarding and learn
              </p>
            </div>
          </div>
          <div className="ml-10 w-[250px] h-[230px] bg-white shadow-md rounded-20px mt-28 flex justify-center text-center items-center flex-col">
            <img src="case.svg" alt="cornell" className="mt-[-44px] mb-3" />
            <div className=" text-center ml-3 mr-3 text-sm ">
              <p className="text-base font-normal mb-2">
                Case Study — Language Learning App
              </p>
              <p className="mb-12 text-10 font-normal text-custom-gray">
                Securing your first job in UX design can be challenging, but
                there was one case study in particular
              </p>
            </div>
          </div>
          <hr className="gap-5 h-[220px] mt-20 ml-12 border border-gray-50" />

          <div className="ml-10 mt-14 flex flex-col">
            <div>
              <p className="font-bold">
                I interviewed 3 designers & hired <br /> 0 of them — here’s why
              </p>
              <div className="flex flex-row pt-2">
                <small className="pr-4 flex">February 6, 2024</small>
                <small className="bg-custom-bg-green w-[90px] text-custom-text-green h-22 rounded-tl-10 py-1 px-3 flex justify-center items-center rounded-full">
                  UX Desgin
                </small>
              </div>
            </div>
            <hr className="gap-5 w-[350px] border border-gray-50 mt-3" />
            <div>
              <p className="font-bold mt-2">
                Introducing SafeTest: A Novel Approach <br />
                to Front End Testing
              </p>
              <div className="flex flex-row pt-2">
                <small className="pr-4 flex">October 21, 2023</small>
                <small className="bg-custom-bg-red w-[100px] text-custom-text-red h-22 rounded-tl-10 py-1 px-3 flex justify-center items-center rounded-full">
                  Programming
                </small>
              </div>
            </div>
            <hr className="gap-5 w-[350px] border border-gray-50 mt-3" />
            <div>
              <p className="font-bold mt-2">Airbnb Microservice Architecture</p>
              <div className="flex flex-row pt-2">
                <small className="pr-4 flex">August 8, 2023</small>
                <small className="bg-custom-bg-yellow w-[100px] text-custom-text-yellow h-22 rounded-tl-10 py-1 px-3 flex justify-center items-center rounded-full">
                  Development
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="font-man">
        <div className="main mt-60 ml-32 mr-32 relative flex flex-row gap-28 justify-center">
          <div className="flex flex-col gap-7">
            <div className="items-center flex relative  ">
              <img
                src="logo.svg"
                alt="logo"
                className="object-cover h-16 w-20 bg-transparent absolute mt-7 mb-6"
              />

              <h1 className="heading text-2xl font-bold text-black flex display-inline absolute pl-[60px] mt-7 text-20 mb-6">
                Intellinotes
              </h1>
            </div>

            <p className="text-custom-gray ml-7 mt-3">
              Your Ultimate Smart Note- <br /> Taking Companion
            </p>

            <div className="flex flex-row gap-2 ml-7">
              <img src="linkedin.svg" alt="linkedin" />
              <img src="github.svg" alt="github" />
              <img src="facebook.svg" alt="facebook" />
              <img src="insta.svg" alt="instagram" />
            </div>
          </div>
          {/* ABOUT */}
          <div className="flex flex-col items-center mt-[-10px] ">
            <h1 className="text-lg font-semibold text-20">About</h1>
            <ul className="mt-2 list-none mr-4 text-[15px]">
              <li>
                <a href="" className="no-underline text-slate-900">
                  About Us
                </a>
              </li>
              <li>
                <a href="" className="no-underline text-slate-900">
                  Features
                </a>
              </li>
              <li>
                <a href="" className="no-underline text-slate-900">
                  FAQ
                </a>
              </li>
              <li>
                <a href="" className="no-underline text-slate-900">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center mt-[-10px] ml-4 relative">
            <h1 className="text-lg font-semibold text-20">Legal Information</h1>
            <ul className="list-none text-[15px] justify-center absolute mt-9 mr-24">
              <li>
                <a href="" className="no-underline text-slate-900">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="" className="no-underline text-slate-900">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="" className="no-underline text-slate-900">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col mt-[-9px]">
            <h2 className="mb-4 text-sm font-semibold text-gray-900 dark:text-white">
              Join Our Newsletter
            </h2>
            <form className="flex flex-row">
              <input
                type="email"
                placeholder="Your email address"
                className="border-none px-3 py-2 mb-2 bg-gray-50 w-[260px] rounded-full text-sm focus:outline-none placeholder-gray-400"
              />

              <button
                type="submit"
                className="bg-custom-button-blue border-none text-white font-normal py-2 px-4 rounded-full absolute ml-40"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 rounded-full ">
              * Will send you weekly updates for your better <br /> management.
            </p>
          </div>
        </div>
        <hr className="my-6 sm:mx-36 border-gray-50 lg:my-8 " />
        <span className="text-sm sm:text-center text-black sm:justify-center flex font-regular my-12">
          Copyright @ intellinotes. All Rights Reserved.
        </span>
      </footer>
    </main>
  );
}
