import { CiSearch } from 'react-icons/ci';
import './App.css';
import Home from './components/home';
import { useState } from 'react';
import data from './data/users.json';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const typedData = data as {
  first_name: string;
  last_name: string;
  city: string;
  contact_number: string;
}[];

function App() {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setIsSearched(true); 

    if (!search.trim()) {
      setError('Please enter a search term.');
      setFilteredData([]);
      return;
    }

    setError(null);

    try {

      const results = data.filter(
        (item) => item.first_name.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredData(results);

      if (results.length === 0) {
        setError('No results found for your search.');
      }
    } catch (err) {

      setError('An error occurred while searching. Please try again later.');
      console.error(err); 
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-t from-blue-400 to- h-screen">
      <div className="mt-36">
        <Home />
      </div>

      <form className="relative mt-10" onSubmit={handleSearchSubmit}>
        <CiSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500"
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 pl-10 p-2 w-[40rem] outline-none rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
          aria-label="Search"
        />
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      <div className="mt-10 w-[90%] flex flex-wrap gap-6 justify-center">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <Card
              key={index}
              className="shadow-lg bg-white rounded-lg hover:shadow-xl transition-shadow duration-300 w-[18rem] "
            >
              <CardHeader className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-100 to-blue-200">
                <CardTitle className="text-xl font-bold text-blue-800">
                  {item.first_name} {item.last_name}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Contact: {item.contact_number}
                </CardDescription>
              </CardHeader>
              <div className="flex">
                <CardContent className="p-4">
                  <p className="text-gray-700">
                    <strong>City:</strong> {item.city}
                  </p>
                </CardContent>
                <CardFooter className="p-4 text-right text-gray-500">
                  <Dialog>
                    <DialogTrigger
                      className="bg-black text-white p-2 rounded-md"
                      onClick={() => setSelectedUser(item)} 
                    >
                      Fetch Details
                    </DialogTrigger>
                    <DialogContent className='h-1/2'>
                      <DialogHeader>
                        <h1 className='text-3xl'>Fetch Details</h1>
                        <p className='text-gray-500 mb-4'>Here are the details of following employee</p>
                        <DialogTitle>
                          {selectedUser?.first_name} {selectedUser?.last_name}
                        </DialogTitle>
                        <DialogDescription>
                          <p>
                            <strong>City:</strong> {selectedUser?.city}
                          </p>
                          <p>
                            <strong>Contact:</strong> {selectedUser?.contact_number}
                          </p>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </div>
            </Card>
          ))
        ) : (
          isSearched &&
          !error && <p className="text-gray-700 mt-4 text-center">No results found</p>
        )}
      </div>
    </div>
  );
}

export default App;