import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { UserSettings } from './user-settings.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserSettingsService {

    private resourceUrl = SERVER_API_URL + 'api/user-settings';

    constructor(private http: Http) { }

    create(userSettings: UserSettings): Observable<UserSettings> {
        const copy = this.convert(userSettings);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(userSettings: UserSettings): Observable<UserSettings> {
        const copy = this.convert(userSettings);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<UserSettings> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to UserSettings.
     */
    private convertItemFromServer(json: any): UserSettings {
        const entity: UserSettings = Object.assign(new UserSettings(), json);
        return entity;
    }

    /**
     * Convert a UserSettings to a JSON which can be sent to the server.
     */
    private convert(userSettings: UserSettings): UserSettings {
        const copy: UserSettings = Object.assign({}, userSettings);
        return copy;
    }
}
