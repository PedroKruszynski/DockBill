interface ICreateAccountDTO {
  idUser: string;
  balance: number;
  withdrawalsDailyLimit: number;
  active: boolean;
  typeAccount: number;
}

export default ICreateAccountDTO;
