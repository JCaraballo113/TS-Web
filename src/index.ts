import { UserProps, User } from './models/User';
import { Collection } from './models/Collection';
import { UserList } from './Views/UserList';
import { ApiSync } from './models/ApiSync';

const users = new Collection(
    new ApiSync<UserProps>('http://localhost:3000/users'),
    (json: UserProps) => {
        return User.build(json);
    }
);

users.on('change', () => {
    const root = document.getElementById('app');

    if (root) {
        new UserList(root, users).render();
    }
});

users.fetch();
