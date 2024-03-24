const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const userData = req.body;
  await User.create(userData);

  return res.status(201).json({
    status: 'success',
    message: 'Registration successful!',
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (!user) {
    return res.status(401).json({
      status: 'failure',
      message: 'Incorrect Email or Password. Try again',
    });
  }

  const accessToken = jwt.sign({ username }, process.env.USER_ACCESS_TOKEN_SECRET, { expiresIn: '3d' });

  return res.status(200).json({
    status: 'success',
    message: 'Successfully Logged In',
    data: accessToken,
  });
};

const dashboard = async (req, res) => {
  // const tenDaysAgo = new Date();
  // tenDaysAgo.setDate(tenDaysAgo.getDate() - 5);

  const lastTenDaysTransactions = await Transaction.find();

  let totalServicesAmount = 0;
  let commissionsEarned = 0;
  let totalSalesAmount = 0;
  let advanceTaken = 0;

  lastTenDaysTransactions.forEach((transaction) => {
    totalSalesAmount += transaction.amount;
    if (transaction.type === 'service') {
      totalServicesAmount += transaction.amount;
    } else if (transaction.type === 'commission') {
      commissionsEarned += transaction.amount;
    } else if (transaction.type === 'advance') {
      advanceTaken += transaction.amount;
    }
  });

  return res.status(200).json({
    status: 'success',
    message: 'Dashboard retrieved successfully',
    data: { totalServicesAmount, commissionsEarned, totalSalesAmount, advanceTaken, lastTenDaysTransactions },
  });
};

module.exports = { register, login, dashboard };
