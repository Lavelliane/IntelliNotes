"use client"
import { Excalidraw } from "@excalidraw/excalidraw";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import { useEffect, useState } from "react";

interface Props {
  content: MindMapElement[];
}

type MindMapElement = {
  keypoint: string;
  subPoint: string;
};

export default function ExcalidrawWrapper({ content }: Props) {


  const elements = content ? convertToExcalidrawElements(content.map((item, index) => {
    const x = index * 100;
    const y = index * 100;

    const labelText = `${item.keypoint}\n-${item.subPoint}`;
    return {
      type: "rectangle",
      x,
      y,
      width: 420,
      strokeColor: "#f08c00",
      backgroundColor: "#ffec99",
      label: {
        text: labelText,
        strokeColor: "#099268",
        fontSize: 20,
      },
    };
  })) : convertToExcalidrawElements([
    {
      type: "rectangle",
      x: 100,
      y: 200,
      width: 420,
      strokeColor: "#f08c00",
      backgroundColor: "#ffec99",
      label: {
        text: "START HERE",
        strokeColor: "#099268",
        fontSize: 20,
      },
    }
  ])



  return (
    <>
      <div style={{ height: "700px", width: "1000px", margin: "0 auto" }}>
        <Excalidraw initialData={{ elements, scrollToContent: true, appState: { zenModeEnabled: true } }} />
      </div>
    </>
  );
}
