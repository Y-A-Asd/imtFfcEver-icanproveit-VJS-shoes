export const apiProxy = new Proxy(
    {},
    {
        get: (target, prop) => {
            return (params = "") => {
                console.log("prop (endpoint):", prop);
                console.log("params:", params);

                return new Proxy(() => {}, {
                    get: (target, method) => {
                        console.log("method:", method);

                        if (["get", "post", "patch", "put", "delete"].includes(method)) {
                            return (body = null) => {
                                console.log("body:", body);

                                const url = `http://localhost:5000/${prop}/${params}`;
                                const headers = { "Content-Type": "application/json" };
                                const options = {
                                    method: method.toUpperCase(),
                                    headers,
                                    body: method !== "GET" && body ? JSON.stringify(body) : undefined,
                                };

                                console.log("Request URL:", url);
                                console.log("Request Options:", options);

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
                    },
                });
            };
        },
    }
);
