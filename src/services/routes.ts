import request from '../common/request';
import { IUser } from '../types/user';

interface IStandardResponse {
    status: number;
    message: string;
    error: string | null;
}

type IResponse<Payload> = IStandardResponse & Payload;

const routes = {
    checkUserExists: async (username: string) => {
        try {
            const response: IResponse<{ exists: boolean }> = await request.get(
                `/user-exists/${username}`,
            );
            return response?.exists;
        } catch (error) {
            console.error(error);
            return true;
        }
    },
    createNewUser: async (username: string, password: string) => {
        try {
            const response: IResponse<{ user: IUser }> = await request.post(
                '/signup',
                {
                    username,
                    password,
                },
            );
            return response?.user;
        } catch (error) {
            console.error(error);
            return true;
        }
    },
    loginUser: async (username: string, password: string) => {
        try {
            const response: IResponse<{ user: IUser }> = await request.post(
                '/login',
                { username, password },
            );
            return response?.user;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
};

export default routes;
