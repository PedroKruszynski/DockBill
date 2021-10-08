interface ICreateAccountDTO {
  idUser: string;
  balance: string;
  withdrawalsDailyLimit: number;
  active: boolean;
  typeAccount: number;
}

export default ICreateAccountDTO;
