import { MD5 } from "crypto-js";
const PayUButton = (props) => {
 const {
  totalPrice,
  buyerEmail,
  addres,
  city,
  responseUrl
 } = props
 let date = new Date
 let referenceCode = date.getTime()
 const payuData ={
  merchantId: 508029,
  ApiKey: '4Vj8eK4rloUd272L48hsrarnUA',
  referenceCode: referenceCode,
  currency: 'USD',
  accountId: 512321,
 }
 const stringEncrip = `${payuData.ApiKey}~${payuData.merchantId}~${payuData.referenceCode}~${totalPrice}~${payuData.currency}`;
 let signature = MD5(stringEncrip).toString();
 return (
  <form method="post" action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/" className='w-full flex justify-center'>
   <input name="merchantId" type="hidden" defaultValue={payuData.merchantId} />
   <input name="accountId" type="hidden" defaultValue={payuData.accountId} />
   <input name="description" type="hidden" defaultValue="multi-product payment" />
   <input name="referenceCode" type="hidden" defaultValue={payuData.referenceCode} />
   <input name="amount" type="hidden" defaultValue={totalPrice} />
   <input name="tax" type="hidden" defaultValue={0} />
   <input name="taxReturnBase" type="hidden" defaultValue={0} />
   <input name="currency" type="hidden" defaultValue={payuData.currency} />
   <input name="signature" type="hidden" defaultValue={signature} />
   <input name="test" type="hidden" defaultValue={1} />
   <input name="buyerEmail" type="hidden" defaultValue={buyerEmail} />
   <input name="responseUrl" type="hidden" defaultValue={responseUrl} />
   <input name="confirmationUrl" type="hidden" defaultValue="http://www.test.com/confirmation" />
   <input name="shippingAddress" type="hidden" defaultValue={addres} />
   <input name="shippingCity" type="hidden" defaultValue={city} />
   <input name="shippingCountry" type="hidden" defaultValue="CO" />
   <button name="submit" type="submit" className='bg-black py-2 text-white w-[30%] rounded-lg min-w-[230px] mt-6' >Checkout</button>
  </form>
 );
};

export default PayUButton;