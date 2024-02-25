import { Excalidraw } from "@excalidraw/excalidraw";
import { convertToExcalidrawElements } from "@excalidraw/excalidraw";
import { useEffect } from "react";

interface Props {
  content: MindMapElement[];
}

type MindMapElement = {
  keypoint: string;
  subPoint: string;
};

export default function ExcalidrawWrapper({ content }: Props) {
  // Dynamically generate Excalidraw elements based on content
  const elements = convertToExcalidrawElements(content.map((item, index) => {
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
  }))

  return (
    <>
      <div style={{ height: "500px" }}>
        <Excalidraw initialData={{ elements, scrollToContent: true, appState: { zenModeEnabled: true } }} />
      </div>
    </>
  );
}
