import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    borderBottom: '1 solid #ccc',
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  details: {
    fontSize: 12,
    marginBottom: 5,
  },
  productImage: {
    width: 100,
    height: 100,
  },
  copyType: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
});

const OrderDetailsPDF = ({ order }) => (
  <Document>
    {/* Customer Copy */}
    <Page style={styles.page}>
      <Text style={styles.copyType}>Customer Copy</Text>
      <View style={styles.section}>
        <Text style={styles.header}>Order Details</Text>
        <Text style={styles.details}><strong>Order ID:</strong> {order.id}</Text>
        <Text style={styles.details}><strong>Username:</strong> {order.user.username}</Text>
        <Text style={styles.details}><strong>Total:</strong> {order.order.get_cart_total}</Text>
        <Text style={styles.details}><strong>Items:</strong> {order.order.get_cart_quantity}</Text>
        <Text style={styles.details}><strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Items</Text>
        {order.order.items.map(item => (
          <View key={item.id} style={styles.section}>
            
            <Text style={styles.details}><strong>Product:</strong> {item.product.name}</Text>
            <Text style={styles.details}><strong>Description:</strong> {item.product.description}</Text>
            <Text style={styles.details}><strong>Quantity:</strong> {item.quantity}</Text>
            <Text style={styles.details}><strong>Price:</strong> ${item.product.price}</Text>
            <Text style={styles.details}><strong>Total:</strong> ${item.get_total}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Shipping Address</Text>
        <Text style={styles.details}>{order.shipping.address_line1}, {order.shipping.address_line2}</Text>
        <Text style={styles.details}>{order.shipping.city}, {order.shipping.province}, {order.shipping.zip_code}</Text>
      </View>
    </Page>

    {/* Company Copy */}
    <Page style={styles.page}>
      <Text style={styles.copyType}>Company Copy</Text>
      <View style={styles.section}>
        <Text style={styles.header}>Order Details</Text>
        <Text style={styles.details}><strong>Order ID:</strong> {order.id}</Text>
        <Text style={styles.details}><strong>Username:</strong> {order.user.username}</Text>
        <Text style={styles.details}><strong>Total:</strong> {order.order.get_cart_total}</Text>
        <Text style={styles.details}><strong>Items:</strong> {order.order.get_cart_quantity}</Text>
        <Text style={styles.details}><strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Items</Text>
        {order.order.items.map(item => (
          <View key={item.id} style={styles.section}>
            
            <Text style={styles.details}><strong>Product:</strong> {item.product.name}</Text>
            <Text style={styles.details}><strong>Description:</strong> {item.product.description}</Text>
            <Text style={styles.details}><strong>Quantity:</strong> {item.quantity}</Text>
            <Text style={styles.details}><strong>Price:</strong> ${item.product.price}</Text>
            <Text style={styles.details}><strong>Total:</strong> ${item.get_total}</Text>
          </View>
        ))}
      </View>
      <View style={styles.section}>
        <Text style={styles.header}>Shipping Address</Text>
        <Text style={styles.details}>{order.shipping.address_line1}, {order.shipping.address_line2}</Text>
        <Text style={styles.details}>{order.shipping.city}, {order.shipping.province}, {order.shipping.zip_code}</Text>
      </View>
    </Page>
  </Document>
);

export default OrderDetailsPDF;
