import { http } from '../http/http';
import { storage } from '../local-storage/localStorage';

import { LoginRequestDto, LoginResponseDto } from '../http/dto/auth';
import { User } from '../../domain/models/User';

export const authRepository = {

    signin: async (data: LoginRequestDto): Promise<User | undefined> => {
        try {
            const { user, session } = await http.post<LoginResponseDto>('/auth/signin', data);
            storage.set('session', session);
            return new User(user.id, user.nombre, user.apellidoP, user.userName, user.issemym);
        } catch (error) {
            alert(error as string);
        }
    },

    revalidateSession: async (): Promise<User | undefined> => {
        try {
            const { user, session } = await http.get<LoginResponseDto>('/auth/me');
            storage.set('session', session);
            return new User(user.id, user.nombre, user.apellidoP, user.userName, user.issemym);
        } catch (error) {
            storage.remove('session');
        }
    }

}