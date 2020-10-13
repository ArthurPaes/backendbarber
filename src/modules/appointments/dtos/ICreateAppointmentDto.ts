// arquivo que possui a interface que vai definir qual o formato dos dados precisos para criar um appointment
export default interface ICreateAppointmentDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}
