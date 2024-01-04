const NewTransactionNotificationAdmin = (name, itemNames, membersInvolved, expense) => {
    return `
    <!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="UTF-8">
      <title>New Transaction Notification</title>
      <style>
        body {
          background-color: #f0f0f0;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
    
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
    
        .logo {
          max-width: 200px;
          margin-bottom: 20px;
        }
    
        .message {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
    
        .body {
          font-size: 18px;
          margin-bottom: 20px;
        }
    
        .cta {
          display: inline-block;
          padding: 10px 20px;
          background-color: #FFD60A;
          color: #000;
          text-decoration: none;
          border-radius: 5px;
          font-size: 18px;
          font-weight: bold;
          margin-top: 20px;
        }
    
        .support {
          font-size: 14px;
          color: #666;
          margin-top: 20px;
        }
    
        .highlight {
          font-weight: bold;
          font-size: 20px;
        }
      </style>
    </head>
    
    <body>
      <div class="container">
        <a href="https://studynotion-edtech-project.vercel.app">
          <img class="logo" src="https://res.cloudinary.com/dwyzbgbzh/image/upload/v1699300440/EMS/jk_bphhzj.png" alt="EMS Logo">
        </a>
        <div class="message">New Transaction Notification</div>
        <div class="body">
          <p>Dear Admin,</p>
          <p>Mr. ${name} has initiated a new transaction for an expense. Details are mentioned below:</p>
          <h2 class="highlight">Initiated By: ${name}</h2>
          <p>Members Involved: ${membersInvolved}</p>
          <p>Items Purchased: ${itemNames}</p>
          <p>Total Expense:</p>
          <h2 class="highlight">₹${expense}</h2>
        </div>
        <a class="cta" href="https://dellmen.com">View Details</a>
        <div class="support">
          If you have any questions or need assistance, please feel free to reach out to us at <a href="mailto:info@ems.com">info@ems.com</a>. We are here to help!
        </div>
      </div>
    </body>
    
    </html>
    
    `;
  };
  
  module.exports = NewTransactionNotificationAdmin;
  