import { test, expect, APIRequestContext } from '@playwright/test';
import data from './data/data.json';
let apiContext: APIRequestContext;
let token: string;
test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
            baseURL: 'https://sandbox-partners-api.airalo.com'
        });
        if(process.env.airalo_token)
          token = process.env.airalo_token
        else{
          const response = await apiContext.post('/v2/token', { 
          form: 
          {
            client_id: process.env.client_id as string,
            client_secret: process.env.client_secret as string,
            grant_type: 'client_credentials',
        } });
        expect(response.status()).toBe(200)
        const responsejson = await response.json();
        token = responsejson.data.access_token;
        }
        if(!token)
          throw new Error('Token or client_id and client_secret not set');
        
    });

    test.afterAll(async () => {
        await apiContext.dispose();
    });

    

data.simorders.forEach((orderData: Record<string, any>) => {
    test(`Create ${orderData.quantity} ${orderData.package_id} Sim orders  and verify`, async () => {
      const postdata = {
        quantity : orderData.quantity,
        package_id: orderData.package_id
      };
        const response = await apiContext.post('/v2/orders',
          {
            headers: {
              Authorization: 'Bearer '+token
            },
            form: postdata
          }
        );
         expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.data.package_id).toBe(orderData.package_id);
        expect(responseBody.data.sims.length).toBe(orderData.quantity)
        const order = await apiContext.get('/v2/orders/',
          {headers: {
              Authorization: 'Bearer '+token
            },}
        )
        expect(order.status()).toBe(200)
        const orderResponse = await order.json();
        const ordersData = orderResponse.data;
        const containsPackage = ordersData.some((sim: any) => sim.package_id === orderData.package_id && sim.quantity === orderData.quantity);
        expect(containsPackage).toBeTruthy(); 
    });
});
    