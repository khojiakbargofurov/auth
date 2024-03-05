import { useEffect, useState } from 'react';
import { instance } from '../api/axios';

function Products() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12); 
  
  const getUsers = async () => {
    try {
      const response = await instance.get('/products');
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const Skeleton = () => (
    <div className="bg-gray-200 rounded-lg p-6 shadow animate-pulse">
      <div className="h-64 bg-gray-300 mb-6"></div>
      <div className="h-6 w-60 bg-gray-300 mb-4"></div>
      <div className="h-3 w-60 bg-gray-300 mb-4"></div>
      <div className="h-3 w-60 bg-gray-300 mb-4"></div>
      <div className="h-3 w-60 bg-gray-300 mb-4"></div>
      <div className="h-3 w-60 bg-gray-300 mb-4"></div>
      <div className="h-3 w-48 bg-gray-300"></div>
    </div>
  );

  // Logic to slice the users array based on current page and items per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 8 }, (_, index) => <Skeleton key={index} />)
          ) : (
            currentUsers.map(product => (
              <div key={product.id} className="bg-white rounded-lg p-4 shadow">
              <img src={product.category.image} alt="" className="h-64 w-full object-cover mb-4" />
              <h2 className="text-xl font-semibold mb-2 text-left">{product.title}</h2>
              <p className="text-gray-600 mb-2 text-left">{product.description}</p> {/* Text left-aligned */}
              <h3 className="text-gray-600 text-left">Price: {product.price}</h3>
            </div>
          ))
          )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(users.length / itemsPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className="px-4 py-2 mx-1 bg-gray-200 rounded-md hover:bg-gray-300">
            {index + 1}
          </button>
        ))}
      </div>
    </div>
    </>
  );
}

export default Products;
