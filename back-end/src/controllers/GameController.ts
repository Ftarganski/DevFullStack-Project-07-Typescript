import Game from '../models/Game'
import User from '../models/User';
import GenericController from './GenericController';

class GameController extends GenericController {
    constructor() {
        super();
    }

    async addScore(data: any) {
        const { score, user_id } = data;

        try {
            const user = await User.findOne({
                where: {
                    id: user_id
                }
            })
            if (user) {
                await Game.create({
                    score,
                    user_id
                })
                return {
                    status: 201,
                    data: {
                        msg: "Score added successfully"
                    }
                }
            } else {
                return {
                    status: 404,
                    data: {
                        msg: "User does not exist"
                    }
                }
            }
        } catch (err) {
            return {
                status: 404,
                data: {
                    msg: err
                }
            }
        }
    }

    async getScore(user_id: number | null = null, params: any) {
        let data;
        const pagination = this.generatePagination(params),
            limit = pagination[0],
            page = pagination[1];
        const order: any = this.generateOrder(params);
        const paramsLimit = {
            offset: page * limit,
            limit,
        };
        if (user_id) {
            data = await Game.findAll({
                where: {
                    user_id
                },
                ...order,
                ...paramsLimit
            })
        } else {
            data = await Game.findAll(
                {
                    ...paramsLimit,
                    ...order
                }
            )
        }
        return {
            status: 200,
            data: data
        }
    }
}

export default GameController;