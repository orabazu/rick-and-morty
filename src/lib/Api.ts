class Api {
  async get<T>(url: string, params: any): Promise<T> {
    let response;
    const startTime = new Date().getTime();
    try {
      response = await fetch(`url/${params}`);
    } catch (e) {
      /* eslint-disable-next-line no-throw-literal */
      throw { status: 0, message: e };
    }

    if (!response.ok) {
      reportError("GET", url, response, startTime);
      const data = await getJSONOrThrow(response);
      // eslint-disable-next-line no-throw-literal
      throw { status: response.status, ...data };
    }
    return await getJSONOrThrow(response);
  }
}

function reportError(
  method: string,
  url: string,
  response: Response,
  startTime: number
) {
  const duration = new Date().getTime() - startTime;
  const pathname = new URL(url, window.location.origin).pathname;
  console.error({ pathname, method, duration, status: response.status });
}

async function getJSONOrThrow(response: Response) {
  try {
    return await response.json();
  } catch (e) {
    return { statusText: response.statusText };
  }
}

export const api = new Api();
