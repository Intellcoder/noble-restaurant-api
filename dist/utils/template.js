"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOrderTemplate = void 0;
const adminOrderTemplate = ({ orderNumber, customerPhone, deliveryType, deliveryAddress, totalAmount, items, }) => {
    const itemRows = items
        .map((item) => `
        <tr>
          <td>${item.foodName}</td>
          <td>${item.quantity}</td>
          <td>₦${Number(item.unitPrice).toLocaleString()}</td>
          <td>₦${(item.quantity * Number(item.unitPrice)).toLocaleString()}</td>
        </tr>
      `)
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
exports.adminOrderTemplate = adminOrderTemplate;
//# sourceMappingURL=template.js.map