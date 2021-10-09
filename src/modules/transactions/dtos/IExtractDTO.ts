interface IExtractDTO {
    idAccount: string;
    period: {
      periodBegin: string | undefined;
      periodEnd: string | undefined;
    }
  }

export default IExtractDTO;
