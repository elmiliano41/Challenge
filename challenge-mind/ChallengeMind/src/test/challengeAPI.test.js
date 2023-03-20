import AxiosClient from "../config/AxiosClient";

    test('Testing API config',()=>{
        expect(AxiosClient.defaults.baseURL).toBe(process.env.VITE_BACKEND_URL);
    });
    // test('Needs a token in headers of all request', async()=>{

    //     const token1='ABC-123-XYZ';
    //     localStorage.setItem('token1',token1);
    //     const res= await AxiosClient.get("/auth");

    //     expect(res.config.headers['token']).toBe(token1);

    // })
