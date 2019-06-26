import axios, { AxiosPromise } from 'axios';
import { UserProps } from './User';
import { Identifiable } from './Model';

export class ApiSync<T extends Identifiable> {
    constructor(public rootUrl: string) {}
    fetch(id: number): AxiosPromise {
        return axios.get(`${this.rootUrl}/${id}`);
    }

    fetchAll(): AxiosPromise {
        return axios.get(`${this.rootUrl}/`);
    }

    save(data: T): AxiosPromise {
        const { id } = data;
        if (id) {
            return axios.put(`${this.rootUrl}/${id}`, data);
        } else {
            return axios.post(this.rootUrl, data);
        }
    }
}
