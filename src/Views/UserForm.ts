import { User, UserProps } from './../models/User';
import { View } from './View';
export class UserForm extends View<User, UserProps> {
    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        });
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetAge,
            'click:.set-name': this.onSetNameClick,
            'click:.save-model': this.onSaveClick
        };
    }

    onSetNameClick = (): void => {
        const input = this.parent.querySelector('input');

        if (input) {
            const name = input.value;
            this.model.set({ name });
        }
    };

    onButtonClick(): void {
        console.log('I got clicked');
    }

    onSaveClick = (): void => {
        this.model.save();
    };

    onSetAge = (): void => {
        this.model.setRandomAge();
    };

    template(): string {
        return `
            <div>
                <input placeholder="${this.model.get('name')}" />
                <button class="set-name">Change name</button>
                <button class="set-age">Set random age</button>
                <button class="save-model">Save User</button>
            </div>
        `;
    }
}
