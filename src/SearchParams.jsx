import { useState } from 'react';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];
const BREEDS = [];

const SearchParams = () => {
   const [location, setLocation] = useState('');
   const [animal, setAnimal] = useState('');
   const [breed, setBreed] = useState('');

   return (
      <div className="search-params">
         <form>
            <label htmlFor="location">
               Location
               <input
                  id="location"
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  value={location}
               />
            </label>
            <label htmlFor="animal">
               Animal
               <select
                  id="animal"
                  onChange={(e) => {
                     setAnimal(e.target.value);
                     setBreed('');
                  }}
                  value={animal}
               >
                  <option />
                  {ANIMALS.map((animal) => (
                     <option key={animal}>{animal}</option>
                  ))}
               </select>
            </label>
            <label htmlFor="breed">
               Breed
               <select
                  disabled={BREEDS.length === 0}
                  id="breed"
                  onChange={(e) => setBreed(e.target.value)}
                  value={breed}
               >
                  <option />
                  {BREEDS.map((breed) => (
                     <option key={breed}>{breed}</option>
                  ))}
               </select>
            </label>
            <button>Submit</button>
         </form>
      </div>
   );
};

export default SearchParams;
