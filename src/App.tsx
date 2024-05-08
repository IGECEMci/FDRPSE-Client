import { useEffect } from 'react';

import { MainRouter } from './infraestructure/routes/';

import { authService } from './domain/services/auth.service';
import { InitialScreen } from './infraestructure/components/ui';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorBoundaryPage } from './app/pages/error/ErrorBoundaryPage';

/**
 * La función valida la sesión del usuario y muestra la pantalla de carga, además de mostrar una pantalla de error si es que algo salio mal
 * durante la ejecución.
 */
function App() {

  const { startRevalidateSession, loading } = authService();

  useEffect(() => {
    startRevalidateSession();
  }, []);

  return loading ? <InitialScreen /> :
    (
      <ErrorBoundary fallback={<ErrorBoundaryPage />}>
        <MainRouter />
      </ErrorBoundary>
    )
}

export default App
