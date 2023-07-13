export default {
  getOrderDetails() {
    return mockOrderDetails;
  },
  getOrderSearchResults() {
    return mockSearchResults;
  },
};

export const mockOrderDetails = {
  stage: 'processed',
  transactionId: 'SX00109635C3402',
  payment: {
    type: 'card',
    status: 'success',
    timestamp: '2022-10-28T12:56:50.677-07:00',
    subTotal: 33,
    couponTotal: 0,
    shippingTotal: 4.95,
    refundTotal: -51.34,
    taxRate: 0.0875,
    shippingTaxRate: 0.0875,
    tax: 3.76,
    total: 56.76,
    paidTotal: 56.76,
    currency: 'USD',
    card: {
      cardHolder: 'Nick Berens',
      pan: '476173*0119',
      expirationDate: '2022-12-31',
      issuer: 'Visa',
      processor: 'Stub',
    },
  },
  customer: {
    name: 'Nick Berens',
    email: 'SlickNick@aol.com',
    phoneNumber: '720-818-3479',
  },
  session: {
    sessionId: '5c22cae8-c36b-4d89-875d-729742c9f42f',
    locale: 'en',
    kioskNumber: 'X00109',
    storeName: 'Test',
    storeAddress: '8990 S Kyrene Rd, Tempe, AZ 85284',
  },
  items: [
    {
      itemId: 1,
      sku: 'KKWJMP223TIFANY',
      type: 'KE',
      description: 'Home Blue',
      customization: {},
      listPrice: 5,
      price: 5,
      subTotal: 4.6296296,
      discountTotal: 0,
      netTotal: 4.6296296,
      tax: 0.37037036,
      total: 5,
      discounts: [],
      quantity: 1,
      refunds: [
        // {
        //   status: 'success',
        //   amount: 5,
        //   quantity: 1,
        //   username: 'nberens',
        //   timestamp: '2022-11-10T10:56:38.023-06:00',
        // },
      ],
    },
    {
      itemId: 2,
      sku: '9971395',
      type: 'TG',
      description: 'Large 2020 Characters Military',
      customization: {
        backSideText: 'Hi Nick!',
        backTextOrientation: 'Landscape',
        font: 'Caviar Dreams',
      },
      listPrice: 8,
      price: 8,
      subTotal: 8,
      discountTotal: 0,
      netTotal: 8,
      tax: 0.7,
      total: 8.7,
      discounts: ['secret discount code'],
      quantity: 1,
      refunds: [
        // {
        //   status: 'success',
        //   amount: 8.7,
        //   quantity: 1,
        //   username: 'nberens',
        //   timestamp: '2022-11-10T10:56:38.023-06:00',
        // },
      ],
    },
    {
      itemId: 3,
      sku: 'HNS-XS-BLK',
      type: 'HA',
      description: 'Personalized Pet Harness, XS Black',
      customization: {
        frontSideText: 'Cocoa - 867-5309',
        frontTextOrientation: 'Landscape',
        textColor: 'Hot Pink',
      },
      listPrice: 10,
      price: 10,
      subTotal: 10,
      discountTotal: 0,
      netTotal: 10,
      tax: 0.875,
      total: 10.875,
      discounts: [],
      quantity: 1,
      refunds: [
        // {
        //   status: 'success',
        //   amount: 10.875,
        //   quantity: 1,
        //   username: 'nberens',
        //   timestamp: '2022-11-10T10:56:38.023-06:00',
        // },
      ],
    },
    {
      itemId: 5,
      sku: 'QTDNCR002FREDOG',
      type: 'DN',
      description: 'Freedom Dog Donation',
      customization: {},
      listPrice: 10,
      price: 10,
      subTotal: 10,
      discountTotal: 0,
      netTotal: 10,
      tax: 0,
      total: 10,
      discounts: [],
      quantity: 1,
      refunds: [
        // {
        //   status: 'success',
        //   amount: 10,
        //   quantity: 1,
        //   username: 'nberens',
        //   timestamp: '2022-11-10T10:56:38.023-06:00',
        // },
      ],
    },
    {
      itemId: 6,
      sku: 'SSHQTS000OMSHIP',
      type: 'SH',
      description: 'Shipping',
      customization: {},
      listPrice: 4.95,
      price: 4.95,
      subTotal: 4.95,
      discountTotal: 0,
      netTotal: 4.95,
      tax: 0,
      total: 4.95,
      discounts: [],
      quantity: 1,
      refunds: [
        // {
        //   status: 'success',
        //   amount: 4.95,
        //   quantity: 1,
        //   username: 'nberens',
        //   reason: 'Shipping Refund',
        //   timestamp: '2023-03-20T12:48:24.31-06:00',
        // },
      ],
    },
  ],
  shippingAddress: {
    street: '123 qwe rd, ',
    city: 'Denver',
    state: 'CO',
    zip: '80555',
    name: 'Steven Segall',
  },
  activity: [
    {
      type: 'Auth',
      identifier: 'AX00109635C339F',
      amount: 46.76,
      status: 'success',
      message: 'Huzzah',
      timestamp: '2022-10-28T12:55:11.343-07:00',
    },
    {
      type: 'Capture',
      identifier: 'SX00109635C3402',
      amount: 56.76,
      status: 'success',
      email: '8@g.co',
      message: 'omg ponies!1',
      timestamp: '2022-10-28T12:56:50.677-07:00',
    },
    {
      items: [
        { itemId: 1, quantity: 1, amount: 8.7 },
        { itemId: 2, quantity: 2, amount: 10.88 },
      ],
      type: 'Refund',
      identifier: 'SX00109636D2D39',
      amount: -30.46,
      status: 'success',
      email: '8@g.co',
      username: 'nberens',
      timestamp: '2022-11-10T10:56:25.887-06:00',
    },
    {
      items: [{ itemId: 5, quantity: 1, amount: 10 }],
      type: 'Refund',
      identifier: 'SX00109636D2D46',
      amount: -10,
      status: 'success',
      email: '8@g.co',
      username: 'nberens',
      timestamp: '2022-11-10T10:56:38.023-06:00',
    },
    {
      items: [{ itemId: 3, quantity: 1, amount: 10.88 }],
      type: 'Refund',
      identifier: 'SX00109636D2D75',
      amount: -10.88,
      status: 'success',
      email: '8@g.co',
      username: 'nberens',
      timestamp: '2022-11-10T10:57:25.88-06:00',
    },
    {
      type: 'Send Receipt',
      identifier: 'SX00109635C3402',
      status: 'success',
      email: '8@g.co',
      username: 'nberens',
      timestamp: '2022-11-10T10:57:39.017-06:00',
    },
  ],
};

