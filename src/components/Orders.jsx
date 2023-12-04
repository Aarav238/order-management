import { useState, useEffect } from 'react';
import User from './User';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const [json, setJson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting , setDeleting] = useState(false);
  const [loadingOrderId, setLoadingOrderId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('/DummyData.json', {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          console.log(`Failed to fetch data: ${response.status} - ${response.statusText}`);
        }

        const myJson = await response.json();
        const ordersFromLocalStorage = JSON.parse(localStorage.getItem('orders'));

        const updatedJson = ordersFromLocalStorage ? [...ordersFromLocalStorage] : myJson;

        localStorage.setItem('orders', JSON.stringify(updatedJson));
        setJson(updatedJson);
        setLoading(false); 
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const editOrder = (id) => {
    navigate(`/edit/${id}`);
  }

  const data = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    if (!user) {
      navigate('/');
    }
  }, []);

  const handleDelete = (id) => {
    console.log("called");
    setLoadingOrderId(id);

    setDeleting(true);

    setTimeout(() => {
      const updatedJson = json.filter((order) => order.id !== id);
      setJson(updatedJson);
      localStorage.setItem('orders', JSON.stringify(updatedJson));

      setDeleting(false);
      setLoadingOrderId(null);
    }, 1000);
  };
 
  console.log(json.length);

  return (
    <div className='p-4'>
      {data && <User user={data} />}
      <div className='bg-white shadow-lg rounded-lg p-4'>
        <h1 className='text-2xl font-bold text-indigo-600'>Order List</h1>
        {loading ? (
          <div>Loading...</div>
        ) : (
          json.map((order, index) => (
            <div key={index} className='mb-4 p-2 border border-gray-300 rounded-lg'>
              <div className='flex justify-between items-center'>
                <p className='text-xl font-bold text-indigo-600'>{order.customer_name}</p>
                <div>
                  <button onClick={() => editOrder(order.id)} className='text-indigo-500 hover:text-indigo-700 text-sm mr-2'>
                    Edit
                  </button>
                  {deleting && loadingOrderId === order.id ? (
                    <div>Deleting...</div>
                  ) : (
                    <button onClick={() => handleDelete(order.id)} className='text-red-500 hover:text-red-700 text-sm'>
                      Delete
                    </button>
                  )}
                </div>
              </div>
              <div className='flex flex-wrap'>
                <div className='w-full sm:w-1/2'>
                  <p className='text-sm text-gray-600'>Order ID: {order.id}</p>
                  <p className='text-sm text-gray-600'>Customer Email: {order.customer_email}</p>
                </div>
                <div className='w-full sm:w-1/2'>
                  <p className='text-sm text-gray-600'>Product: {order.product}</p>
                  <p className='text-sm text-gray-600'>Quantity: {order.quantity}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;

