interface Props {
  score: number;
}

const CriticScore = ({ score }: Props) => {
  if (!score) return null; // multe jocuri n-au scor Metacritic

  let color = '#a0a0a0';           // default (scor mic/mediu)
  if (score >= 75) color = '#4caf50';       // verde
  else if (score >= 60) color = '#ffb300';  // galben

  return (
    <span className="critic-score" style={{ backgroundColor: color }}>
      {score}
    </span>
  );
};

export default CriticScore;