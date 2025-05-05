import './DemonstrationDescription.css'

interface Props {
  description: string;
}

const DemonstrationDescription: React.FC<Props> = ({ description }) => {
  return (
    <div className="vehicle-card">
      <h2 className="title">Опис</h2>
      <p>{description}</p>
    </div>
  );
};

export default DemonstrationDescription;
