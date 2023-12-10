import { Service } from 'typedi';
import boom from '@hapi/boom';

import { IStateRepository } from './IStateRepository';
import { City, CityAttributes, State, StateAttributes } from '../../../../database/init-model';

@Service()
export class StateRepository implements IStateRepository {
  public async findAll(): Promise<{ states: State[]; message: string }> {
    try {
      const states: State[] = await State.findAll({
        attributes: ['id', 'stateName'],
        include: [
          {
            model: City,
            as: 'City',
            attributes: ['id', 'cityName']
          }
        ]
      });

      if (!states.length) {
        return { message: 'The States table is empty', states: [] };
      }
      return {
        states,
        message: 'States list'
      };
    } catch (error) {
      throw boom.unauthorized();
    }
  }

  public async findOne(id: string): Promise<State | string> {
    try {
      const user = await State.findByPk(id, {
        attributes: ['id', 'stateNAme'],
        include: [
          {
            model: City,
            as: 'City'
          }
        ]
      });

      if (!user) {
        throw boom.notFound(`The state with ${id} not found`);
      }

      return user;
    } catch (error: any) {
      throw boom.notFound(`The state with ${id} not found`);
    }
  }

  public async deleteOne(id: string): Promise<number | string> {
    try {
      const response = await State.destroy({
        where: {
          id
        }
      });

      if (typeof response === 'string') {
        return await response;
      }

      if (response === 1) {
        return await `User with id=${id} was deleted`;
      }

      if (response === 0) {
        throw boom.notFound(`State with id=${id} not found`);
      }

      return await response;
    } catch (error: any) {
      throw boom.notFound(`State with id=${id} not found`);
    }
  }

  public async createOne(body: StateAttributes & CityAttributes): Promise<State | string> {
    try {
      const newState = await State.create(
        { ...body },
        {
          attributes: ['id', 'stateName'],
          include: [
            {
              model: City,
              as: 'City',
              attributes: ['id', 'cityName']
            }
          ]
        }
      );
      await City.create({ idState: newState.id, cityName: body.cityName });

      return newState;
    } catch (err: any) {
      return err.message;
    }
  }

  public async updateOne(id: string, body: StateAttributes): Promise<string> {
    try {
      const state = await State.findByPk(id);

      if (state === null) {
        return boom.notFound(`State with id=${id} not found`).message;
      }

      const response = await State.update(body, {
        where: {
          id
        }
      });

      if (response[0] === 1) {
        const city = await City.findByPk(id);
        await City.update(body, {
          where: {
            idState: city?.id
          }
        });

        return await `State with id=${id} was updated`;
      }

      throw boom.notFound(`State with id=${id} not found`);
    } catch (error: any) {
      throw boom.notFound(`State with id=${id} not found`);
    }
  }
}
