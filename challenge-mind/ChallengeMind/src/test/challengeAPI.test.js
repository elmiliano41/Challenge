import AxiosClient from "../config/AxiosClient";

describe('Test on API', ()=>{

    test('Testing API default config',()=>{

        expect(AxiosClient.defaults.baseURL).toBe(process.env.VITE_BACKEND_URL);
        
    });
    test('Needs a token in headers of all request', async()=>{
        const token = "ABC-123-XYZ";
        localStorage.setItem("token", token);
        const res = await AxiosClient
          .get("/auth")
          .then((res) => res)
          .catch((res) => res);
        expect(res.config.headers["x-token"]).toBe(token);
      });

})
