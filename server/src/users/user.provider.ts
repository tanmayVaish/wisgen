import { DataSource } from 'typeorm';
import { User } from './entity/user.entity';
import constant from '../constant';

export const userProviders = [
  {
    provide: constant.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [constant.DATA_SOURCE],
  },
];
