import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import Modal from './Modal';
import { Link } from 'react-router-dom';

import fetchPet from './fetchPet';

const Details = () => {
   const { id } = useParams();
   const [showModal, setShowModal] = useState(false);
   // the "_" means Im not using it, I dont care about it, probably best to change the esLint rules for anything _, ignore
   // eslint-disable-next-line no-unused-vars
   const [_, setAdoptedPet] = useContext(AdoptedPetContext);
   const results = useQuery(['details', id], fetchPet);
   const navigate = useNavigate();

   if (results.isLoading) {
      return (
         <div className="loading-pane">
            <h2 className="loader">🌀</h2>
         </div>
      );
   }

   const pet = results.data.pets[0];

   return (
      <div className="details">
         <Carousel images={pet.images} />
         <div>
            <h1>{pet.name}</h1>
            <h2>
               {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
               <button onClick={() => setShowModal(true)}>
                  Adopt {pet.name}
               </button>
               <p>{pet.description}</p>
               {showModal ? (
                  <Modal>
                     <div>
                        <h1>Would you like to adopt {pet?.name}?</h1>
                        <div className="buttons">
                           <button
                              onClick={() => {
                                 setAdoptedPet(pet);
                                 navigate('/');
                              }}
                           >
                              Yes
                           </button>
                           <button onClick={() => setShowModal(false)}>
                              No
                           </button>
                        </div>
                     </div>
                  </Modal>
               ) : null}
            </h2>
         </div>
      </div>
   );
};

function DetailsErrorBoundary(props) {
   // ...props will pass any props through to details.
   return (
      <ErrorBoundary
         errorComponent={
            <h2>
               There was an error!
               <Link to={'/'}>Click here to return to homepage</Link>
            </h2>
         }
      >
         <Details {...props} />
      </ErrorBoundary>
   );
}

export default DetailsErrorBoundary;
