import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';
import { AxiosResponse } from 'axios';
import { Model } from './Model';
import { rootUrl } from '../constants';
import { Collection } from './Collection';

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}
export class User extends Model<UserProps> {
    static build(attrs: UserProps): User {
        return new User(
            new Attributes<UserProps>(attrs),
            new Eventing(),
            new ApiSync<UserProps>(rootUrl)
        );
    }

    static buildUserCollection(): Collection<User, UserProps> {
        return new Collection<User, UserProps>(
            new ApiSync(rootUrl),
            (json: UserProps) => User.build(json)
        );
    }
}
