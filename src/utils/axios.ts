import axios from "axios";
import {
    AxiosResponse,
    AxiosRequestConfig,
    AxiosInstance,
    CreateAxiosDefaults,
} from "axios";

class AxiosClient {
    private instance: AxiosInstance;

    constructor(instance: AxiosInstance) {
        this.instance = instance;
    }

    // GET

    get<Rp = any, Rq = any>(url: string, config?: AxiosRequestConfig<Rq>) {
        return this.instance.get<Rp, AxiosResponse<Rp>, Rq>(url, config);
    }

    // DELETE

    delete<Rp = any, Rq = any>(url: string, config?: AxiosRequestConfig<Rq>) {
        return this.instance.delete<Rp, AxiosResponse<Rp>, Rq>(url, config);
    }

    // POST

    post<Rp = any, Rq = any>(url: string, data?: Rq, config?: AxiosRequestConfig<Rq>) {
        return this.instance.post<Rp, AxiosResponse<Rp>, Rq>(url, data, config);
    }

    postForm<Rp = any, Rq = any>(url: string, data?: Rq, config?: AxiosRequestConfig<Rq>) {
        return this.instance.postForm<Rp, AxiosResponse<Rp>, Rq>(url, data, config);
    }

    // PUT

    put<Rp = any, Rq = any>(url: string, data?: Rq, config?: AxiosRequestConfig<Rq>) {
        return this.instance.put<Rp, AxiosResponse<Rp>, Rq>(url, data, config);
    }

    putForm<Rp = any, Rq = any>(url: string, data?: Rq, config?: AxiosRequestConfig<Rq>) {
        return this.instance.putForm<Rp, AxiosResponse<Rp>, Rq>(url, data, config);
    }

    // PATCH

    patch<Rp = any, Rq = any>(url: string, data?: Rq, config?: AxiosRequestConfig<Rq>) {
        return this.instance.patch<Rp, AxiosResponse<Rp>, Rq>(url, data, config);
    }

    patchForm<Rp = any, Rq = any>(url: string, data?: Rq, config?: AxiosRequestConfig<Rq>) {
        return this.instance.patchForm<Rp, AxiosResponse<Rp>, Rq>(url, data, config);
    }
}

export function createClientAxios(config?: CreateAxiosDefaults) {
    return new AxiosClient(axios.create({
        validateStatus: () => true,
        ...config,
    }));
}

class Endpoint<Rpb, Rqb> {
    private instance: AxiosClient;
    url: string;

    constructor(instance: AxiosClient, url?: string) {
        this.instance = instance;
        this.url = url ?? "";
    }

    // GET

    get<Rp extends Rpb = Rpb, Rq extends Rqb = Rqb>(config?: AxiosRequestConfig<Rq>) {
        return this.instance.get<Rp, Rq>(this.url, config);
    }

    // DELETE

    delete<Rp extends Rpb = Rpb, Rq extends Rqb = Rqb>(config?: AxiosRequestConfig<Rq>) {
        return this.instance.delete<Rp, Rq>(this.url, config);
    }

    // POST

    post<Rp extends Rpb = Rpb, Rq extends Rqb = Rqb>(data?: Rq, config?: AxiosRequestConfig<Rq>) {
        return this.instance.post<Rp, Rq>(this.url, data, config);
    }

    postForm<Rp extends Rpb = Rpb, Rq extends Rqb = Rqb>(data?: Rq, config?: AxiosRequestConfig<Rq>) {
        return this.instance.postForm<Rp, Rq>(this.url, data, config);
    }

    // PUT

    put<Rp extends Rpb = Rpb, Rq extends Rqb = Rqb>(data?: Rq, config?: AxiosRequestConfig<Rq>) {
        return this.instance.put<Rp, Rq>(this.url, data, config);
    }

    putForm<Rp extends Rpb = Rpb, Rq extends Rqb = Rqb>(data?: Rq, config?: AxiosRequestConfig<Rq>) {
        return this.instance.putForm<Rp, Rq>(this.url, data, config);
    }

    // PATCH

    patch<Rp extends Rpb = Rpb, Rq extends Rqb = Rqb>(data?: Rq, config?: AxiosRequestConfig<Rq>) {
        return this.instance.patch<Rp, Rq>(this.url, data, config);
    }

    patchForm<Rp extends Rpb = Rpb, Rq extends Rqb = Rqb>(data?: Rq, config?: AxiosRequestConfig<Rq>) {
        return this.instance.patchForm<Rp, Rq>(this.url, data, config);
    }
}

export function endpoint<Rpb, Rqb>(instance: AxiosClient, url?: string) {
    return new Endpoint<Rpb, Rqb>(instance, url);
}

interface Routes {
    [key: string]: Endpoint<any, any> | Routes;
}

interface Route {
    url: string;
    children: Routes;
}

export function route<V extends Routes>(url: string, children: V): V {
    const r: Route = {
        url,
        children,
    };

    return r as any as V;
}

function traverse(route: Route, routes: Routes, url: string) {
    url = route.url.startsWith("/") ? route.url : `${url}${url.endsWith("/") ? "" : "/"}${route.url}`;

    for (const [key, value] of Object.entries(route.children)) {
        if (!(value instanceof Endpoint)) {
            routes[key] = traverse(value as any as Route, {}, url);
            continue;
        }

        if (!value.url.startsWith("/")) {
            value.url = `${url}${url.endsWith("/") ? "" : "/"}${value.url}`;
        }
        routes[key] = value;
    }

    return routes;
}

export function routes<V extends Routes>(children: V): V {
    return traverse(route("/", children) as any as Route, {}, "") as V; // hackish method to keep auto completion
}
