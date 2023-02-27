import Home from '@/pages/Home';
import { Route, Routes } from 'react-router-dom';
import Detail from '@/pages/Detail';

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Home></Home>}></Route>
      <Route path="/detail" element={<Detail></Detail>}></Route>
    </Routes>
  );
}
export default App;