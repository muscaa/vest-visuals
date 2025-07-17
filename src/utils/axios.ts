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
