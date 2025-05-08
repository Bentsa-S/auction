import React, { useEffect, useState } from 'react';
import './VehicleCard.css';

interface VehicleData {
  lotNumber: string;
  vin: string;
  titleCode: string;
  odometer: string;
  primaryDamage: string;
  secondaryDamage: string;
  cylinders: string;
  color: string;
  engine: string;
  transmission: string;
  drive: string;
  classification: string;
  fuel: string;
  hasKeys: string;
  highlights: string;
}


const fetchVehicleData = (): Promise<VehicleData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        lotNumber: '83976684',
        vin: '5UXKT0C56J0******',
        titleCode: 'NH - CERTIFICATE OF TITLE',
        odometer: '126 622 миль (ACTUAL)',
        primaryDamage: 'Нормальный износ',
        secondaryDamage: 'Незначительные вмятины / царапины',
        cylinders: '4',
        color: 'ЧЕРНЫЙ',
        engine: '2.0L 4',
        transmission: 'AUTOMATIC',
        drive: 'All wheel drive',
        classification: 'AUTOMOBILE',
        fuel: 'гибридный двигатель',
        hasKeys: 'Да',
        highlights: 'Авто на ходу',
      });
    }, 1000);
  });
};

const VehicleCard: React.FC = () => {
  const [data, setData] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicleData().then((vehicleData) => {
      setData(vehicleData);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="vehicle-card">Завантаження...</div>;

  return (
    <div className="vehicle-card">
      <h2 className="title">Информация о транспортном средстве</h2>

      <table>
        <tbody>
          <tr><td>Номер лота:</td><td>{data?.lotNumber}</td></tr>
          <tr><td>Номер VIN:</td><td>{data?.vin}</td></tr>
          <tr><td>Код свидетельства о праве собственности:</td><td className="highlight">{data?.titleCode}</td></tr>
          <tr><td>Одометр:</td><td>{data?.odometer}</td></tr>
          <tr><td>Основное повреждение:</td><td className="bold">{data?.primaryDamage}</td></tr>
          <tr><td>Вторичное повреждение:</td><td>{data?.secondaryDamage}</td></tr>
          <tr><td>Цилиндры:</td><td>{data?.cylinders}</td></tr>
          <tr><td>Цвет:</td><td className="bold">{data?.color}</td></tr>
          <tr><td>Тип двигателя:</td><td>{data?.engine} <a href="#">🔊 Listen to engine</a></td></tr>
          <tr><td>Передача:</td><td>{data?.transmission}</td></tr>
          <tr><td>Привод:</td><td>{data?.drive}</td></tr>
          <tr><td>Классификация ТС:</td><td>{data?.classification}</td></tr>
          <tr><td>Топливо:</td><td className="bold">{data?.fuel}</td></tr>
          <tr><td>Ключи:</td><td>{data?.hasKeys}</td></tr>
          <tr><td>Основные моменты:</td><td className="bold">{data?.highlights}</td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default VehicleCard;
