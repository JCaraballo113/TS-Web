interface Events {
  [key: string]: Callback[];
}

type Callback = () => void;

export class Eventing {
  events: Events = {};
  on = (eventName: string, callback: Callback): void => {
    const handlers = this.events[eventName] || [];
    handlers.push(callback);

    this.events[eventName] = handlers;
  };

  trigger = (eventName: string): void => {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }

    this.events[eventName].forEach((callback: Callback) => callback());
  };
}
