**[English Version](README.md#english)** ||
**[Version en Español](README.md#español)**

### English
# Euphorix
**Visit in:** https://euphorix.netlify.app/
<div style='display: flex; width: 100%; justify-content: center'>
<img src='https://raw.githubusercontent.com/Eduardbarrios/Curso-React-practico-Shopee/ca11b7d0f62b25290c518319897074b9dfe86b5e/public/assets/Euphorix_logo.svg' width='250' align='center'/>
</div>

**Technologies:**
<div align="center" style='display: flex; justify-content: center;'>
<div style='display: flex; flex-direction: column; justify-content: center; align-items: center; margin-right: 30px; font-weight: bold'>
<img src="https://raw.githubusercontent.com/Eduardbarrios/Curso-React-practico-Shopee/ca11b7d0f62b25290c518319897074b9dfe86b5e/public/assets/icons8-react.svg" alt="React" width="50" /><p>React</p>
</div>
<div style='display: flex; flex-direction: column; justify-content: center; align-items: center; margin-right: 30px; font-weight: bold'><img src="https://raw.githubusercontent.com/Eduardbarrios/Curso-React-practico-Shopee/ca11b7d0f62b25290c518319897074b9dfe86b5e/public/assets/icons8-tailwindcss.svg" alt="Tailwind CSS" width="50" /> <p>Tailwind CSS</p></div>
 <div style='display: flex; flex-direction: column; justify-content: center; align-items: center; margin-right: 30px; font-weight: bold'>
<img src="https://raw.githubusercontent.com/Eduardbarrios/Curso-React-practico-Shopee/ca11b7d0f62b25290c518319897074b9dfe86b5e/public/assets/vite.svg" alt="Vite" width="50" /><p>ViteJs</p>
</div>
  
  
</div>
Euphorix is an e-commerce project developed with Vite, React.js, and Tailwind CSS. The goal of this project is to simulate the complete experience of an e-commerce, from user creation and login to the purchasing process and order tracking.

All user authentication and product rendering functionalities were implemented by consuming the **Platzi Fake Store API**, which can be found at [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/). This API provides fictitious product data to simulate a product catalog in a store.

**Note:** This is the first version of this project and it only has desktop view. We will soon be updating to a version with responsive design.

## Disclaimer

**IMPORTANT: Do not use personal email addresses or passwords while testing this project!**

Please note that the Platzi Fake Store API used in this project is a public API provided for testing purposes only. It does not have encryption or security measures in place. Therefore, it is strongly recommended to avoid using any personal or sensitive information during testing.

##Features

- User creation and login.
- Product rendering with filtering options by title and category.
- Shopping cart functionality to add products.
- Order creation.
- View orders created by the user.
- Integration with PayU for the payment process using the Webcheckout payment component.
- Order status updates based on successful or failed payments.
## Payment Component

The payment component is configured in test mode. To make use of it, use the following data:

**MASTERCARD Credit Card:**
- Card Number: 5471300000000003

**VISA Credit Card:**
- Card Number: 4097440000000004

**To obtain approved transactions:**
- Use "APPROVED" as the cardholder's name.
- Use 777 as the CVV for the card (use 7777 for AMEX).
- Use an expiration month before 6 and a year of 2023 or later (e.g., 05/2025).

**To obtain declined transactions:**
- Use "REJECTED" as the cardholder's name.
- Use 666 as the CVV for the card (use 666 for AMEX).
- Use an expiration month after 6 and a year of 2023 or later (e.g., 07/2027).

To test other payment methods, please visit the [PayU Latam documentation](https://developers.payulatam.com/latam/en/docs/getting-started/test-your-solution.html).

**Ready?** [Visit Euphorix](https://euphorix.netlify.app/ "visit Euphorix")


### Español
[English Version](README.md#english)
# Euphorix
**Visit in:** https://euphorix.netlify.app/
<div style='display: flex; width: 100%; justify-content: center'>
<img src='https://raw.githubusercontent.com/Eduardbarrios/Curso-React-practico-Shopee/ca11b7d0f62b25290c518319897074b9dfe86b5e/public/assets/Euphorix_logo.svg' width='250' align='center'/>
</div>

**Tecnologías:**
<div align="center" style='display: flex; justify-content: center;'>
<div style='display: flex; flex-direction: column; justify-content: center; align-items: center; margin-right: 30px; font-weight: bold'>
<img src="https://raw.githubusercontent.com/Eduardbarrios/Curso-React-practico-Shopee/ca11b7d0f62b25290c518319897074b9dfe86b5e/public/assets/icons8-react.svg" alt="React" width="50" /><p>React</p>
</div>
<div style='display: flex; flex-direction: column; justify-content: center; align-items: center; margin-right: 30px; font-weight: bold'><img src="https://raw.githubusercontent.com/Eduardbarrios/Curso-React-practico-Shopee/ca11b7d0f62b25290c518319897074b9dfe86b5e/public/assets/icons8-tailwindcss.svg" alt="Tailwind CSS" width="50" /> <p>Tailwind CSS</p></div>
 <div style='display: flex; flex-direction: column; justify-content: center; align-items: center; margin-right: 30px; font-weight: bold'>
<img src="https://raw.githubusercontent.com/Eduardbarrios/Curso-React-practico-Shopee/ca11b7d0f62b25290c518319897074b9dfe86b5e/public/assets/vite.svg" alt="Vite" width="50" /><p>ViteJs</p>
</div>
  
  
</div>

Euphorix es un proyecto de comercio electrónico desarrollado con Vite, React.js y Tailwind CSS. El objetivo de este proyecto es simular la experiencia completa de un comercio electrónico, desde la creación de usuarios y el inicio de sesión hasta el proceso de compra y el seguimiento de pedidos.

Todas las funcionalidades de autenticación de usuarios y renderizado de productos se realizaron consumiendo la **Platzi Fake Store API**, la cual se puede encontrar en [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/). Esta API proporciona datos ficticios de productos para simular un catálogo de productos en una tienda.

**Nota:** Esta es la primera versión de este proyecto y solo cuenta con vista de escritorio, pronto estaremos actualizando a una versión con responsive desing.

## Disclaimer

**IMPORTANTE: ¡No utilices direcciones de correo electrónico o contraseñas personales al probar este proyecto!**

Ten en cuenta que la Platzi Fake Store API utilizada en este proyecto es una API pública proporcionada únicamente con fines de prueba. No cuenta con cifrado ni medidas de seguridad implementadas. Por lo tanto, se recomienda encarecidamente evitar el uso de información personal o sensible durante las pruebas.

## Funcionalidades

- Creación de usuarios y inicio de sesión.
- Renderizado de productos con opciones de filtrado por título y categoría.
- Funcionalidad de carrito de compras para agregar productos.
- Creación de pedidos.
- Visualización de los pedidos creados por el usuario.
- Integración con PayU para el proceso de pago utilizando el componente de pago Webcheckout.
- Actualizaciones del estado del pedido basadas en pagos exitosos o fallidos.

## Componente de pago

El componente de pago está configurado en modo de prueba. Para utilizarlo, utiliza los siguientes datos:

**Tarjeta de Crédito MASTERCARD:**
- Número de tarjeta: 5471300000000003

**Tarjeta de Crédito VISA:**
- Número de tarjeta: 4097440000000004

**Para obtener transacciones aprobadas:**
- Utiliza "APPROVED" como nombre del titular de la tarjeta.
- Utiliza 777 como CVV para la tarjeta (usa 7777 para AMEX).
- Utiliza un mes de vencimiento antes del 6 y un año igual o posterior a 2023 (por ejemplo, 05/2025).

**Para obtener transacciones declinadas:**
- Utiliza "REJECTED" como nombre del titular de la tarjeta.
- Utiliza 666 como CVV para la tarjeta (usa 666 para AMEX).
- Utiliza un mes de vencimiento después del 6 y un año igual o posterior a 2023 (por ejemplo, 07/2027).

Para probar otros medios de pago, visita la [documentación de PayU Latam](https://developers.payulatam.com/latam/es/docs/getting-started/test-your-solution.html).

**¿Listo?** [Visita Euphorix](https://euphorix.netlify.app/ "visita Euphorix")
