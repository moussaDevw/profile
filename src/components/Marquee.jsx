const Marquee = () => {
  const techs = [
    "React", "Next.js", "TypeScript", "Zustand", "TanStack Query", 
    "GetStream.io", "Tailwind CSS", "shadcn/ui", "GraphQL", "NestJS", "Node.js"
  ];

  return (
    <div className="marquee">
      <div className="marquee-track">
        <span>
          {techs.map((t, i) => <span key={i}>{t}</span>)}
        </span>
        <span>
          {techs.map((t, i) => <span key={i}>{t}</span>)}
        </span>
      </div>
    </div>
  );
};

export default Marquee;
