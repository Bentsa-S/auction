import './VehicleCard.css';

interface VehicleCardProps {
  description: string;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({ description }) => {
  return (
    <div className="vehicle-card">
      <h2 className="title">Опис</h2>
      <div>{description}</div>
    </div>
  );
};
