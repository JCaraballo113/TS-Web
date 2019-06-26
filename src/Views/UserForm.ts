import { User } from './../models/User';
export class UserForm {
    constructor(public parent: Element, public model: User) {
        this.bindModel();
    }
    bindModel(): void {
        this.model.on('change', () => {
            this.render();
        });
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:.set-age': this.onSetAge
        };
    }

    onButtonClick(): void {
        console.log('I got clicked');
    }

    onSetAge = (): void => {
        this.model.setRandomAge();
    };

    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <h2>${this.model.get('name')}</h2>
                <p>${this.model.get('age')}</p>
                <input />
                <button>Click Me</button>
                <button class="set-age">Set random age</button>
            </div>
        `;
    }

    bindEvents(fragment: DocumentFragment): void {
        const eventsMap = this.eventsMap();

        for (const key in eventsMap) {
            const [eventName, selector] = key.split(':');

            fragment.querySelectorAll(selector).forEach(element => {
                element.addEventListener(eventName, eventsMap[key]);
            });
        }
    }

    render(): void {
        this.parent.innerHTML = '';
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    }
}
