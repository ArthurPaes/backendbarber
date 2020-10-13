// arquivo que possui a interface que vai definir qual o formato dos dados precisos para criar um appointment
export default interface IFindAllInMonthOfProviderDTO {
  provider_id: string;
  month: number;
  year: number;
}
