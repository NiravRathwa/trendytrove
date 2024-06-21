interface StaggeredLabelProps {
  text: string;
}

export const StaggeredLabel: React.FC<StaggeredLabelProps> = ({ text }) => {
  return (
    <span className="staggered-label">
      {text.split("").map((char, index) => (
        <span key={index} style={{ transitionDelay: `${index * 0.1}s` }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};
