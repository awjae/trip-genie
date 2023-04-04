// App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Home from '@/pages//Home';
import Detail from '@/pages/Detail';
import { QueryClient, QueryClientProvider } from 'react-query';

test('renders home page', () => {

  const queryClient = new QueryClient();

  render(
    <MemoryRouter initialEntries={['/']}>
      <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/*" element={<Home></Home>}></Route>
            {/* <Route path="/detail" element={<Detail></Detail>}></Route> */}
          </Routes>
      </QueryClientProvider>
    </MemoryRouter>
  );

  const homeElement = screen.getByText(/트립지니 - AI 여행플래너/i);
  expect(homeElement).toBeInTheDocument();
});

// test('renders detail page', () => {
//   render(
//     <MemoryRouter initialEntries={['/detail']}>
//       <Routes>
//         <Route path="/*" element={<Home></Home>}></Route>
//         <Route path="/detail" element={<Detail></Detail>}></Route>
//       </Routes>
//     </MemoryRouter>
//   );

//   const detailElement = screen.getByText(/detail/i);
//   expect(detailElement).toBeInTheDocument();
// });