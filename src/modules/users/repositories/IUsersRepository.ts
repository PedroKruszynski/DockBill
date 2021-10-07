import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';

interface IUsersRepository {
    findById(id: string): Promise<User | undefined>;
    findByEmailOrCpf(email: string, cpf: string): Promise<User | undefined>;
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}

export default IUsersRepository;
