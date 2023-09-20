import { useState, useEffect } from 'react';
import Pet from './Pet';

const ANIMALS = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];
const BREEDS = [];

const SearchParams = () => {
   const [location, setLocation] = useState('');
   const [animal, setAnimal] = useState('');
   const [breed, setBreed] = useState('');
   const [pets, setPets] = useState([]);

   useEffect(() => {
      requestPets();
   }, []); // eslint-disable-line react-hooks/exhaustive-deps

   async function requestPets() {
      const res = await fetch(
         `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
      );
      const json = await res.json();

      setPets(json.pets);
   }

   return (
      <div className="search-params">
         <form
            onSubmit={(e) => {
               e.preventDefault();
               requestPets();
            }}
         >
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
         {pets.map((pet) => (
            <Pet
               animal={pet.animal}
               breed={pet.breed}
               key={pet.id}
               name={pet.name}
            />
         ))}
      </div>
   );
};

export default SearchParams;
