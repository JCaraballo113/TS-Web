import { ApiSync } from './ApiSync';
import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';
import { Identifiable } from './Model';

export class Collection<T, K> {
    models: T[] = [];
    events: Eventing = new Eventing();

    constructor(public sync: ApiSync<K>, public deserialize: (json: K) => T) {}

    get on() {
        return this.events.on;
    }

    get trigger() {
        return this.events.trigger;
    }

    fetch(): void {
        this.sync.fetchAll().then((response: AxiosResponse) => {
            response.data.forEach((value: K) =>
                this.models.push(this.deserialize(value))
            );

            this.trigger('change');
        });
    }
}
