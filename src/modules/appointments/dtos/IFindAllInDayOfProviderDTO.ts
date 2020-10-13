// arquivo que possui a interface que vai definir qual o formato dos dados precisos para criar um appointment
export default interface IFindAllInDayOfProviderDTO {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}
