import { RouterProvider } from 'react-router-dom';
import { router } from './app/routes';
import { ToastProvider } from './hooks/useToast';
import { Agentation } from 'agentation';

export default function App() {
  return (
    <ToastProvider>
      <RouterProvider router={router} />
      {import.meta.env.DEV && (
        <Agentation
          endpoint="http://localhost:4747"
          onSessionCreated={(sessionId) => {
            console.log('Session started:', sessionId);
          }}
        />
      )}
    </ToastProvider>
  );
}
