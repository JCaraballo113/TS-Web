import { User } from './models/User';
import { UserForm } from './Views/UserForm';

const user = User.build({ name: 'Andrew', age: 25 });
const userForm = new UserForm(document.querySelector('#app'), user);
userForm.render();
