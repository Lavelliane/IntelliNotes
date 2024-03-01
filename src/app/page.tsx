'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Landing() {

  return (
    <main className="h-screen">
      <header className="text-white flex items-center justify-between p-4 font-sans mt-[7px]">
        <div className="items-center flex ml-32">
          <img src="logo.svg" alt="logo" className="logo w-10 h-16 z-[-0]" />
          <h1 className="heading text-2xl font-bold text-black ml-0">
            Intellinotes
          </h1>
        </div>

        <nav className="font-sans flex-grow text-center">
          <ul className="flex justify-center space-x-4 list-none font-medium pt-4">
            <li>
              <a
                href=""
                className="text-gray-600 hover:text-gray-800 no-underline"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-gray-600 hover:text-gray-800 no-underline px-7"
              >
                About
              </a>
            </li>
            <li>
              <a
                href=""
                className="text-gray-600 hover:text-gray-800 no-underline"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <a
          href="#"
          className="button bg-black text-white hover:bg-blue-700 font-normal py-2 px-6 rounded-xl drop-shadow-xl no-underline mt-3 mr-32"
        >
          Sign In
        </a>
      </header>

      <section className="font-sans flex mt-14">
        <div className="flex justify-center">
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
            <button className="button bg-black border-none text-white hover:bg-blue-700 font-normal px-5 py-3 mt-4 w-[128px] rounded-20px">
              Get started
            </button>
          </div>

          <div className="bg-custom-light-blue w-[616px] h-[380px] border border-gray-400 rounded-100px relative ml-86">
            <div className="bg-white w-custom-width h-[62px] mt-6 mx-[320px] ml-70 drop-shadow-2xl rounded-20px flex justify-center items-center z-[10]">
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

      <section className="font-sans flex mt-8">
        <div className="flex flex-col relative">
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

          <div className="flex flex-row">
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

            <div className="bg-white w-custom-width h-[62px] drop-shadow-2xl rounded-20px flex justify-center items-center  mt-[-230px]">
              <img src="gray-circle.svg" alt="circle" className="w-50 h-6" />
            </div>
            <div className="bg-white w-custom-width h-[62px] drop-shadow-2xl rounded-20px flex justify-center items-center mt-[-30em] mr-64">
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
            <div className="mr-20 mt-[-460px]">
              <h4>Collaborative Tools</h4>
              <p className="text-custom-gray">
                Share notes with colleagues, <br /> classmates, or study groups,
                fostering <br /> collaboration and knowledge sharing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="font-sans">
        <h1 className="flex justify-center text-center mt-36">
          We provide best feature for <br /> note-taking
        </h1>
        <div className="flex justify-center flex-row ">
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
          src="wave.svg"
          alt="wave"
          className=" my-[-286px] absolute -z-10"
        />
        <img
          src="background-wave 1.svg"
          alt="bg-wave"
          className="mt-[100px] absolute"
        />
      </section>

      <section className="font-sans">
        <h1 className="text-[46px] bg-gradient-to-r from-sky-600 to-fuchsia-700 text-transparent bg-clip-text flex justify-center text-center mt-[348px]">
          Browse Notes
        </h1>
        <small className="text-custom-gray flex justify-center text-center">
          Discover Some Notes and Dive into Knowledge.
        </small>
        <div className="flex justify-center">
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
          <div className="ml-20 w-[250px] h-[230px] bg-white shadow-md rounded-20px mt-28 flex justify-center text-center items-center flex-col">
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
          <div className="bg-red-500 w-[450px] h-[220px] mt-20 ml-12 border-l-4 border-indigo-500">
</div>

        </div>
      </section>
    </main>
  );
}
