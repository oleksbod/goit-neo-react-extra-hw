import { Suspense } from 'react';
import { AppBar } from './AppBar/AppBar';
import { Toaster } from 'react-hot-toast';

export const Layout = ({ children }) => {
  return (
    <div style={{ margin: '0 auto', padding: '0 16px' }}>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: 'green',
              color: 'white'
            },
            iconTheme: {
              primary: 'white',
              secondary: 'green'
            }
          },
          error: {
            style: {
              background: 'red',
              color: 'white'
            },
            iconTheme: {
              primary: 'white',
              secondary: 'red'
            }
          }
        }}
      />
    </div>
  );
};
