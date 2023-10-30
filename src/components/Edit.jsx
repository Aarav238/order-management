import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditOrder = () => {
  const { id } = useParams(); // Get the order ID from the URL parameters
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    product: '',
    quantity: 0,
  });

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders'));
    if (savedOrders) {
      setOrders(savedOrders);
      const selectedOrder = savedOrders.find((order) => order.id === id);

      if (selectedOrder) {
        setFormData({
          customer_name: selectedOrder.customer_name,
          customer_email: selectedOrder.customer_email,
          product: selectedOrder.product,
          quantity: selectedOrder.quantity,
        });
      }
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' ? parseInt(value, 10) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)

    setTimeout(() => {
      const updatedOrders = orders.map((order) => {
        if (order.id === id) {
          return {
            ...order,
            ...formData,
          };
        }
        return order;
      });
  
      setOrders(updatedOrders);
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setLoading(false)
      navigate('/orders'); // Redirect to the "Orders" page after editing
    }, 1000);
   
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Edit Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="customer_name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            value={formData.customer_name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="customer_email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="text"
            id="customer_email"
            name="customer_email"
            value={formData.customer_email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="product" className="block text-sm font-medium text-gray-700">
            Product
          </label>
          <input
            type="text"
            id="product"
            name="product"
            value={formData.product}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-400"
          />
        </div>
        <button
          type="submit"
          className=" flex justify-center items-center w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover-bg-blue-700 focus:outline-none"
        >
        {loading ? (<svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z" />
            </svg>) : ("Update")} 
        </button>
      </form>
    </div>
  );
};

export default EditOrder;
