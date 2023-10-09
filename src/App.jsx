/**
 * COMPLETE INTRO TO REACT V8
 * Course by: Brian Holt through Front End Masters
 * Completed 10/9/2023
 */

import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import AdoptedPetContext from './AdoptedPetContext';
import SearchParams from './SearchParams';
import Details from './Details';

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: Infinity,
         cacheTime: Infinity,
      },
   },
});

const App = () => {
   const adoptedPet = useState(null);

   return (
      <BrowserRouter>
         <QueryClientProvider client={queryClient}>
            <AdoptedPetContext.Provider value={adoptedPet}>
               <header>
                  <Link to="/">Adopt Me!</Link>
               </header>
               <Routes>
                  <Route path="/details/:id" element={<Details />} />
                  <Route path="/" element={<SearchParams />} />
               </Routes>
            </AdoptedPetContext.Provider>
         </QueryClientProvider>
      </BrowserRouter>
   );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
