import { User } from './../models/User';
export class UserForm {
    constructor(public parent: Element, public model: User) {}

    eventsMap(): { [key: string]: () => void } {
        return {
            'click:button': this.onButtonClick
        };
    }

    onButtonClick(): void {
        console.log('I got clicked');
    }

    template(): string {
        return `
            <div>
                <h1>User Form</h1>
                <h2>${this.model.get('name')}</h2>
                <p>${this.model.get('age')}</p>
                <input />
                <button>Click Me</button>
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
        const templateElement = document.createElement('template');
        templateElement.innerHTML = this.template();
        this.bindEvents(templateElement.content);

        this.parent.append(templateElement.content);
    }
}
