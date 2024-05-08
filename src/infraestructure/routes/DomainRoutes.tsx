import { Route, Routes } from 'react-router-dom';
import { DomainsPage, CreateDomainPage } from '../../app/pages';


/**
 * Las rutas son las encargadas de mostrar las páginas y generar rutas.
 */
const DomainRoutes = () => {
  return (
    <Routes>
      <Route path="/" index element={<DomainsPage />} />
      <Route path="/create" element={<CreateDomainPage />} />
    </Routes>
  )
}


export default DomainRoutes;