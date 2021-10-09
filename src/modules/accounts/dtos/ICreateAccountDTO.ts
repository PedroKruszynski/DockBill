interface ICreateAccountDTO {
  idUser: string;
  balance: string;
  withdrawDailyLimit: string;
  active: boolean;
  typeAccount: number;
}

export default ICreateAccountDTO;
