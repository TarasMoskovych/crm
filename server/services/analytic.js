const moment = require('moment');
const Order = require('./../models/Order');

class AnalyticService {

  static async calculateOverview(id) {
    const orders = await getOrders(id);

    const ordersMap = getOrdersMap(orders);
    const yesterdayOrders = ordersMap[moment().add(-1, 'd').format('DD.MM.YYYY')] || [];

    const yesterdayOrdersLength = yesterdayOrders.length;
    const totalOrders = orders.length;
    const totalDays = Object.keys(ordersMap).length;
    const ordersPerDay = (totalOrders / totalDays).toFixed(0);
    const ordersPercent = (((yesterdayOrdersLength / ordersPerDay) - 1) * 100).toFixed(2);
    const totalGain = calculatePrice(orders);
    const gainPerDay = totalGain / totalDays;
    const gainPerYesterday = calculatePrice(yesterdayOrders);
    const gainPercent = (((gainPerYesterday / gainPerDay) - 1) * 100).toFixed(2);
    const compareGain = (gainPerYesterday - gainPerDay).toFixed(2);
    const compareDay = (yesterdayOrdersLength - ordersPerDay).toFixed(2);

    return {
      gain: {
        percent: Math.abs(+gainPercent),
        compare: Math.abs(+compareGain),
        yesterday: +gainPerYesterday,
        isHigher: gainPercent > 0
      },
      orders: {
        percent: Math.abs(+ordersPercent),
        compare: Math.abs(+compareDay),
        yesterday: +yesterdayOrdersLength,
        isHigher: ordersPercent > 0
      }
    }
  };

  static async calculateAnalytic(id) {
    const orders = await getOrders(id);
    const ordersMap = getOrdersMap(orders);

    const average = +(calculatePrice(orders) / Object.keys(ordersMap).length).toFixed(2);
    const chart = Object.keys(ordersMap).map(label => {
      const gain  = calculatePrice(ordersMap[label]);
      const order = ordersMap[label].length;

      return { label, order, gain };
    });

    return { average, chart };
  };
}

module.exports = AnalyticService;

function getOrders(id) {
  return Order.find({ user: id }).sort({ date: 1 });
}

function getOrdersMap(orders = []) {
  const daysOrders = {};

  orders.forEach(order => {
    const date = moment(order.date).format('DD.MM.YYYY');

    if (date === moment().format('DD.MM.YYYY')) { return; }
    if (!daysOrders[date]) { daysOrders[date] = []; }

    daysOrders[date].push(order);
  });

  return daysOrders;
}

function calculatePrice(orders = []) {
  return orders.reduce((acc, order) => acc + order.list.reduce((total, item) => total + item.cost * item.quantity, 0), 0);
}
