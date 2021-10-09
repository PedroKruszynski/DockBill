import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ExtractService from '@modules/transactions/services/ExtractService';

export default class TransactionsController {
  public async extract(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { idAccount } = request.params;

    const periodBegin = request.query.periodBegin as string;
    const periodEnd = request.query.periodEnd as string;

    const extractService = container.resolve(ExtractService);

    const account = await extractService.execute({
      idAccount,
      period: {
        periodBegin,
        periodEnd,
      },
    });

    return response.json(account);
  }
}
