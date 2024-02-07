import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import detailStyle from "../styles/productDetail.module.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    // Fetch the product details based on the productId
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = (id) => {
    fetch(`http://localhost:80/productDetail.php?id=${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Add watermark to the pictureUrl
        data.pictureUrl = `http://localhost:80/Art/watermarked_${data.pictureUrl}`;
        setProduct(data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setProduct(null);
      });
  };

  const handleAddToCart = () => {
    // Add the current product to the cart with animation
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setCart([...cart, product]);
    }, 1000);
    console.log("Added to cart:", cart);
  };

// Handle successful payment approval// Handle successful payment approval// Handle successful payment approval
const handlePaymentApproval = (data) => {
  console.log("Payment approved:", data);
  // Extract relevant data from order details
  const id = data.id;
  const intent = data.intent;
  const status = data.status;
  const create_time = data.create_time;
  const payer = data.payer;
  const purchase_units = data.purchase_units;

  // Extract necessary fields from the extracted data
  const buyer_id = payer.payer_id;
  const product_id = purchase_units[0].reference_id;
  const total_amount = purchase_units[0].amount.value;
  const shipping_address = purchase_units[0].shipping.address.address_line_1;
  const shipping_method = 'test'; // This information is not provided in the order details
  const payment_method = purchase_units[0].payee.email_address;

  // Create a FormData object
  const formData = new FormData();

  // Append the order details to FormData
  formData.append('id', id);
  formData.append('intent', intent);
  formData.append('status', status);
  formData.append('create_time', create_time);
  formData.append('buyer_id', 1);
  formData.append('product_id', productId);
  formData.append('total_amount', total_amount);
  formData.append('shipping_address', shipping_address);
  formData.append('shipping_method', shipping_method);
  formData.append('payment_method', payment_method);
  formData.append('seller_id', "2");
  console.log('Order details:', formData); // Debugging statement

  // Send the order details to the server
  fetch('http://localhost:80/create-order.php', {
    method: 'POST',
    body: formData // Send FormData object directly
  })
  .then(response => {
    if (response.ok) {
      // Order created successfully
      return response.json();
    } else {
      throw new Error('Unable to create order.');
    }
  })
  .then(data => {
    // Add the product to the cart with animation
    alert('Payment successful! Order ID: ' + data.order_id);
  })
  .catch(error => {
    console.error('Error creating order:', error);
    alert('Error creating order. Please try again later.');
  });
};



  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={detailStyle.product_detail_container}>
      <img
        className={detailStyle.product_image}
        src={product.pictureUrl}
        alt="Product"
      />
      <div className={detailStyle.product_container}>
        <div className={detailStyle.product_details}>
          <div className={detailStyle.box}>
            <h1 className={detailStyle.title}>{product.title}</h1>
            <p className={detailStyle.price}>${product.price}</p>
            <div
              style={{
                width: "20%",
                borderBottom: "3px solid white",
                marginInline: "20px",
                marginTop: "20px",
              }}
            ></div>
            <div>
              {/* PayPal button */}
              <PayPalScriptProvider options={{ clientId: "AcDIoMXbZyUPOjPOXmCoWScT-8jv6ejhq-w554g5vg6zsZ3tdCpYz6o7htsH-AOH4ZygmVvPu0Ry7rA5" }}>
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: product.price,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    // Handle successful payment approval
                    actions.order.get().then((details) => {
                      console.log("Order details:", details);

                      // Send the order details to the server
                      handlePaymentApproval(details);
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>
            <button className={detailStyle.cart_button} onClick={handleAddToCart}>
              Add to Cart
            </button>
            {showConfirmation && <div className={detailStyle.added_to_cart}>Added to Cart!</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
