import { Provider } from 'react-redux';
import { RouterProvider as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import i18n from './i18n';

// export default function Root({ store, router }) {
//   return (
//     <Provider store={store}>
//       <Router router={router} />
//     </Provider>
//   );
// }

export default function Root({ store, router }) {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router router={router} />
      </I18nextProvider>
    </Provider>
  );
}
