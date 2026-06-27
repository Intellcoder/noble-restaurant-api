type OrderItem = {
  foodName: string;
  quantity: number;
  unitPrice: number;
};

type OrderTemplateProps = {
  orderNumber: string;
  customerPhone: string;
  deliveryType: string;
  deliveryAddress?: string;
  totalAmount: number;
  items: OrderItem[];
};

export const adminOrderTemplate = ({
  orderNumber,
  customerPhone,
  deliveryType,
  deliveryAddress,
  totalAmount,
  items,
}: OrderTemplateProps) => {
  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td>${item.foodName}</td>
          <td>${item.quantity}</td>
          <td>₦${Number(item.unitPrice).toLocaleString()}</td>
          <td>₦${(item.quantity * Number(item.unitPrice)).toLocaleString()}</td>
        </tr>
      `,
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
<style>
body{
font-family:Arial,sans-serif;
background:#f5f5f5;
padding:20px;
}

.container{
max-width:700px;
margin:auto;
background:white;
padding:30px;
border-radius:12px;
}

.header{
background:#dc2626;
color:white;
padding:20px;
border-radius:10px;
text-align:center;
}

table{
width:100%;
border-collapse:collapse;
margin-top:20px;
}

th,td{
padding:12px;
border-bottom:1px solid #eee;
text-align:left;
}

.summary{
margin-top:20px;
padding:15px;
background:#fafafa;
border-radius:10px;
}
</style>
</head>

<body>

<div class="container">

<div class="header">
<h2>🍽 New Order Received</h2>
</div>

<div class="summary">

<p><strong>Order ID:</strong> ${orderNumber}</p>

<p><strong>Phone:</strong> ${customerPhone}</p>

<p><strong>Delivery Type:</strong> ${deliveryType}</p>

${deliveryAddress ? `<p><strong>Address:</strong> ${deliveryAddress}</p>` : ""}

<p>
<strong>Total:</strong>
₦${Number(totalAmount).toLocaleString()}
</p>

</div>

<h3>Order Items</h3>

<table>

<thead>
<tr>
<th>Item</th>
<th>Qty</th>
<th>Price</th>
<th>Total</th>
</tr>
</thead>

<tbody>
${itemRows}
</tbody>

</table>

</div>

</body>
</html>
`;
};

//reset email
export const resetPasswordTemplate = (
  firstName: string,
  resetLink: string,
  expiryMinutes = 15,
) => {
  return `
<!DOCTYPE html>
<html>
<head>
<style>
body{
  font-family: Arial, sans-serif;
  background:#f5f5f5;
  padding:20px;
  margin:0;
}

.container{
  max-width:700px;
  margin:auto;
  background:white;
  padding:30px;
  border-radius:12px;
}

.header{
  background:#dc2626;
  color:white;
  padding:20px;
  border-radius:10px;
  text-align:center;
}

.content{
  margin-top:25px;
  line-height:1.6;
  color:#333;
}

.button-container{
  text-align:center;
  margin:30px 0;
}

.button{
  background:#dc2626;
  color:white !important;
  padding:14px 28px;
  text-decoration:none;
  border-radius:8px;
  display:inline-block;
  font-weight:bold;
}

.notice{
  margin-top:20px;
  padding:15px;
  background:#fafafa;
  border-radius:10px;
  font-size:14px;
  color:#555;
}

.footer{
  margin-top:30px;
  text-align:center;
  font-size:13px;
  color:#888;
}
</style>
</head>

<body>

<div class="container">

  <div class="header">
    <h2>🔐 Password Reset Request</h2>
  </div>

  <div class="content">
  
    <p>Hi ${firstName},</p>

    <p>
      We received a request to reset the password for your 
      <strong>Noble Restaurant</strong> account.
    </p>

    <p>
      Click the button below to create a new password:
    </p>

    <div class="button-container">
      <a href="${resetLink}" class="button">
        Reset Password
      </a>
    </div>

    <div class="notice">
      <p>
        This reset link will expire in 
        <strong>${expiryMinutes} minutes</strong>.
      </p>

      <p>
        If you did not request this password reset, you can safely ignore this email.
        No changes will be made to your account.
      </p>
    </div>

    <p>
      Thank you for choosing <strong>Noble Restaurant</strong> 🍽️
    </p>

  </div>

  <div class="footer">
    <p>
      For security reasons, never share your password or reset link with anyone.
    </p>
    <p>© Noble Restaurant</p>
  </div>

</div>

</body>
</html>
`;
};