export const mockSearchResults = [
  {
    sessionId: '29d13a51-5d10-448b-8298-a7d2bdeec01b',
    transactionId: '10766230130181435',
    kioskNumber: 'K10766',
    amount: 15.94,
    email: 'anton.kriachko@hillmangroup.com',
    name: 'Archibald Pendergast',
    paymentType: 'upc',
    processorStatus: 'success',
    timestamp: '2023-01-30T18:14:35.95-05:00',
    stage: 'refunded',
  },
  {
    sessionId: 'c6d92cb7-6ae3-458e-9c02-67565693f632',
    transactionId: '10766230130163251',
    kioskNumber: 'K10766',
    amount: 26.56,
    name: 'Archibald Pendergast',
    paymentType: 'cash',
    processorStatus: 'success',
    timestamp: '2023-01-30T16:32:51.79-05:00',
    stage: 'exception',
  },
  {
    sessionId: 'b5cd28ba-9999-4d3c-82fc-1d1a716c99a7',
    transactionId: '10766230130162235',
    kioskNumber: 'K10766',
    amount: 5.31,
    email: 'guli.halilova@hillmangroup.com',
    name: 'Archibald Pendergast',
    paymentType: 'coupon',
    processorStatus: 'success',
    timestamp: '2023-01-30T16:22:35.703-05:00',
    stage: 'pending-submission',
  },
  {
    sessionId: '94185e47-2a86-4bd4-a49e-3cec22fb40d4',
    transactionId: '10766230130161724',
    kioskNumber: 'K10766',
    amount: 10.63,
    name: 'Archibald Pendergast',
    paymentType: 'card',
    pan: '414709*6666',
    processorStatus: 'success',
    timestamp: '2023-01-30T16:17:24.667-05:00',
    stage: 'pending-ship',
  },
  {
    sessionId: 'e12e0c1f-aa87-4e5a-9f50-c90b1706cf29',
    transactionId: '10766230130134732',
    kioskNumber: 'K10766',
    amount: 5.31,
    email: 'nick.berens@hillmangroup.com',
    name: 'Archibald Pendergast',
    paymentType: 'card',
    pan: '414709*6666',
    processorStatus: 'success',
    timestamp: '2023-01-30T13:47:32.71-05:00',
    stage: 'pending-cash-refund',
  },
  {
    sessionId: 'b7f5264d-9edf-463f-adcd-d94e1ac22c31',
    transactionId: '10766230130134137',
    kioskNumber: 'K10766',
    amount: 5.31,
    name: 'Archibald Pendergast',
    paymentType: 'card',
    pan: '414709*6666',
    processorStatus: 'success',
    timestamp: '2023-01-30T13:41:37.147-05:00',
    stage: 'shipped',
  },
  {
    sessionId: '95d37398-b8d1-44f1-91cb-95a4dc914c84',
    transactionId: 'SX0010963D81BBB',
    kioskNumber: 'X00109',
    amount: 27.1,
    name: 'CARD 01 DI TEST',
    paymentType: 'card',
    pan: '476173*0119',
    processorStatus: 'success',
    timestamp: '2023-01-30T12:34:19.62-07:00',
    stage: 'declined',
  },
  {
    sessionId: '0fe94313-e7a4-42b0-b22c-2f10b9415b79',
    transactionId: '11001230128210252',
    kioskNumber: 'K11001',
    amount: 10.73,
    name: 'Archibald Pendergast',
    paymentType: 'card',
    pan: '414709*6666',
    processorStatus: 'success',
    timestamp: '2023-01-28T21:02:52.123-07:00',
    stage: '',
  },
  {
    sessionId: '3e091796-714a-4f2b-a3b4-0abc6b5e2cae',
    transactionId: '11001230128205947',
    kioskNumber: 'K11001',
    amount: 10.73,
    name: 'Archibald Pendergast',
    paymentType: 'card',
    pan: '414709*6666',
    processorStatus: 'success',
    timestamp: '2023-01-28T20:59:47.103-07:00',
    stage: 'processed',
  },
  {
    sessionId: 'ae8602e8-3d80-4746-ad3a-1f477f7f7e70',
    transactionId: '11001230128205247',
    kioskNumber: 'K11001',
    amount: 10.73,
    name: 'Archibald Pendergast',
    paymentType: 'card',
    pan: '414709*6666',
    processorStatus: 'success',
    timestamp: '2023-01-28T20:52:47.733-07:00',
    stage: 'processed',
  },
];