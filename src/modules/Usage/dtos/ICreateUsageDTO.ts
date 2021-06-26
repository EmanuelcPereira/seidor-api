interface ICreateUsageDTO {
  driver_id: string;
  car_id: string;
  start_date?: Date;
  motivo: string;
  end_date?: Date;
}

export default ICreateUsageDTO;
