export const apiProxy = new Proxy(
    {},
    {
        get: (target, prop) => {

            return (params = "") => {
                return new Proxy(() => {
                }, {
                    get: (target, method) => {
                        if (['get', 'post', 'patch', 'put', 'delete'].includes(method)) {
                            return (body = null) => {
                                const url = `http://localhost:5000/${prop}/${params}`;
                                const headers = {"Content-Type": "application/json"};
                                method = method.toUpperCase()
                                const options = {
                                    method,
                                    headers,
                                    body: method !== 'GET' ? JSON.stringify(body) : undefined,
                                }
                                console.log(options)
                                return fetch(url, options)
                                    .then((response) => {
                                        if (!response.ok) {
                                            throw new Error(`Failed to fetch from ${url}`);
                                        }
                                        return response.json();
                                    })
                                    .catch((error) => {
                                        console.error(`Error fetching ${url}:`, error);
                                        return null;
                                    });
                            };
                        }
                    }
                });
            };
        }

    });