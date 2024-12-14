import { CiSearch } from 'react-icons/ci';
import Home from './components/home';
import { useState, useEffect } from 'react';
import pfp from "./assets/Ellipse 2.png"
import pic from "./assets/Rectangle 1.png"
import { IoIosCall } from "react-icons/io";
import { FaMapMarkerAlt } from "react-icons/fa";
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

import notfound from "./assets/Group 143.png"

type User = {
  first_name: string;
  last_name: string;
  city: string;
  contact_number: string;
};


function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://girman-xjk3.onrender.com/users/');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError('An error occurred while fetching user data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSearched(true);

    if (!search.trim()) {
      setError('Please enter a search term.');
      setFilteredData([]);
      return;
    }

    setError(null);

    try {
      const results = users.filter((item) =>
        item.first_name.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredData(results);

      
    } catch (err) {
      setError('An error occurred while searching. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gradient-to-t from-blue-400 to- min-h-[calc(100vh-6rem)] py-10">
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
          className="border border-gray-300 pl-10 p-2 w-[20rem] sm:w-[40rem] outline-none rounded-lg shadow-md focus:ring-2 focus:ring-blue-500"
          aria-label="Search"
        />
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {loading && <p className="text-gray-700 mt-4 text-center">Loading users...</p>}

      <div className="mt-10 w-[90%] flex flex-wrap gap-6 justify-center">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <Card
              key={index}
              className="shadow-lg bg-white rounded-lg hover:shadow-xl transition-shadow duration-300 w-[20rem] "
            >
              <CardHeader className="p-4  ">
                <CardTitle className="text-3xl font-bold">
                  <img src={pfp} width={80} height={90} />
                  {item.first_name} {item.last_name}
                </CardTitle>
                <CardDescription className="text-gray-600 flex justify-start items-center">
                <FaMapMarkerAlt /> {item.city}
                </CardDescription>
              </CardHeader>
              <div className="flex">
                <CardContent className="p-4">
                  <p className="text-gray-700 flex justify-start items-center gap-2">
                  <IoIosCall className='text-xl' /> {item.contact_number}
                  </p>
                  <div className='flex-col justify-start items-start'>
                  <p className='flex text-gray-500 text-xs'>Available on phone</p>
                  </div>
                </CardContent>
                
                
                <CardFooter className="p-4 text-right text-gray-500">
                
                <Dialog>
  <DialogTrigger
    className="bg-black text-white p-2 rounded-md flex items-end justify-end"
    onClick={() => setSelectedUser(item)}
  >
    Fetch Details
  </DialogTrigger>
  
  <DialogContent className="h-[25rem] sm:h-1/2 w-[20rem] sm:w-[30rem]">
    <DialogHeader className="text-left">
      <h1 className="text-3xl text-left">Fetch Details</h1>
      <p className="text-gray-500 mb-4 text-left">
        Here are the details of the following employee
      </p>
      <DialogTitle className="text-left">
        {selectedUser?.first_name} {selectedUser?.last_name}
      </DialogTitle>
      <DialogDescription className="text-left">
        <p className="text-left">
          <strong>Location:</strong> {selectedUser?.city}
        </p>
        <p className="text-left">
          <strong>Contact Number:</strong> {selectedUser?.contact_number}
        </p>
        <p className="mb-3 mt-2 text-left">Profile image:</p>
        <img src={pic} width={150} height={100} className="rounded-md" />
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
          !error && <img src={notfound} width={500} height={500}/>
        )}
      </div>
    </div>
  );
}

export default App;
