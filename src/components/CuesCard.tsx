type Props = {
    content: string;
    idx: number;
}

const CuesCard: React.FC<Props> = ({ content, idx }) => {
  return (
    <div style={containerStyles}>
        <p style={{ fontSize: "1rem", fontWeight: "700" }}>Cue #{idx}</p>
        <p>{content}</p>
    </div>
  )
}
export default CuesCard


const containerStyles = {
    width: "100%",
    backgroundColor: "#F3F4F6",
    borderRadius: "8px",
    borderTop: "3px solid #1890FF",
    height: "100px",
    padding: "20px 20px 20px 30px",
    margin: "20px 0px 20px 0px",
    cursor: "pointer"
}